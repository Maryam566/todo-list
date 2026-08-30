<?php

require_once "Loader.php";

header("Content-Type: application/json");

$id = $_POST["id"] ?? "";

if (empty($id)) {
    echo json_encode([
        "success" => false,
        "message" => "ID is required"
    ]);
    exit;
}

$todo = Todo::find($id);

if ($todo->id) {
  echo json_encode([
    "success" => true,
    "id" => $todo->id,
    "task" => $todo->task,
    "priority" => $todo->priority,
    "file" => $todo->file
]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Task not found"
    ]);
}

?>