const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const s3 = new AWS.S3({});
  const { PK, SK, images } = event;

  try {
    await documentClient
      .delete({
        TableName: process.env.STORAGE_DATABASE_NAME,
        Key: {
          PK: PK,
          SK: SK,
        },
      })
      .promise();
    if (images) {
      const paramsS3 = {
        Bucket: process.env.STORAGE_FILESTORAGE_BUCKETNAME,
        Delete: {
          Objects: images.map((key) => ({ Key: key })),
        },
      };
      try {
        await s3.deleteObjects(paramsS3).promise();
        return {
          statusCode: 200,
          body: "Item Deleted Successfully.",
        };
      } catch (err) {
        return {
          statusCode: 404,
          body: err.message,
        };
      }
    }
    return {
      statusCode: 200,
      body: "Item Deleted Successfully.",
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.message,
    };
  }
};