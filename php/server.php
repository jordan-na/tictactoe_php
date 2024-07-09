<?php
session_start();

// Initialize scores if not already set
if (!isset($_SESSION['scores'])) {
    $_SESSION['scores'] = [
        'playerX' => 0,
        'playerO' => 0,
        'draws' => 0
    ];
}

// Helper function to send JSON response
function send_json_response($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
}

// Get the requested endpoint
$request_method = $_SERVER['REQUEST_METHOD'];
$path_info = $_SERVER['PATH_INFO'] ?? '/';

// Route the request based on the endpoint
switch ($path_info) {
    case '/scores':
        if ($request_method == 'GET') {
            // Return current scores
            send_json_response($_SESSION['scores']);
        } elseif ($request_method == 'POST') {
            // Handle score updates
            $input = json_decode(file_get_contents('php://input'), true);
            $player = $input['player'] ?? '';

            if ($player === 'X') {
                $_SESSION['scores']['playerX'] += 1;
            } elseif ($player === 'O') {
                $_SESSION['scores']['playerO'] += 1;
            } elseif ($player === 'draw') {
                $_SESSION['scores']['draws'] += 1;
            }

            send_json_response($_SESSION['scores']);
        }
        break;
    default:
        http_response_code(404);
        send_json_response(['error' => 'Not Found']);
        break;
}
