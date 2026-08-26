<?php

require_once "db.php";
require_once "Todo.php";

$todo = new Todo($connection, "", "", "");

$result = $todo->get();

$todos = [];

while ($row = mysqli_fetch_assoc($result)) {
    $todos[] = $row;
}

header("Content-Type: application/json");

echo json_encode($todos);

?>