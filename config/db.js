const mongoose = require("mongoose");
require("dotenv").config();

const connectedToADb = mongoose.connect(process.env.mongourl);

module.exports = connectedToADb;