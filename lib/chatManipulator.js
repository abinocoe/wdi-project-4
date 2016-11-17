// const fs       = require('fs');
// const Analysis = require('../models/analysis');
// const aylien   = require('aylien_textapi');
// const textAPI  = new aylien({
//   application_id: "e47c5ef6",
//   application_key: "bf3534a7149f26a0d8bbbe50bcc3b023"
// });
// const Bluebird = require("bluebird");
// const async    = require("async");
//
// module.exports = Bluebird.promisify(convert);
//
// function convert(text, next) {
//   return async.waterfall([
//     function readFile(done) {
//       let array  = text.toString().split(/\n/).slice(1);
//       let result = [];
//
//       for (var i = 0; i < array.length; i++) {
//         result.push((array[i].split(/\-\s/).slice(1))[0]);
//       }
//
//       return done(null, result);
//     },
//     function getNames(result, done) {
//       let names = [];
//       names.push(result[0].split(/\:\s/)[0]);
//
//       for (var i = 1; i < result.length-1; i++) {
//         if (names.length != 2 && result[i].split(/\:\s/)[0] != names[0] ) {
//           names.push(result[i].split(/\:\s/)[0]);
//         }
//       }
//       return done(null, result, names);
//     },
//     function populateMessageArrays(result, names, done) {
//       var personOneMessages = [];
//       var personTwoMessages = [];
//
//       for (var i = 1; i < result.length; i++) {
//         if (result[i] === undefined || result[i].split(/\:\s/)[1] === '<Media omitted>') {
//           // console.log("err");
//         } else if (result[i].split(/\:\s?/)[0] === names[0]) {
//           personOneMessages.push(result[i].split(/\:\s/)[1]);
//         } else {
//           personTwoMessages.push(result[i].split(/\:\s/)[1]);
//         }
//       }
//
//       return done(null, names, personOneMessages, personTwoMessages);
//     },
//     function joinToMassiveStrings(names, personOneMessages, personTwoMessages, done) {
//       const messageCountOne  = personOneMessages.length;
//       const messageCountTwo  = personTwoMessages.length;
//       const oneLargeSentence = personOneMessages.join(". ");
//       const twoLargeSentence = personTwoMessages.join(". ");
//       console.log(oneLargeSentence);
//       return done(null, names, oneLargeSentence, twoLargeSentence, messageCountOne, messageCountTwo);
//     },
//     function sendFirstToAPI(names, oneLargeSentence, twoLargeSentence, messageCountOne, messageCountTwo, done) {
//       // console.log(oneLargeSentence);
//       textAPI.aspectBasedSentiment({
//         'domain': 'restaurants',
//         'text': oneLargeSentence
//       }, function(err, response) {
//         if (err) return done(err);
//         console.log("&&&&&&&&&&&&&&&&&&&&&&&", response.sentences)
//
//         return done(null, names, response.sentences, twoLargeSentence, messageCountOne, messageCountTwo);
//       });
//     },
//     function sendSecondToAPI(names, personOneSentences, twoLargeSentence, messageCountOne, messageCountTwo, done) {
//       textAPI.aspectBasedSentiment({
//         'domain': 'restaurants',
//         'text': twoLargeSentence
//       }, function(err, response) {
//         if (err) return done(err);
//
//         console.log("&&&&&&&&&&&&&&&&&&&&&&&", response.sentences)
//         return done(null, names, personOneSentences, response.sentences, messageCountOne, messageCountTwo);
//       });
//     },
//     function blah(names, personOneSentences, personTwoSentences, messageCountOne, messageCountTwo, done) {
//     // write logic here to calculate percentages
//     let positivityOne     = 0;
//     let negativityOne     = 0;
//     let neutralOne        = 0;
//     let positivityTwo     = 0;
//     let negativityTwo     = 0;
//     let neutralTwo        = 0;
//
//     for (var i = 0; i < personOneSentences.length; i++) {
//       if (personOneSentences[i].polarity === 'positive') {
//         positivityOne++;
//       } else if (personOneSentences[i].polarity === 'negative') {
//         negativityOne++;
//       } else {
//         neutralOne++;
//       }
//     }
//
//     for (var j = 0; j < personTwoSentences.length; j++) {
//       if (personTwoSentences[j].polarity === 'positive') {
//         positivityTwo+=1;
//       } else if (personTwoSentences[j].polarity === 'negative') {
//         negativityTwo++;
//       } else {
//         neutralTwo++;
//       }
//     }
//       return done(null, {
//         names,
//         messageCountOne,
//         positivityOne,
//         negativityOne,
//         neutralOne,
//         messageCountTwo,
//         positivityTwo,
//         negativityTwo,
//         neutralTwo
//       });
//     },
//     function calculatePerCents({
//         names,
//         messageCountOne,
//         positivityOne,
//         negativityOne,
//         neutralOne,
//         messageCountTwo,
//         positivityTwo,
//         negativityTwo,
//         neutralTwo
//       }, done) {
//       const nameOneResults = [];
//       const nameTwoResults = [];
//       nameOneResults.push(names[0]);
//       nameOneResults.push(messageCountOne);
//       nameOneResults.push(((positivityOne / messageCountOne)*100).toFixed(1));
//       nameOneResults.push(((negativityOne / messageCountOne)*100).toFixed(1));
//       nameOneResults.push(((neutralOne / messageCountOne)*100).toFixed(1));
//       nameTwoResults.push(names[1]);
//       nameTwoResults.push(messageCountTwo);
//       nameTwoResults.push(((positivityTwo / messageCountTwo)*100).toFixed(1));
//       nameTwoResults.push(((negativityTwo / messageCountTwo)*100).toFixed(1));
//       nameTwoResults.push(((neutralTwo / messageCountTwo)*100).toFixed(1));
//       return done(null, nameOneResults, nameTwoResults);
//     },
//     function saveToDatabase(nameOneResults, nameTwoResults, done) {
//       let object = {
//         personOne: nameOneResults,
//         personTwo: nameTwoResults
//       };
//       Analysis.create(object, (err, analysis) => {
//         if (err) return console.error(err);
//         return console.log(`${analysis.personOne[0]} and ${analysis.personTwo[0]}'s chat analysis was saved`);
//       });
//       return done(null, object);
//     }
//   ], function (err, result) {
//     if (err) console.log(err);
//     return next(null, result);
//   });
// }

const fs       = require('fs');
const Analysis = require('../models/analysis');
const aylien   = require('aylien_textapi');
const textAPI  = new aylien({
  application_id: 'e47c5ef6',
  application_key: 'bf3534a7149f26a0d8bbbe50bcc3b023'
});
const Bluebird = require('bluebird');
const async    = require('async');

module.exports = Bluebird.promisify(convert);

function convert(text, next) {
  return async.waterfall([
    function readFile(done) {
      let array = text.toString().split(/\n/).slice(1);
      const result = [];

      for (var i = 0; i < array.length; i++) {
        result.push((array[i].split(/\-\s/).slice(1))[0]);
      }
      return done(null, result);
    },
    function getNames(result, done) {
      const names = [];
      names.push(result[0].split(/\:\s/)[0]);

      for (var i = 0; i < result.length; i++) {
        if (names.length !== 2 && result[i].split(/\:\s/)[0] !== names[0]) {
          names.push(result[i].split(/\:\s/)[0]);
        }
      }
      return done(null, result, names);
    },
    function populateMessageArrays(result, names, done) {
      let personOneMessages = [];
      let personTwoMessages = [];

      for (var i = 1; i < result.length; i++) {
        if (result[i] === undefined || result[i].split(/\:\s/)[1] === '<Media omitted>') {
          //console.log(err);
        } else if (result[i].split(/\:\s?/)[0] === names[0]) {
          personOneMessages.push(result[i].split(/\:\s/)[1]);
        } else {
          personTwoMessages.push(result[i].split(/\:\s/)[1]);
        }
      }
      return done(null, names, personOneMessages, personTwoMessages);
    },
    function getMessageCounts(names, personOneMessages, personTwoMessages, done) {
      const messageCountOne = personOneMessages.length;
      const messageCountTwo = personTwoMessages.length;
      return done(null, names, personOneMessages, personTwoMessages, messageCountOne, messageCountTwo);
    },
    function splitOnesMessagesIntoSixty(names, personOneMessages, personTwoMessages, messageCountOne, messageCountTwo, done) {
      let oneLength    = personOneMessages.length;
      let divisor      = 10;
      let subArraySize = Math.floor(oneLength / divisor);
      let oneSplit     = [];

      while (0 < personOneMessages.length) {
        oneSplit.push(personOneMessages.splice(0, subArraySize));
      }

      return done(null, names, oneSplit, personTwoMessages, messageCountOne, messageCountTwo);
    },
    function splitTwosMessagesIntoSixty(names, oneSplit, personTwoMessages, messageCountOne, messageCountTwo, done) {
      let twoLength    = personTwoMessages.length;
      let divisor      = 10;
      let subArraySize = Math.floor(twoLength / divisor);
      let twoSplit     = [];

      while (0 < personTwoMessages.length) {
        twoSplit.push(personTwoMessages.splice(0, subArraySize));
      }

      return done(null, names, oneSplit, twoSplit, messageCountOne, messageCountTwo);
    },
    function joinToStrings(names, oneSplit, twoSplit, messageCountOne, messageCountTwo, done) {
      var oneJoined = [];
      var twoJoined = [];

      for (var i = 0; i < oneSplit.length; i++) {
        oneJoined.push(oneSplit[i].join('. '));
      }
      for (var j = 0; j < twoSplit.length; j++) {
        twoJoined.push(twoSplit[j].join('. '));
      }
      console.log(oneJoined);
      return done(null, names, oneJoined, twoJoined, messageCountOne, messageCountTwo);
    },
    function sendFirstToAPI(names, oneJoined, twoJoined, messageCountOne, messageCountTwo, done) {
      console.log(oneJoined);
      Bluebird.map(oneJoined, function(message){
        return new Bluebird(function(resolve, reject){
          return textAPI.aspectBasedSentiment({
            'domain': 'restaurants',
            'text':   message
          }, function(err, sentiment) {
            if (err) reject(err);
            resolve(sentiment);
          });
        });
      }).then(sentiments => {

        let positiveOne = 0;
        let neutralOne  = 0;
        let negativeOne = 0;
        let i           = 0;

        for (i; i < sentiments.length; i++) {
          console.log(sentiments[i].sentences);
          for (let j = 0; j < sentiments[i].sentences.length; j++) {
            console.log(sentiments[i].sentences[j].polarity);
            if (sentiments[i].sentences[j].polarity === 'positive') positiveOne++;
            if (sentiments[i].sentences[j].polarity === 'neutral')  neutralOne++;
            if (sentiments[i].sentences[j].polarity === 'negative') negativeOne++;
          }
        }
        console.log(negativeOne + ` negativeOne`)
        console.log(`${positiveOne} positiveOne`)
        console.log(`${neutralOne} neutralOne`)
        return done(null, names, twoJoined, messageCountOne, messageCountTwo, positiveOne, neutralOne, negativeOne);
      });
    },
    function sendSecondToAPI(names, twoJoined, messageCountOne, messageCountTwo, positiveOne, neutralOne, negativeOne, done) {
      Bluebird.map(twoJoined, function(message){
        return new Bluebird(function(resolve, reject){
          return textAPI.aspectBasedSentiment({
            'domain': 'restaurants',
            'text':   message
          }, function(err, sentiment) {
            if (err) reject(err);
            resolve(sentiment);
          });
        });
      }).then(sentiments => {

        let positiveTwo = 0;
        let neutralTwo  = 0;
        let negativeTwo = 0;
        let i           = 0;

        for (i; i < sentiments.length; i++) {
          console.log(sentiments[i].sentences);
          for (let j = 0; j < sentiments[i].sentences.length; j++) {
            console.log(sentiments[i].sentences[j].polarity);
            if (sentiments[i].sentences[j].polarity === 'positive') positiveTwo++;
            if (sentiments[i].sentences[j].polarity === 'neutral')  neutralTwo++;
            if (sentiments[i].sentences[j].polarity === 'negative') negativeTwo++;
          }
        }

        return done(null, {
          names,
          messageCountOne,
          messageCountTwo,
          positiveOne,
          neutralOne,
          negativeOne,
          positiveTwo,
          neutralTwo,
          negativeTwo
        });
      });
    },
    function calculatePerCents({
      names,
      messageCountOne,
      messageCountTwo,
      positiveOne,
      neutralOne,
      negativeOne,
      positiveTwo,
      neutralTwo,
      negativeTwo
    }, done) {
      console.log('nine')
      const nameOneResults = [];
      const nameTwoResults = [];
      nameOneResults.push(names[0]);
      nameOneResults.push(messageCountOne);
      nameOneResults.push(((positiveOne/messageCountOne)*100).toFixed(1));
      nameOneResults.push(((neutralOne/messageCountOne)*100).toFixed(1));
      nameOneResults.push(((negativeOne/messageCountOne)*100).toFixed(1));
      nameTwoResults.push(names[1]);
      nameTwoResults.push(messageCountTwo);
      nameTwoResults.push(((positiveTwo/messageCountTwo)*100).toFixed(1));
      nameTwoResults.push(((neutralTwo/messageCountTwo)*100).toFixed(1));
      nameTwoResults.push(((negativeTwo/messageCountTwo)*100).toFixed(1));
      return done(null, nameOneResults, nameTwoResults);
    },
    function saveToDatabase(nameOneResults, nameTwoResults, done) {
      console.log('ten')
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
    console.log('eleven')
    if (err) console.log(err);
    return next(null, result);
  });
}
