const csv = require('csvtojson');

exports.convertCsvToJson = (report) => 
    csv()
        .fromString(report)
        .then((jsonObj) => jsonObj.filter((obj, index) => index > 0))


