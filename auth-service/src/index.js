<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
=======
<<<<<<< HEAD
const express = require('express');
const cors = require('cors');

>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Auth Service is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
=======
// mount auth routes
app.use('/api/auth', authRoutes);

// health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'auth-service'
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});

=======
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

// mount auth routes
app.use('/api/auth', authRoutes);

// health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'auth-service'
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});

>>>>>>> 57e685cc62836a15e96b86bab455df6805f8ccd6
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
