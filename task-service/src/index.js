<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
=======
<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./db/db');
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(morgan('dev'));

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Task Service is running' });
});

app.listen(PORT, () => {
  console.log(`Task Service running on port ${PORT}`);
});
=======

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

=======
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const { initDB } = require('./db/db');
const taskRoutes = require('./routes/tasks');

const app  = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(morgan('combined', {
  stream: { write: (msg) => console.log(msg.trim()) }
}));

app.use('/api/tasks', taskRoutes);
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

async function start() {
  let retries = 10;
  while (retries > 0) {
    try { await initDB(); break; }
    catch (err) {
      console.log(`[task-service] Waiting for DB... (${retries} retries left)`);
      retries--;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  app.listen(PORT, () => console.log(`[task-service] Running on port ${PORT}`));
}

>>>>>>> 57e685cc62836a15e96b86bab455df6805f8ccd6
start();
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
