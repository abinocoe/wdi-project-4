const express    = require('express');
// const morgan     = require('morgan');
// const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const multer     = require('multer');
const upload     = multer();
const app        = express();
// const textAPI    = new aylien({
//   application_id: "e47c5ef6",
//   application_key: "bf3534a7149f26a0d8bbbe50bcc3b023"
// });

const port    = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static("something..."));

app.post("/upload", upload.single('file'), (req,res) => {
  // console.log(req.file);
  let text = req.file.buffer.toString('utf-8');
  // let converted = new ChatManipulator(text);
});

app.get("/*", (req, res) => res.sendFile(`${__dirname}/index.html`));
app.listen(port, () => console.log(`Express started on port: ${port}`));
