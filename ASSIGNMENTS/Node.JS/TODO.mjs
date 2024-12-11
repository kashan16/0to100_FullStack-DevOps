"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var tasks = [];
// GET all tasks
router.get('/', function (req, res) {
    res.json(tasks);
});
// GET task by ID
router.get('/:id', function (req, res) {
    var taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        res.status(400).send('Invalid task ID');
    }
    var task = tasks.find(function (t) { return t.id === taskId; });
    if (!task)
        res.status(404).send('Task not FOUND');
    res.json(task);
});
// POST create a new task
router.post('/', function (req, res) {
    var task = req.body.task;
    if (!task) {
        res.status(400).send('Task description is required');
    }
    var newTask = {
        id: tasks.length + 1,
        task: task,
    };
    tasks.push(newTask);
    res.status(201).json(newTask); // No return, just respond
});
// PUT update a task
router.put('/:id', function (req, res) {
    var taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        res.status(400).send('Invalid task ID');
    }
    var task = tasks.find(function (t) { return t.id === taskId; });
    if (!task)
        res.status(404).send('Task not FOUND');
    var updatedTask = req.body.task;
    if (!updatedTask) {
        res.status(400).send('Task description is required');
    }
    task.task = updatedTask;
    res.json(task); // Send updated task as response
});
// DELETE a task
router.delete('/:id', function (req, res) {
    var taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        res.status(400).send('Invalid task ID');
    }
    var taskIdx = tasks.findIndex(function (t) { return t.id === taskId; });
    if (taskIdx === -1)
        res.status(404).send('Task not FOUND');
    tasks.splice(taskIdx, 1);
    res.status(204).send(); // Send a 204 No Content status for successful deletion
});
exports.default = router;
