require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./db/db');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

async function start() {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`user-service running on ${PORT}`);
    });
  } catch (err) {
    console.error('user-service failed:', err);
    process.exit(1);
  }
}

start();