const { Pool } = require('pg');

const PG_URI = 'postgres://twlujxob:p4cGa5d7_e4pku5_ziGcAeDE_Z7e8juP@raja.db.elephantsql.com:5432/twlujxob';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};