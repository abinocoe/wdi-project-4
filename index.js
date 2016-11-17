const express         = require('express');
const bodyParser      = require('body-parser');
const multer          = require('multer');
const mongoose        = require('mongoose');
const upload          = multer();
const app             = express();
const router          = require('./config/routes');
const ChatManipulator = require('./lib/chatManipulator');
const config          = require('./config/config');

mongoose.connect(config.db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.post("/upload", upload.single('file'), (req,res) => {
  console.log(req.file.buffer);
  let text = req.file.buffer.toString('utf-8');

  ChatManipulator(text)
    .then((data) => {
      console.log(data);
      console.log("AAAAAAAAAAAAA");
      res.status(200).json(data);
    })
    .catch(function(err){
      console.log("Something went wrong:", err);
    });
});

app.get("/*", (req, res) => res.sendFile(`${__dirname}/index.html`));

app.listen(config.port, () => console.log(`Express started on port: ${port}`));
