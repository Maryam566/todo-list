<?php

class Todo
{
    private $connection;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function addTask($task, $priority)
    {
        $sql = "INSERT INTO todos (task, priority) VALUES (?, ?)";

        $stmt = mysqli_prepare($this->connection, $sql);

        mysqli_stmt_bind_param($stmt, "ss", $task, $priority);

        return mysqli_stmt_execute($stmt);
    }

    public function getTasks()
    {
        $sql = "SELECT id, task, priority FROM todos";

        $result = mysqli_query($this->connection, $sql);

        return $result;
    }

    public function updateTask($id, $task, $priority)
    {
        $sql = "UPDATE todos SET task = ?, priority = ? WHERE id = ?";

        $stmt = mysqli_prepare($this->connection, $sql);

        mysqli_stmt_bind_param($stmt, "ssi", $task, $priority, $id);

        return mysqli_stmt_execute($stmt);
    }

    public function deleteTask($id)
    {
        $sql = "DELETE FROM todos WHERE id = ?";

        $stmt = mysqli_prepare($this->connection, $sql);

        mysqli_stmt_bind_param($stmt, "i", $id);

        return mysqli_stmt_execute($stmt);
    }
}

?>