const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'secret',
  database: 'reviews'
});

client.connect();

client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  client.end()
})

// client.query(`CREATE TABLE mike_test_data(
// 	user_id serial PRIMARY KEY,
// 	username VARCHAR (50) UNIQUE NOT NULL,
// 	password VARCHAR (50) NOT NULL,
// 	email VARCHAR (355) UNIQUE NOT NULL,
// 	created_on TIMESTAMP NOT NULL,
// 	last_login TIMESTAMP
// );`, (err, res) => {
//   console.log(err ? err.stack : res.rows);
//   client.end()
// })

// client.query(`INSERT INTO mike_test_data (user_id, username, password, email) VALUES (1, 'mdoudy', '123', 'test');`, (err, res) => {
//   console.log(err ? err.stack : res.rows);
//   client.end()
// })


// client.query(`SELECT * FROM mike_test_data;`, (err, res) => {
//   console.log(err ? err.stack : res.rows);
//   client.end()
// })
