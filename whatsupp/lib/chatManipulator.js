// var fs = require('fs');
//
// var names = [];
// var personOneMessages = [];
// var personTwoMessages = [];
//
// fs.readFile('./texts/testChat.txt', function(err, data) {
//   if(err) console.error(err);
//   var withDateRemoved = [];
//   var array = data.toString().split(/\n/);
//   // var array = data.toString().split(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
//   var nameOne;
//
//   for (var i = 0; i < array.length; i++) {
//     withDateRemoved.push((array[i].split(/\-\s/).slice(1))[0]);
//   }
//   getNames(withDateRemoved);
// });
//
//
// getNames = function(array) {
//
//   names.push(array[0].split(/\:\s/)[0]);
//
//   for (var i = 1; i < array.length-1; i++) {
//     if ( names.length != 2 && array[i].split(/\:\s/)[0] != names[0] ) {
//       names.push(array[i].split(/\:\s/)[0]);
//     }
//   }
//   populateMessageArrays(array);
// };
//
// populateMessageArrays = function(array) {
//   for (var i = 1; i < array.length; i++) {
//     if (array[i] === undefined || array[i].split(/\:\s/)[1] === '<Media omitted>') {
//       console.log("err");
//     } else if (array[i].split(/\:\s?/)[0] === names[0]) {
//       personOneMessages.push(array[i].split(/\:\s/)[1]);
//     } else {
//       personTwoMessages.push(array[i].split(/\:\s/)[1]);
//     }
//   }
//   console.log(personOneMessages);
// };
