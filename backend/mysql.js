var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', //
  password: '', //
  database: 'thesis',
})
connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('MySql Database connected')
})
module.exports = connection