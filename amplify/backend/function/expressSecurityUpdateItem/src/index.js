const AWS = require("aws-sdk");
const { generateDate } = require("/opt/nodejs/index.js");

exports.handler = async (event) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const s3 = new AWS.S3({});
  const {
    PK,
    SK,
    heading,
    subHeading,
    description,
    details,
    product_name,
    category_name,
    tagline,
    category,
    highlights,
    image,
    oldImg,
    metaTitle,
    metaDesc,
  } = event;

  const generateExpression = () => {
    let exp = "set ";
    if (heading) {
      exp = exp + "heading = :h,";
    }
    if (subHeading) {
      exp = exp + "subHeading = :sh,";
    }
    if (description) {
      exp = exp + "description = :d,";
    }
    if (details) {
      exp = exp + "details = :inf,";
    }
    if (product_name) {
      exp = exp + "product_name = :cn,";
    }
    if (category_name) {
      exp = exp + "category_name = :catn,";
    }
    if (category) {
      exp = exp + "category = :cm,";
    }
    if (highlights) {
      exp = exp + "highlights = :hl,";
    }
    if (image) {
      exp = exp + "image = :img,";
    }
    if (metaTitle) {
      exp = exp + "metaTitle = :mt,";
    }
    if (metaDesc) {
      exp = exp + "metaDesc = :md,";
    }
    if (tagline) {
      exp = exp + "tagline = :tag,";
    }
    exp = exp + "last_update = :lu";
    return exp;
  };

  const generateAttributeValues = () => {
    let updates = {};
    if (tagline) {
      updates[":tag"] = tagline;
    }
    if (heading) {
      updates[":h"] = heading;
    }
    if (description) {
      updates[":d"] = description;
    }
    if (image) {
      updates[":img"] = image;
    }
    if (details) {
      updates[":inf"] = details;
    }
    if (product_name) {
      updates[":cn"] = product_name;
    }
    if (product_name) {
      updates[":cn"] = product_name;
    }
    if (category_name) {
      updates[":catn"] = category_name;
    }
    if (subHeading) {
      updates[":sh"] = subHeading;
    }
    if (highlights) {
      updates[":hl"] = highlights;
    }
    if (metaTitle) {
      updates[":mt"] = metaTitle;
    }
    if (metaDesc) {
      updates[":md"] = metaDesc;
    }
    updates[":lu"] = `${generateDate().date}, ${generateDate().time}`;
    return updates;
  };

  const expression = generateExpression();
  const attributeValues = generateAttributeValues();

  try {
    await documentClient
      .update({
        TableName: process.env.STORAGE_DATABASE_NAME,
        Key: {
          PK: PK,
          SK: SK,
        },
        UpdateExpression: expression,
        ExpressionAttributeValues: attributeValues,
      })
      .promise();
    if (oldImg) {
      try {
        await s3
          .deleteObject({
            Bucket: process.env.STORAGE_FILESTORAGE_BUCKETNAME,
            Key: oldImg.key.includes("public")
              ? oldImg.key
              : `public/${oldImg.key}`,
          })
          .promise();
        return {
          statusCode: 200,
          body: "Info and Image Updated Successfully.",
        };
      } catch (err) {
        console.log(err);
      }
    }
    return {
      statusCode: 200,
      body: "Info Updated Successfully.",
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.message,
    };
  }
};
