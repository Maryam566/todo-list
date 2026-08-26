<?php

require_once "db.php";
require_once "todo.php";

header("Content-Type: application/json");

$id = $_POST["id"] ?? "";

if (empty($id)) {
    echo json_encode([
        "success" => false,
        "message" => "ID is required"
    ]);
    exit;
}

$todo = new Todo($connection, $id, "", "");

$result = $todo->find();

if (mysqli_num_rows($result) > 0) {

    $row = mysqli_fetch_assoc($result);

    echo json_encode([
        "success" => true,
        "id" => $row["id"],
        "task" => $row["task"],
        "priority" => $row["priority"]
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Task not found"
    ]);
}

?>