const express = require('express');
const app = express();
const path = require('path');
const controller = require('./controller')

// PARSERS

app.use(express.json());
app.use(express.urlencoded());

// SERVE UP THE INITIAL FILES

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  });
}

// LOGGING IN

// app.post('/api', (req, res, next) => {
//   const { username, password } = req.body;
//   if (username === 'bonjay' && password === 'tseng') {
//     res.status(200).json('Successful request');
//   } else {
//     const errorMsg = 'Bad login credentials';
//     return next(errorMsg);
//   }
// });


app.post('/api',
  controller.verifyUser,
  controller.getInfo,
  (req, res) => {
    res.status(200).json(res.locals.output);
  }
);

// HANDLING UNKNOWN URLS

app.use('*', (req, res) => {
  res.status(404).send('URL path not found');
});

// GLOBAL ERROR HANDLER

app.use((err, req, res, next) => {
  res.sendStatus(400);
});

app.listen(3000);
