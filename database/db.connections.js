const mongoose = require('mongoose');

require('dotenv').config();

const connections = mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true
}, error => {
  if(!error) {
    console.log(`Database Connection Established Successfully...`)
  } else {
    console.log(`Database Connection Failed ${error.message}...`)
  }
});

module.exports = connections;