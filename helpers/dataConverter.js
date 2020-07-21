const fs = require('fs');
const { parse, transform } = require('csv');
const path = require('path');

const csvReadFilePath = path.join(__dirname, '../data/reviews.csv');
const csvWriteFilePath = path.join(__dirname, '../data/_cleanedReviews.csv');

const fsReadStream = fs.createReadStream(csvReadFilePath);
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const queries = require('../database/postgresConnection.js');

// queries.copyCsvToPhotos(path.join(__dirname, '../data/reviews_photos.csv'));

const csvWriter = createCsvWriter({
  path: csvWriteFilePath,
  header: [
      {id: 'id', title: 'id'},
      {id: 'product_id', title: 'product_id'},
      {id: 'rating', title: 'rating'},
      {id: 'date', title: 'date'},
      {id: 'summary', title: 'summary'},
      {id: 'body', title: 'body'},
      {id: 'recommend', title: 'recommend'},
      {id: 'reported', title: 'reported'},
      {id: 'reviewer_name', title: 'reviewer_name'},
      {id: 'reviewer_email', title: 'reviewer_email'},
      {id: 'response', title: 'response'},
      {id: 'helpfulness', title: 'helpfulness'}
  ]
});

// id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

const cleaner = (data) => {
  if (isNaN(data[0]) || !data[0] || isNaN(data[1]) || !data[1]) {
    return;
  }
  data[0] = Number(data[0]);
  data[1] = Number(data[1]);
  data[2] = !!data[2] && !isNaN(data[2]) ? Number(data[2]) : null;
  data[3] = !!data[3] && new Date(data[3]) != 'Invalid Date' ? String(data[3]) : null;
  data[4] = !!data[4] ? String(data[4]).slice(0,255) : '';
  data[5] = !!data[5] ? String(data[5]).slice(0,255) : '';
  data[6] = !isNaN(data[6]) ? Number(data[6]) : 0;
  data[7] = !isNaN(data[7]) ? Number(data[7]) : 0;
  data[8] = !!data[8] ? String(data[8]) : '';
  data[9] = !!data[9] ? String(data[9]) : '';
  data[10] = !!data[10] && data[10] !== 'null' ? String(data[10]).slice(0,255) : null;
  data[11] = !!data[11] && !isNaN(data[11]) ? Number(data[11]) : 0;
  return data;
}

const formatter = (data) => {
  return ({
    id: data[0],
    product_id: data[1],
    rating: data[2],
    date: data[3],
    summary: data[4],
    body: data[5],
    recommend: data[6],
    reported: data[7],
    reviewer_name: data[8],
    reviewer_email: data[9],
    response: data[10],
    helpfulness: data[11]
  });
}

let batchArray = [];
let batchSize = 1;
let i = 0;


fsReadStream
.pipe(parse())
.on('data', (chunk) => {
  transform([chunk], cleaner)
  .on('readable', function() {
    while(row = this.read()){

      //! WRITE TO CSV
      let records = [formatter(row)];
      csvWriter.writeRecords(records)
        .then(() => {
            i += 1;
            console.log(`CSV Records Written: ${i}`);
        });

      //! INSERT INDIVIDUAL
      // queries.insertIntoReviews(row);
      // i += 1;
      // console.log('Parsed: ', i * batchSize, ' - ', ((i * batchSize) * 100 / 6000000).toPrecision(3), '%');

      //! INSERT BATCHES
      // batchArray.push(row);
      // if (batchArray.length === batchSize) {
      //   queries.insertIntoReviews(batchArray);
      //   batchArray = [];
      //   i += 1;
      //   console.log('Parsed: ', i * batchSize, ' - ', ((i * batchSize) * 100 / 6000000).toPrecision(3), '%');
      // }
    }
  })
  .on('error', function(err){
    console.error(err.message)
  })
})
.on('end', () => { console.log('DONE!')})