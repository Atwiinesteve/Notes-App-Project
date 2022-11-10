require('./database/db.connections');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/')))

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`)
})