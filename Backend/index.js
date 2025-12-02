const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
console.log('Starting Backend API');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running' });
});

app.use('/api/tasks', taskRoutes);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
