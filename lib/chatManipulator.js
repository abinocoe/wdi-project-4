const fs       = require('fs');
const Analysis = require('../models/analysis');
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
      let array  = text.toString().split(/\n/).slice(1);
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
    function joinToMassiveStrings(names, personOneMessages, personTwoMessages, done) {
      const messageCountOne  = personOneMessages.length;
      const messageCountTwo  = personTwoMessages.length;
      const oneLargeSentence = personOneMessages.join(". ");
      const twoLargeSentence = personTwoMessages.join(". ");
      console.log(oneLargeSentence);
      return done(null, names, oneLargeSentence, twoLargeSentence, messageCountOne, messageCountTwo);
    },
    function sendFirstToAPI(names, oneLargeSentence, twoLargeSentence, messageCountOne, messageCountTwo, done) {
      textAPI.aspectBasedSentiment({
        'domain': 'restaurants',
        'text': oneLargeSentence
      }, function(err, response) {
        if (err) return done(err);
        return done(null, names, response.sentences, twoLargeSentence, messageCountOne, messageCountTwo);
      });
    },
    function sendSecondToAPI(names, personOneSentences, twoLargeSentence, messageCountOne, messageCountTwo, done) {
      textAPI.aspectBasedSentiment({
        'domain': 'restaurants',
        'text': twoLargeSentence
      }, function(err, response) {
        if (err) return done(err);
        return done(null, names, personOneSentences, response.sentences, messageCountOne, messageCountTwo);
      });
    },
    function totUpTotals(names, personOneSentences, personTwoSentences, messageCountOne, messageCountTwo, done) {

    let positivityOne     = 0;
    let negativityOne     = 0;
    let neutralOne        = 0;
    let positivityTwo     = 0;
    let negativityTwo     = 0;
    let neutralTwo        = 0;

    for (var i = 0; i < personOneSentences.length; i++) {
      if (personOneSentences[i].polarity === 'positive') {
        positivityOne++;
      } else if (personOneSentences[i].polarity === 'negative') {
        negativityOne++;
      } else {
        neutralOne++;
      }
    }

    for (var j = 0; j < personTwoSentences.length; j++) {
      if (personTwoSentences[j].polarity === 'positive') {
        positivityTwo+=1;
      } else if (personTwoSentences[j].polarity === 'negative') {
        negativityTwo++;
      } else {
        neutralTwo++;
      }
    }
      return done(null, {
        names,
        messageCountOne,
        positivityOne,
        negativityOne,
        neutralOne,
        messageCountTwo,
        positivityTwo,
        negativityTwo,
        neutralTwo
      });
    },
    function calculatePerCents({
        names,
        messageCountOne,
        positivityOne,
        negativityOne,
        neutralOne,
        messageCountTwo,
        positivityTwo,
        negativityTwo,
        neutralTwo
      }, done) {
      const nameOneResults = [];
      const nameTwoResults = [];
      const totalOne       = positivityOne + neutralOne + negativityTwo;
      const totalTwo       = positivityTwo + neutralTwo + negativityTwo;
      nameOneResults.push(names[0]);
      nameOneResults.push(messageCountOne);
      nameOneResults.push(((positivityOne / totalOne)*100).toFixed(1));
      nameOneResults.push(((negativityOne / totalOne)*100).toFixed(1));
      nameOneResults.push(((neutralOne / totalOne)*100).toFixed(1));
      nameTwoResults.push(names[1]);
      nameTwoResults.push(messageCountTwo);
      nameTwoResults.push(((positivityTwo / totalTwo)*100).toFixed(1));
      nameTwoResults.push(((negativityTwo / totalTwo)*100).toFixed(1));
      nameTwoResults.push(((neutralTwo / totalTwo)*100).toFixed(1));
      return done(null, nameOneResults, nameTwoResults);
    },
    function saveToDatabase(nameOneResults, nameTwoResults, done) {
      let object = {
        personOne: nameOneResults,
        personTwo: nameTwoResults
      };
      Analysis.create(object, (err, analysis) => {
        if (err) return console.error(err);
        return console.log(`${analysis.personOne[0]} and ${analysis.personTwo[0]}'s chat analysis was saved`);
      });
      return done(null, object);
    }
  ], function (err, result) {
    if (err) console.log(err);
    return next(null, result);
  });
}
