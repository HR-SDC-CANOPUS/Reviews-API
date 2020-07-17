const csvtojson = require('convert-csv-to-json');
const path = require('path');
const csvFilePath = path.join(__dirname, '../data/reviews.csv');

let json = csvtojson.getJsonFromCsv(csvFilePath);

// console.log(json.slice(0, 10));

// csv().fromFile(csvFilePath)
// .then((json) => {
//   console.log(json.length);
// })