const fs       = require('fs');
const aylien   = require('aylien_textapi');
const textAPI  = new aylien({
  application_id: "e47c5ef6",
  application_key: "bf3534a7149f26a0d8bbbe50bcc3b023"
});
const Bluebird = require("bluebird");
const async    = require("async");

module.exports = Bluebird.promisify(convert);

function convert(text, next) {
  return async.waterfall([
    function readFile(done) {
      let array  = text.toString().split(/\n/);
      let result = [];

      for (var i = 0; i < array.length; i++) {
        result.push((array[i].split(/\-\s/).slice(1))[0]);
      }

      return done(null, result);
    },
    function getNames(result, done) {
      let names = [];
      names.push(result[0].split(/\:\s/)[0]);

      for (var i = 1; i < result.length-1; i++) {
        if (names.length != 2 && result[i].split(/\:\s/)[0] != names[0] ) {
          names.push(result[i].split(/\:\s/)[0]);
        }
      }
      return done(null, result, names);
    },
    function populateMessageArrays(result, names, done) {
      var personOneMessages = [];
      var personTwoMessages = [];

      for (var i = 1; i < result.length; i++) {
        if (result[i] === undefined || result[i].split(/\:\s/)[1] === '<Media omitted>') {
          // console.log("err");
        } else if (result[i].split(/\:\s?/)[0] === names[0]) {
          personOneMessages.push(result[i].split(/\:\s/)[1]);
        } else {
          personTwoMessages.push(result[i].split(/\:\s/)[1]);
        }
      }

      return done(null, names, personOneMessages, personTwoMessages);
    },
    function sendFirstToAPI(names, personOneMessages, personTwoMessages, done) {
      textAPI.aspectBasedSentiment({
        'domain': 'restaurants',
        'text': personOneMessages
      }, function(err, response) {
        if (err) return done(err);

        console.log("&&&&&&&&&&&&&&&&&&&&&&&", response.sentences)

        return done(null, names, response.sentences, personTwoMessages);
      });
    },
    function sendSecondToAPI(names, personOneSentences, personTwoMessages, done) {
      textAPI.aspectBasedSentiment({
        'domain': 'restaurants',
        'text': personTwoMessages
      }, function(err, response) {
        if (err) return done(err);

        console.log("&&&&&&&&&&&&&&&&&&&&&&&", response.sentences)

        return done(null, names, personOneSentences, response.sentences);
      });
    }
  ], function (err, names, personOneSentences, personTwoSentences) {
    if (err) console.log(err);
    return next(null, {
      names,
      personOneSentences,
      personTwoSentences
    });
  });
}
