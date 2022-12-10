require('./database/db.connections');

const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require("cors");

require('dotenv').config();

const corsOptions = {
  origin: [ "http://localhost:4040", "http://127.0.0.1:4040", "http://127.0.0.1/:1" ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

const app = express();
const PORT = process.env.PORT||3000;


app.set('view engine', 'ejs');

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public/')));

app.use('/', require('./routes/notes.route'));
app.use("/", require("./routes/user.route"));

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
})