// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract TasksContract {

    uint public taskCounter = 0;

    constructor () {
        createTask("Tarea de ej", "Ejemplo de descripcion papu");
    }

    event TaskCreated(
        uint id,
        string title,
        string description,
        bool done,
        uint createAt
    );

    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createAt;
    }

    mapping (uint256 => Task) public tasks;

    function createTask(string memory _title, string memory _description) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }

    function toggleDone(uint _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
    }
}