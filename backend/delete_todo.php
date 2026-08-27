<?php

require_once "Loader.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $id = $_POST["id"] ?? "";

    if (empty($id)) {
        echo "Task ID is required";
        exit;
    }

    $todo = Todo::find($id);

    if (!$todo->id) {
        echo "Task not found";
        exit;
    }

    $result = $todo->delete();

    if ($result) {
        echo "Task deleted successfully";
    } else {
        echo "Unable to delete task";
    }
}

?>