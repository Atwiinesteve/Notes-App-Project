require('./database/db.connections');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT||3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public/')));

app.use('/', require('./routes/notes.route'));
app.use("/", require("./routes/user.route"));

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
})