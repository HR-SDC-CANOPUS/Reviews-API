const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'reviewsData'
});

client.connect();

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
      helpfulness int DEFAULT 0);`, (err, res) => {
        console.log(err ? err.stack : res.rows);
      })

    client.query(`CREATE TABLE IF NOT EXISTS photos (
      id SERIAL PRIMARY KEY,
      url VARCHAR,
      review_id int);`, (err, res) => {
        console.log(err ? err.stack : res.rows);
      })

    client.query(`CREATE TABLE IF NOT EXISTS characteristics (
      id SERIAL PRIMARY KEY,
      product_id int,
      name VARCHAR);`, (err, res) => {
        console.log(err ? err.stack : res.rows);
      })

    client.query(`CREATE TABLE IF NOT EXISTS characteristics_reviews (
      id SERIAL PRIMARY KEY,
      review_id int,
      characteristics_id int,
      value int);`, (err, res) => {
        console.log(err ? err.stack : res.rows);
      })

    // CREATE INDEX idx_pId ON reviews(product_id);
    // CREATE INDEX idx_rId ON photos(review_id);
    // CREATE INDEX idx_cpId ON characteristics(product_id);
    // CREATE INDEX idx_crcId ON characteristics_reviews(characteristics_id);
  }

    }

module.exports = client;