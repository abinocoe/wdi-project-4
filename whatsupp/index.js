const express    = require('express');
// const morgan     = require('morgan');
// const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const multer     = require('multer');
const upload     = multer();
const app        = express();
const router     = require('./config/routes');
const ChatManipulator = require('./lib/chatManipulator');


const port    = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static("something..."));

app.post("/upload", upload.single('file'), (req,res) => {
  let text = req.file.buffer.toString('utf-8');

  ChatManipulator(text)
    .then((data) => res.status(200).json(data))
    .catch(function(e){
      console.log("ERROR");
      console.log(e);
    });
});

app.get("/*", (req, res) => res.sendFile(`${__dirname}/index.html`));
app.listen(port, () => console.log(`Express started on port: ${port}`));
