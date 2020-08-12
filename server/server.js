const express = require('express');
const app = express();
const path = require('path');

// Parsers

app.use(express.json());
app.use(express.urlencoded());

// Serve up the initial files

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  });
}

// Login

app.post('/api', (req, res, next) => {
  const { username, password } = req.body;
  if (username === 'bonjay' && password === 'tseng') {
    res.status(200).json('Successful request');
  } else {
    const errorMsg = 'Bad login credentials';
    return next(errorMsg);
  }
});

// Handling unknown URLs

app.use('*', (req, res) => {
  res.status(404).send('URL path not found');
});

// Error handler

app.use((err, req, res, next) => {
  res.sendstatus(400);
});

app.listen(3000);
