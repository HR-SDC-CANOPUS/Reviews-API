const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'secret',
  database: 'reviewsData'
});

client.connect();

//! TEST CONNECTION
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })

const queries = {

  createSchema: () => {
    client.query(`CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      product_id int,
      rating int,
      date timestamp,
      summary VARCHAR,
      body VARCHAR,
      recommend boolean,
      reported boolean,
      reviewer_name VARCHAR,
      reviewer_email VARCHAR,
      response VARCHAR,
      helpfulness int);`, (err, res) => {
        console.log(err ? err.stack : res.rows);
        // client.end()
      })

    client.query(`CREATE TABLE IF NOT EXISTS photos (
      id SERIAL PRIMARY KEY,
      url VARCHAR,
      review_id int);`, (err, res) => {
        console.log(err ? err.stack : res.rows);
        // client.end()
      })

    client.query(`CREATE TABLE IF NOT EXISTS characteristics (
      id SERIAL PRIMARY KEY,
      product_id int,
      name VARCHAR);`, (err, res) => {
        console.log(err ? err.stack : res.rows);
        // client.end()
      })

    client.query(`CREATE TABLE IF NOT EXISTS characteristics_reviews (
      id SERIAL PRIMARY KEY,
      review_id int,
      characteristics_id int,
      value int);`, (err, res) => {
        console.log(err ? err.stack : res.rows);
        // client.end()
      })
  },

  copyCsvToReviews: (path) => {

  },

  copyCsvToPhotos: (path) => {
    client.query(`COPY photos(id, url, review_id)
    FROM '${path}' DELIMITER ',' CSV HEADER;`, (err, res) => {
        console.log(err ? err.stack : res.rows);
        // client.end()
      })

  },

  copyCsvToCharacteristics: (path) => {

  },

  copyCsvToCharacteristicsReviews: (path) => {

  },

  insertIntoReviews: (data) => {
    client.query(`INSERT INTO reviews (
        id,
        product_id,
        rating,
        date,
        summary,
        body,
        recommend,
        reported,
        reviewer_name,
        reviewer_email,
        response,
        helpfulness)
        VALUES (
          ${data[0]},
          ${data[1]},
          ${data[2]},
          '${data[3]}',
          '${data[4]}',
          '${data[5]}',
          '${data[6]}',
          ${data[7]},
          '${data[8]}',
          '${data[9]}',
          '${data[10]}',
          ${data[11]}
        );`, (err, res) => {
        console.log(err ? err.stack : res.rows);
        // client.end()
      })
  }



      // client.query(`INSERT INTO reviews (
      //   id,
      //   product_id,
      //   rating,
      //   date,
      //   summary,
      //   body,
      //   recommend,
      //   reported,
      //   reviewer_name,
      //   reviewer_email,
      //   response,
      //   helpfulness)
      //   VALUES (
      //     80091,
      //     13806,
      //     3,
      //     '2019-05-27T00:00:00.000Z',
      //     'Aut dolorem',
      //     'Id dicta',
      //     1,
      //     0,
      //     'Korey96',
      //     'Rusty_Corkery@yahoo.com',
      //     ${null},
      //     19);`, (err, res) => {
      //   console.log(err ? err.stack : res.rows);
      //   client.end()
      // })

    }

module.exports = client;