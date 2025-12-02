const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

console.log('Task routes loaded');
// Las rutas específicas ANTES que las rutas con parámetros
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.patch('/:id', taskController.updateTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
