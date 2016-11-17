module.exports = {
  // upload: chatsUpload,
  show: analysesShow
};

const Analysis        = require('../models/analysis');
const chatManipulator = require('../lib/chatManipulator');

function analysesShow(req, res) {
  Analysis.findById(req.params.id, (err, analysis) => {
    if (err) return res.status(500).json({ message: "Something went wrong" });
    if (!analysis) return res.status(404).json({ message: "Analysis not found" });
    return res.status(200).json({ analysis });
  });
}

// function chatsUpload(req, res) {
//   // chatManipulator(req.body.text);
//   console.log("OI");

  // Chat.create((err, chats) => {
  //   textAPI.aspectBasedSentiment({
  //     'domain': 'restaurants',
  //     'text': chatManipulator(res.body.text)
  //   }, function(err, response) {
  //     console.log(response.sentences);
  //     if (err === null) {
  //       response.aspects.forEach(function(aspect) {
  //         console.log(aspects);
  //       });
  //     }
  //   });
  // });
// }
