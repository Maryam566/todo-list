<?php

require_once "db.php";
require_once "Todo.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $task = $_POST["task"] ?? "";
    $priority = $_POST["priority"] ?? "Low";

    if (empty(trim($task))) {
        echo "Task is required";
        exit;
    }

    $todo = new Todo($connection, null , $task , $priority);

    $result = $todo->save();

    if ($result) {
        echo "Task added successfully";
    } else {
        echo "Unable to add task";
    }
}

?>