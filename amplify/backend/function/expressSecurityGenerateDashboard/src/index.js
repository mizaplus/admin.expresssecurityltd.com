const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const stateMachine = new AWS.StepFunctions();
  const res = await stateMachine.startExecution({
    stateMachineArn: process.env.STATE_MACHINE_ARN,
  }).promise();
  return res;
};
