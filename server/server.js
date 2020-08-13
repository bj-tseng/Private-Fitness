const express = require('express');

const app = express();
const path = require('path');
const controller = require('./controller');

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

// CREATING A NEW USER

app.post('/api/create',
  controller.createUser,
  controller.verifyUser,
  controller.getInfo,
  (req, res) => {
    const returnMsg = {
      msg: 'Successful account creation',
      data: res.locals.output,
    };
    res.status(200).json(returnMsg);
  });

// LOGGING IN

app.post('/api/login',
  controller.verifyUser,
  controller.getInfo,
  (req, res) => {
    const returnMsg = {
      msg: res.locals.msg,
      data: res.locals.output,
    };
    res.status(200).json(returnMsg);
  });

// UPDATING USER DATA

app.post('/api/update',
  controller.verifyUser,
  controller.updateInfo,
  controller.getInfo,
  (req, res) => {
    const returnMsg = {
      msg: res.locals.msg,
      data: res.locals.output,
    };
    res.status(200).json(returnMsg);
  });

// HANDLING UNKNOWN URLS

app.use('*', (req, res) => {
  res.status(404).send('URL path not found');
});

// GLOBAL ERROR HANDLER

app.use((err, req, res, next) => {
  res.status(400).json(err);
});

app.listen(3000);
