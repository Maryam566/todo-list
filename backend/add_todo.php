<?php

require_once "Loader.php";

$task = $_POST["task"] ?? "";
$priority = $_POST["priority"] ?? "";

if (empty($task) || empty($priority)) {
    echo "Task and priority are required";
    exit;
}

$todo = new Todo();

$todo->task = $task;
$todo->priority = $priority;

if ($todo->save()) {
    echo "Task added successfully";
} else {
    echo "Unable to add task";
}

?>