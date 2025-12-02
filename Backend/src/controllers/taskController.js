const Task = require('../models/Task');

let tasks = [];
let nextId = 1;

const getAllTasks = (req, res) => {
  console.log('getAllTasks called');
  const { title, owner, status } = req.query;
  
  let filteredTasks = tasks;
  
  if (title) {
    filteredTasks = filteredTasks.filter(t => 
      t.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  
  if (owner) {
    filteredTasks = filteredTasks.filter(t => 
      t.owner.toLowerCase().includes(owner.toLowerCase())
    );
  }
  
  if (status) {
    filteredTasks = filteredTasks.filter(t => t.status === status);
  }
  
  res.json(filteredTasks);
};

const getTaskById = (req, res) => {
  console.log('getTaskById called with id:', req.params.id);
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
};

const createTask = (req, res) => {
  const { title, description, owner } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = new Task(nextId++, title, description, owner);
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, status } = req.body;
  const updatedTask = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    status: status || tasks[taskIndex].status
  };

  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
};

const deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
