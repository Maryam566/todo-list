<?php

require_once "Loader.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $id = $_POST["id"] ?? "";
    $task = $_POST["task"] ?? "";
    $priority = $_POST["priority"] ?? "Low";

    if (empty($id) || empty(trim($task))) {
        echo "Task and ID are required";
        exit;
    }

    $todo = Todo::find($id);

    if (!$todo->id) {
        echo "Task not found";
        exit;
    }

    $todo->task = $task;
    $todo->priority = $priority;

    $result = $todo->save();

    if ($result) {
        echo "Task updated successfully";
    } else {
        echo "Unable to update task";
    }
}

?>