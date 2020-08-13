const db = require('./model.js');

const controller = {};

controller.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  const text = `
    SELECT username
    FROM friends
    WHERE username = '${username}';`;
  try {
    const result = await db.query(text);
    if (result.rows.length) {
      return next('Username already exists. Please retry.');
    }
    console.log(username, password);
    const queryText = `
      INSERT INTO friends (username, password)
      VALUES ('${username}', '${password}');`;
    await db.query(queryText);
    return next();
  } catch (err) {
    console.log('Error occurred with SQL req: ', err);
    return next('Database malfunctioned');
  }
};

controller.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  const text = `
    SELECT password, _id
    FROM friends
    WHERE username = '${username}';`;
  try {
    const result = await db.query(text);
    const { password: resultPassword, _id: id } = result.rows[0];
    if (password === resultPassword) {
      res.locals.msg = 'Successful sign-in';
      res.locals.id = id;
      return next();
    }
    return next('Incorrect password provided');
  } catch (err) {
    console.log('Error occurred with SQL req: ', err);
    return next('Unknown user provided');
  }
};

controller.getInfo = async (req, res, next) => {
  const text = `
    SELECT date, weight
    FROM weight
    WHERE weight.friends_id = '${res.locals.id}';`;
  try {
    const result = await db.query(text);
    const weightSummary = result.rows;
    res.locals.output = weightSummary;
    return next();
  } catch (err) {
    console.log('Error occurred with SQL req: ', err);
    return next('Database malfunctioned');
  }
};

controller.updateInfo = async (req, res, next) => {
  const { date, weight } = req.body;

  const text = `
   INSERT INTO weight (date, weight, friends_id)
   VALUES ('${date}', ${weight}, ${res.locals.id});`;
  try {
    await db.query(text);
    res.locals.msg = 'Successfully updated';
    return next();
  } catch (err) {
    console.log('Error occurred with SQL req: ', err);
    return next('Database malfunctioned');
  }
};

module.exports = controller;
