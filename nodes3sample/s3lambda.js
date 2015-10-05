console.log('Loading function');

var aws = require('aws-sdk');
var s3 = new aws.s3({apiVersion: '2006-03-01'});

exports.handler = function(event, context){
  console.log('Received Event:', JSON.stringify(event, null, 2));
  //Get the object from the event and show its content type
  var bucket = event.Records[0].s3.bucket.name;
  var key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  s3.getObject({Bucket: bucket, Key: key}, function(err, data){
    if(err){
      console.log("Error getting object " + key + " from bucket " + bucket +
        ". Make sure they exist and your bucket is in the same region as this function.");
      context.fail("Error getting file: " + err);
    } else {
      console.log('CONTENT TYPE:', data.ContentType);
      context.succeed();
    }
  });
};
