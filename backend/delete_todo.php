<?php

require_once "db.php";
require_once "Todo.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $id = $_POST["id"] ?? "";

    if (empty($id)) {
        echo "Task ID is required";
        exit;
    }

    $todo = new Todo($connection);

    $result = $todo->deleteTask($id);

    if ($result) {
        echo "Task deleted successfully";
    } else {
        echo "Unable to delete task";
    }
}

?>