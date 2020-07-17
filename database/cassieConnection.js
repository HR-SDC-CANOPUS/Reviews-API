const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['0.0.0.0:9042'],
  localDataCenter: 'datacenter1'
});

// CREATE KEYSPACE mykeyspace WITH replication = {'class' : 'NetworkTopologyStrategy', 'datacenter1' : 1, 'datacenter2' : 1};

// CREATE TABLE mykeyspace.mytable (id int primary key, name text);

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
//   PRIMARY KEY ((product_id, hash_prefix), date))
//   WITH CLUSTERING ORDER BY (date DESC);`;

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
