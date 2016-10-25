// const aylien     = require('aylien_textapi');
// const toAnalyse  = require('./chatManipulator');
// const textAPI    = new aylien({
//   application_id: "e47c5ef6",
//   application_key: "bf3534a7149f26a0d8bbbe50bcc3b023"
// });
// const text       = toAnalyse.personOneMessages;
//
// module.exports = {
//   sentiment: textAPI.sentiment,
//   aspectBasedSentiment: textAPI.aspectBasedSentiment
// };
//
// textAPI.sentiment({
//   'text': toAnalyse.personOneMessages
// }, function(err, response) {
//   if (err === null) {
//     console.log(response);
//   }
// });
//
// textAPI.aspectBasedSentiment({
//   'domain': 'restaurants',
//   'text': 'text'
// }, function(err, response) {
//   console.log(response.sentences);
//   // console.log(err);
//   if (err === null) {
//     response.aspects.forEach(function(aspect) {
//       console.log(aspects);
//     });
//   }
// });
