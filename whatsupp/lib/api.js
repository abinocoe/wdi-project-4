const aylien     = require('aylien_textapi');
const example = require('./texts/testArray.js');
console.log(example.array);

textAPI.sentiment({
  'text': example.array
}, function(error, response) {
  if (error === null) {
    console.log(response);
  }
});

textAPI.aspectBasedSentiment({
  'domain': 'restaurants',
  'text': example.array
}, function(err, response) {
  if (error === null) {
    response.aspects.forEach(function(aspect) {
      console.log(response);
    });
  }
});
