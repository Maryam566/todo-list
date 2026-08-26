<?php

class Todo
{
    private $connection;
    private $id;
    private $task;
    private $priority;

    public function __construct($connection, $id, $task, $priority)
    {
        $this->connection = $connection;
        $this->id = $id;
        $this->task = $task;
        $this->priority = $priority;
    }

    public function save()
    {
        if (empty($this->id)) {

            $sql = "INSERT INTO todos (task, priority) VALUES (?, ?)";

            $stmt = mysqli_prepare($this->connection, $sql);

            mysqli_stmt_bind_param(
                $stmt,
                "ss",
                $this->task,
                $this->priority
            );

            mysqli_stmt_execute($stmt);

            $this->id = mysqli_insert_id($this->connection);

            return true;

        } else {

            $sql = "UPDATE todos SET task = ?, priority = ? WHERE id = ?";

            $stmt = mysqli_prepare($this->connection, $sql);

            mysqli_stmt_bind_param(
                $stmt,
                "ssi",
                $this->task,
                $this->priority,
                $this->id
            );

            return mysqli_stmt_execute($stmt);
        }
    }

    public function get()
    {
        $sql = "SELECT id, task, priority FROM todos";

        $result = mysqli_query($this->connection, $sql);

        return $result;
    }

    public function find()
    {
        $sql = "SELECT id, task, priority FROM todos WHERE id = ?";

        $stmt = mysqli_prepare($this->connection, $sql);

        mysqli_stmt_bind_param($stmt, "i", $this->id);

        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);

        return $result;
    }

    public function delete()
    {
        $sql = "DELETE FROM todos WHERE id = ?";

        $stmt = mysqli_prepare($this->connection, $sql);

        mysqli_stmt_bind_param($stmt, "i", $this->id);

        return mysqli_stmt_execute($stmt);
    }
}

?>