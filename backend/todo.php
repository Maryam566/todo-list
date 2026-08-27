<?php

class Todo
{
    private $table = "todos";

    public $id;
    public $task;
    public $priority;

    public function __construct()
    {
    }

    public function save()
    {
        if ($this->id) {
            return $this->update();
        }

        return $this->create();
    }

    private function update()
    {
        $connection = new Connection();

        $sql = "UPDATE todos SET task = ?, priority = ? WHERE id = ?";

        $stmt = mysqli_prepare($connection->connection, $sql);

        mysqli_stmt_bind_param(
            $stmt,
            "ssi",
            $this->task,
            $this->priority,
            $this->id
        );

        return mysqli_stmt_execute($stmt);
    }

    private function create()
    {
        $connection = new Connection();

        $sql = "INSERT INTO todos (task, priority) VALUES (?, ?)";

        $stmt = mysqli_prepare($connection->connection, $sql);

        mysqli_stmt_bind_param(
            $stmt,
            "ss",
            $this->task,
            $this->priority
        );

        mysqli_stmt_execute($stmt);

        $this->id = mysqli_insert_id($connection->connection);

        return true;
    }

    public static function all()
    {
        $connection = new Connection();

        $sql = "SELECT * FROM todos";

        $result = mysqli_query($connection->connection, $sql);

        $todos = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $todo = new self;

            $todo->fill($row);

            $todos[] = $todo;
        }

        return $todos;
    }

    private function fill($row)
    {
        $this->id = $row['id'];
        $this->task = $row['task'];
        $this->priority = $row['priority'];
    }

    public static function find($id)
    {
        $connection = new Connection();

        $sql = "SELECT * FROM todos WHERE id = " . $id;

        $result = mysqli_query($connection->connection, $sql);

        $row = mysqli_fetch_assoc($result);

        $todo = new self;

        if ($row) {
            $todo->fill($row);
        }

        return $todo;
    }

    public function delete()
    {
        $connection = new Connection();

        $sql = "DELETE FROM todos WHERE id = ?";

        $stmt = mysqli_prepare($connection->connection, $sql);

        mysqli_stmt_bind_param(
            $stmt,
            "i",
            $this->id
        );

        return mysqli_stmt_execute($stmt);
    }
}

?>