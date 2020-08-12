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



// Handling unknown URLs

app.use('*', (req, res) => {
  res.status(400).send('URL path not found');
});

app.listen(3000);
