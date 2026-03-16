require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./db/db');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

async function start() {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`task-service running on ${PORT}`);
    });
  } catch (err) {
    console.error('task-service failed:', err);
    process.exit(1);
  }
}

start();