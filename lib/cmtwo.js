// const fs       = require('fs');
// const Analysis = require('../models/analysis');
// const aylien   = require('aylien_textapi');
// const textAPI  = new aylien({
//   application_id: 'e47c5ef6',
//   application_key: 'bf3534a7149f26a0d8bbbe50bcc3b023'
// });
// const Bluebird = require('bluebird');
// const async    = require('async');
//
// module.exports = Bluebird.promisify(convert);
//
// function convert(text, next) {
//   return async.waterfall([
//     function readFile(done) {
//       //remove this first slice - this was when I thought the first message was messing things up
//       let array = text.toString().split(/\n/).slice(1);
//       const result = [];
//
//       for (var i = 0; i < array.length; i++) {
//         result.push((array[i].split(/\-\s/).slice(1))[0]);
//       }
//       return done(null, result);
//     },
//     function getNames(result, done) {
//       const names = [];
//       names.push(result[0].split(/\:\s/)[0]);
//
//       for (var i = 0; i < result.length-1; i++) {
//         if (names.length !== 2 && result[i].split(/\:\s/)[0] !== names[0]) {
//           names.push(result[i].split(/\:\s/)[0]);
//         }
//       }
//       return done(null, result, names);
//     },
//     function populateMessageArrays(result, names, done) {
//       const personOneMessages = [];
//       const personTwoMessages = [];
//       let messageBody         = result[i].split(/\:\s/)[1];
//
//       for (var i = 0; i < result.length; i++) {
//         if (result[i] === undefined || messageBody === '<Media omitted>') {
//         } else if (result[i].split(/\:\s?/)[0] === names[0]) {
//           personOneMessages.push(messageBody);
//         } else {
//           personTwoMessages.push(messageBody);
//         }
//       }
//       return done(null, names, personOneMessages, personTwoMessages);
//     },
//     function getMessageCounts(names, personOneMessages, personTwoMessages, done) {
//       const messageCountOne = personOneMessages.length;
//       const messageCountTwo = personTwoMessages.length;
//     },
//     function sendFirstToAPI(names, personOneMessages, personTwoMessages, messageCountOne, messageCountTwo, done) {
//       personOneMessages.each(function(message){
//         let positiveOne = 0;
//         let neutralOne  = 0;
//         let negativeOne = 0;
//         textAPI.sentiment({
//           'text': message
//         }, function(err, response) {
//           if (err) return done(err);
//           if (response.polarity === 'positive') {
//             positiveOne++;
//           } else if (response.polarity === 'neutral') {
//             neutralOne++;
//           } else {
//             negativeOne++;
//           }
//         });
//         return done(null, names, personTwoMessages, messageCountOne, messageCountTwo, positiveOne, neutralOne, negativeOne);
//       });
//     },
//     function sendSecondToAPI(names, personTwoMessages, messageCountOne, messageCountTwo, positiveOne, neutralOne, negativeOne, done) {
//       personTwoMessages.each(function(message){
//         let positiveTwo = 0;
//         let neutralTwo  = 0;
//         let negativeTwo = 0;
//         textAPI.sentiment({
//           'text': message
//         }, function(err, response) {
//           if (err) return done(err);
//           if (response.polarity === 'positive') {
//             positiveTwo++;
//           } else if (response.polarity === 'neutral') {
//             neutralTwo++;
//           } else {
//             negativeTwo++;
//           }
//         });
//         return done(null, names, messageCountOne, messageCountTwo, positiveOne, neutralOne, negativeOne, positiveTwo, neutralTwo, negativeTwo);
//       });
//     },
//     function calculatePerCents({
//       names,
//       messageCountOne,
//       messageCountTwo,
//       positiveOne,
//       neutralOne,
//       negativeOne,
//       positiveTwo,
//       neutralTwo,
//       negativeTwo
//     }, done) {
//       const nameOneResults = [];
//       const nameTwoResults = [];
//       nameOneResults.push(names[0]);
//       nameOneResults.push(messageCountOne);
//       nameOneResults.push(((positiveOne/messageCountOne)*100).toFixed(1));
//       nameOneResults.push(((neutralOne/messageCountOne)*100).toFixed(1));
//       nameOneResults.push(((negativeOne/messageCountOne)*100).toFixed(1));
//       nameTwoResults.push(names[0]);
//       nameTwoResults.push(messageCountTwo);
//       nameTwoResults.push(((positiveTwo/messageCountTwo)*100).toFixed(1));
//       nameTwoResults.push(((neutralTwo/messageCountTwo)*100).toFixed(1));
//       nameTwoResults.push(((negativeTwo/messageCountTwo)*100).toFixed(1));
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
