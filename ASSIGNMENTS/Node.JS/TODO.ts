import * as express from "express";
const router = express.Router();

type Task = {
    id: number;
    task: string;
};

let tasks: Task[] = [];

// GET all tasks
router.get('/', (req: express.Request, res: express.Response): void => {
    res.json(tasks);
});

// GET task by ID
router.get('/:id', (req: express.Request, res: express.Response): void => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        res.status(400).send('Invalid task ID');
    }
    const task = tasks.find(t => t.id === taskId);
    if (!task) res.status(404).send('Task not FOUND');
    res.json(task);
});

// POST create a new task
router.post('/', (req: express.Request, res: express.Response): void => {
    const { task } = req.body;
    if (!task) {
        res.status(400).send('Task description is required');
    }

    const newTask: Task = {
        id: tasks.length + 1,
        task,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);  // No return, just respond
});

// PUT update a task
router.put('/:id', (req: express.Request, res: express.Response): void => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        res.status(400).send('Invalid task ID');
    }

    const task = tasks.find(t => t.id === taskId);
    if (!task) res.status(404).send('Task not FOUND');

    const { task: updatedTask } = req.body;
    if (!updatedTask) {
        res.status(400).send('Task description is required');
    }

    task.task = updatedTask;
    res.json(task);  // Send updated task as response
});


// DELETE a task
router.delete('/:id', (req: express.Request, res: express.Response): void => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        res.status(400).send('Invalid task ID');
    }

    const taskIdx = tasks.findIndex(t => t.id === taskId);
    if (taskIdx === -1) res.status(404).send('Task not FOUND');

    tasks.splice(taskIdx, 1);
    res.status(204).send();  // Send a 204 No Content status for successful deletion
});

export default router;
