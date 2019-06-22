var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_chowk',
  password        : '6280',
  database        : 'cs290_chowk'
});

module.exports.pool = pool;
