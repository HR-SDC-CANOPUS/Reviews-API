const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['0.0.0.0:9042'],
  localDataCenter: 'datacenter1'
});

// CREATE KEYSPACE mykeyspace WITH replication = {'class' : 'NetworkTopologyStrategy', 'datacenter1' : 1, 'datacenter2' : 1};

// CREATE TABLE mykeyspace.mytable (id int primary key, name text);

module.exports = {
  createKeyspace: () => {

    let query = `CREATE KEYSPACE mykeyspace WITH replication = {'class' : 'NetworkTopologyStrategy', 'datacenter1' : 1, 'datacenter2' : 1};`;

    client.execute(query)
      .then(result => console.log('HERE: ', result))
      .catch(err => console.log(err));
  },

  useKeyspace: () => {
    let query = 'USE mykeyspace;';

    client.execute(query)
      .then(result => console.log('HERE: ', result))
      .catch(err => console.log(err));
  },

  submitQuery: () => {

    // id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

    let query = `CREATE TABLE mykeyspace.groupby_productid (
      review_id int,
      product_id int,
      rating int,
      date timestamp,
      summary text,
      body text,
      recommend int,
      reported int,
      reviewer_name text,
      reviewer_email text,
      response text,
      helpfulness int,
      photos blob,
      hash_prefix int,
      PRIMARY KEY ((product_id, hash_prefix), date))
      WITH CLUSTERING ORDER BY (date DESC);`;

    client.execute(query)
      .then(result => console.log('HERE: ', Object.keys(result).length))
      .catch(err => console.log(err));

  },

  insertInto: ({
    product_id,
    review_id,
    date,
    rating,
    summary,
    body,
    response,
    reviewer_name,
    reviewer_email,
    recommend,
    helpfulness,
    reported
  }) => {

    let params = [
      product_id,
      review_id,
      date,
      rating,
      summary,
      body,
      response,
      reviewer_name,
      reviewer_email,
      recommend,
      helpfulness,
      reported,
      new Buffer(JSON.stringify({url: 'test@test.com'})),
      new Buffer(reviewer_email, 'utf16le')[0] % 3
     ];

    let query = `INSERT INTO mykeyspace.groupby_productid (
      review_id,
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
      helpfulness,
      photos,
      hash_prefix,
      )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    client.execute(query, params, { prepare : true })
      .then(result => console.log('HERE: ', result))
      .catch(err => console.log(err));
  },

  batchInsert: (queries) => {

    client.batch(queries, { prepare: true })
      .then(function() {
        console.log('BATCH INSERT SUCCESSFUL');
      })
      .catch(function(err) {
        console.log('BATCH INSERT ERROR');
      });
  },

  copyFromCsv: (fileName) => {
    // COPY table_name [( column_list )]
    // FROM 'file_name'[, 'file2_name', ...] | STDIN
    // [WITH option = 'value' [AND ...]]

    // COPY mykeyspace.groupby_productid (review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness, photos, hash_prefix) FROM './data/_cleanedReviews.csv' WITH HEADER = TRUE;

    let query = `COPY mykeyspace.groupby_productid (
                  review_id,
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
                  helpfulness,
                  photos,
                  hash_prefix
                  )
                FROM '/Users/michaeldoudy/Desktop/Hack-Reactor/SDC/Reviews-API/data/_cleanedReviews.csv' WITH HEADER = TRUE;`;

    client.execute(query)
      .then(result => console.log('COPY COMPLETE'))
      .catch(err => console.log('COPY ERROR: ', err));
  }

}

// let query = `CREATE KEYSPACE mykeyspace WITH replication = {'class' : 'NetworkTopologyStrategy', 'datacenter1' : 1, 'datacenter2' : 1};`;

// client.execute(query)
//   .then(result => console.log('HERE: ', result))
//   .catch(err => console.log(err));

// query = 'USE mykeyspace;';

// client.execute(query)
//   .then(result => console.log('HERE: ', result))
//   .catch(err => console.log(err));

// query = `CREATE TABLE mykeyspace.groupby_productid_sortby_date (
//   product_id int,
//   review_id int,
//   date timestamp,
//   rating int,
//   summary text,
//   body text,
//   response text,
//   reviewer_name text,
//   reviewer_email text,
//   recommend int,
//   helpfulness int,
//   reported int,
//   photos blob,
//   hash_prefix int,
  // PRIMARY KEY ((product_id, hash_prefix), date))
  // WITH CLUSTERING ORDER BY (date DESC);`;

// client.execute(query)
//   .then(result => console.log('HERE: ', Object.keys(result).length))
//   .catch(err => console.log(err));






// CREATE TABLE reviews.groupby_productid_sortby_date (
//   product_id int,
//   review_id int,
//   date timestamp,
//   rating int,
//   summary text,
//   body text,
//   response text,
//   reviewer_name text,
//   reviewer_email text,
//   recommend int,
//   helpfulness int,
//   reported int,
//   photos blob,
//   hash_prefix int,
//   PRIMARY KEY ((product_id, hash_prefix), date),
//   WITH CLUSTERING ORDER BY (date DESC);
// )

// CREATE TABLE reviews.groupby_productid_sortby_helpfulness (
//   product_id int,
//   review_id int,
//   date timestamp,
//   rating int,
//   summary text,
//   body text,
//   response text,
//   reviewer_name text,
//   reviewer_email text,
//   recommend int,
//   helpfulness int,
//   reported int,
//   photos blob,
//   hash_prefix int,
//   PRIMARY KEY ((product_id, hash_prefix), helpfulness),
//   WITH CLUSTERING ORDER BY (helpfulness DESC);
// )

// CREATE TABLE reviews.groupby_productid_sortby_relevance (
//   product_id int,
//   review_id int,
//   date timestamp,
//   rating int,
//   summary text,
//   body text,
//   response text,
//   reviewer_name text,
//   reviewer_email text,
//   recommend int,
//   helpfulness int,
//   reported int,
//   photos blob,
//   hash_prefix int,
//   PRIMARY KEY ((product_id, hash_prefix), review_id),
//   WITH CLUSTERING ORDER BY (helpfulness DESC, date DESC);
// )

// CREATE TABLE metadata.groupby_productid (
//   product_id int PRIMARY KEY,
//   ratings_0 int,
//   ratings_1 int,
//   ratings_2 int,
//   ratings_3 int,
//   ratings_4 int,
//   ratings_5 int,
//   recommended_0 int,
//   recommended_1 int,
//   characteristics blob
// )
