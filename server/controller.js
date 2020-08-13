const db = require('./model.js')

const controller = {};

controller.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  
  const text = `
    SELECT password, _id
    FROM friends
    WHERE username = '${username}';`
  
  try {
    const result = await db.query(text);
    const { password: resultPassword, _id: id  } = result.rows[0];
    if (password === resultPassword) {
      res.locals.id = id;
      return next();
    }
  } catch(err) {
    console.log('There was an error with the SQL query')
    return next(err);
  }
};

controller.getInfo = async (req, res, next) => {
  
  const text = `
    SELECT date, weight
    FROM weight
    WHERE weight.friends_id = '${res.locals.id}';`
  
  try {
    const result = await db.query(text);
    const weightSummary = result.rows;
    res.locals.output = weightSummary;
    return next();
  } catch(err) {
    console.log('There was an error with the SQL query')
    return next(err);
  }
};

module.exports = controller;
