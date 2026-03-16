require('dotenv').config();
const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const morgan = require('morgan');
=======
const { initDB } = require('./db/db');
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(morgan('dev'));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'User Service is running' });
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
=======

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
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
