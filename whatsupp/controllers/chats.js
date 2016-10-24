module.exports = {
  upload: chatsUpload
};

const Chat = require('../models/chat');

function chatsUpload(req, res) {
  Chat.create((err, chats) => {

  });
}
