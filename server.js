const express = require('express');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/user', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'missing fields' });
  }
  res.status(201).json({ message: `Hello,  ${name}!`});
});

app.get('/user/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} profile` });
});

app.listen(PORT, () => {
  console.log(`API live on port ${PORT}`);
});