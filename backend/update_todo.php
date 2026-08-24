<?php

require_once "db.php";
require_once "Todo.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $id = $_POST["id"] ?? "";
    $task = $_POST["task"] ?? "";
    $priority = $_POST["priority"] ?? "Low";

    if (empty($id) || empty(trim($task))) {
        echo "Task and ID are required";
        exit;
    }

    $todo = new Todo($connection);

    $result = $todo->updateTask($id, $task, $priority);

    if ($result) {
        echo "Task updated successfully";
    } else {
        echo "Unable to update task";
    }
}

?>