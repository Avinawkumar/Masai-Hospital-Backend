const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
       
    name: String,
    image: String,
    specialization: String,
    experience: Number,
    location: String,
    date: Date,
    slots : Number,
    fee: Number
})

const doctorModel = mongoose.model("doctor", doctorSchema);

module.exports = doctorModel;