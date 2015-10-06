var async = require('async');
var AWS = require('aws-sdk');
var util = require('util');
var DOC = require('dynamodb-doc');
var docClient = new DOC.DynamoDB();

var s3 = new AWS.S3();

exports.handler = function(event, context){
  //Read options from the event.
  console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));

  var srcBucket = event.Records[0].s3.bucket.name;
  //Get the bucket name
  var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  //Create a new dynamodb object
  async.waterfall([
    function upload(next){
      var params = {};
      params.TableName = 'lambda-demo';
      params.Item = {name: "test"};
      docClient.putItem(params, next);
    }], function (err) {
       if (err) {
         console.log('got an error');
         console.log(err, err.stack);
       } else {
         console.log('DynamoDB Put successful!');
       }
       context.done(err, ' ');
    });
}
