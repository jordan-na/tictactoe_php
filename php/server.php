<?php
// Define the path to the JSON file
$json_file_path = '../data.json';

// Helper function to read scores from the JSON file
function read_scores_from_file($file_path)
{
   $default_scores = [
      'playerX' => 0,
      'playerO' => 0,
      'draws' => 0
   ];

   if (!file_exists($file_path)) {
      write_scores_to_file($file_path, $default_scores);
      return $default_scores;
   }

   $json_data = file_get_contents($file_path);
   $decoded_data = json_decode($json_data, true);

   // Check if JSON is valid and contains the expected structure
   if (
      json_last_error() !== JSON_ERROR_NONE ||
      !is_array($decoded_data) ||
      !isset($decoded_data['playerX']) ||
      !isset($decoded_data['playerO']) ||
      !isset($decoded_data['draws'])
   ) {
      write_scores_to_file($file_path, $default_scores);
      return $default_scores;
   }

   return $decoded_data;
}

// Helper function to write scores to the JSON file
function write_scores_to_file($file_path, $scores)
{
   $json_data = json_encode($scores, JSON_PRETTY_PRINT);
   file_put_contents($file_path, $json_data);
}

// Initialize scores
$scores = read_scores_from_file($json_file_path);

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
   http_response_code(200);
   exit();
}

// Helper function to send JSON response
function send_json_response($data)
{
   header('Content-Type: application/json');
   echo json_encode($data);
}

// Get the requested endpoint
$request_method = $_SERVER['REQUEST_METHOD'];
$path_info = $_SERVER['PATH_INFO'] ?? '/';

// Debugging: Log request details
error_log("Request method: $request_method, Path info: $path_info");

// Route the request based on the endpoint
switch ($path_info) {
   case '/scores':
      if ($request_method == 'GET') {
         // Debugging: Log scores
         error_log("Returning scores: " . json_encode($scores));

         // Return current scores
         send_json_response($scores);
      } elseif ($request_method == 'POST') {
         // Debugging: Log raw input
         $raw_input = file_get_contents('php://input');
         error_log("Raw input: $raw_input");

         // Handle score updates
         $input = json_decode($raw_input, true);
         $player = $input['player'] ?? '';

         if ($player === 'X') {
            $scores['playerX'] += 1;
         } elseif ($player === 'O') {
            $scores['playerO'] += 1;
         } elseif ($player === 'draw') {
            $scores['draws'] += 1;
         }

         // Write updated scores to the JSON file
         write_scores_to_file($json_file_path, $scores);

         // Debugging: Log updated scores
         error_log("Updated scores: " . json_encode($scores));
         send_json_response($scores);
      }
      break;
   case '/leaderboard':
      if ($request_method == 'GET') {
         // Get current scores and sort them in descending order
         $leaderboard = [
            'playerX' => $scores['playerX'],
            'playerO' => $scores['playerO'],
         ];

         // Sort leaderboard in descending order
         arsort($leaderboard);

         // Debugging: Log leaderboard
         error_log("Returning leaderboard: " . json_encode($leaderboard));
         send_json_response($leaderboard);
      }
      break;
   case '/reset':
      if ($request_method == 'POST') {
         // Handle score reset
         $scores = [
            'playerX' => 0,
            'playerO' => 0,
            'draws' => 0
         ];

         // Write reset scores to the JSON file
         write_scores_to_file($json_file_path, $scores);

         // Debugging: Log reset scores
         error_log("Scores reset to: " . json_encode($scores));
         send_json_response($scores);
      }
      break;
   default:
      http_response_code(404);
      send_json_response(['error' => 'Not Found']);
      break;
}
?>