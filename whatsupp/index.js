const express         = require('express');
const bodyParser      = require('body-parser');
const multer          = require('multer');
const mongoose        = require('mongoose');
const upload          = multer();
const app             = express();
const router          = require('./config/routes');
const ChatManipulator = require('./lib/chatManipulator');


const port    = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/whatsupp');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(`${__dirname}/public`));

app.post("/upload", upload.single('file'), (req,res) => {
  let text = req.file.buffer.toString('utf-8');

  ChatManipulator(text)
    .then((data) => {
      console.log(data);
      console.log("AAAAAAAAAAAAAaammmmmmmada");
      res.status(200).json(data);
    })
    .catch(function(){
      console.log("ERROR");
    });
});

app.get("/*", (req, res) => res.sendFile(`${__dirname}/index.html`));

app.listen(port, () => console.log(`Express started on port: ${port}`));
