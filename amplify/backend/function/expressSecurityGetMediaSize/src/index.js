const AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {
  const s3 = new AWS.S3();
  const response = { ...event };
  var params = {
    Bucket: process.env.STORAGE_FILESTORAGE_BUCKETNAME,
  };

  function reducer(previous, current) {
    const returns = previous + current;
    return returns;
  }

  let mediaSize = 0;

  s3.listObjects(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      const array = [...data.Contents.map((item) => item.Size)];
      mediaSize = array.reduce(reducer) / 1000000;
      response.performance_metrics["mediaSize"] = {
        title: "Media Stored",
        amount: parseFloat(mediaSize.toFixed(2)),
      };
      callback(null, response);
    }
  });
};