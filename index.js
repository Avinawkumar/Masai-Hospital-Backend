const express = require("express");
const mongoose= require("mongoose");
var cors = require("cors");
const connectedToADb = require("./config/db");
const userRouter = require("./routes/user.routes");
const doctorRouter = require("./routes/doctors.route");





require("dotenv").config(); // important

const app = express();
app.use(cors());
app.use(express.json());





// app.use("/", (req,res) =>{
//     res.send({msg:"welcome to masai hospital"})
// })

app.use("/api", userRouter);

app.use("/api", doctorRouter);








app.listen(process.env.port, async() =>{
    try {
        await connectedToADb
        console.log("connected to mongoAtlas")
    } catch (error) {
        console.log(" not connected to mongoAtlas")
        console.log(error);
    }
    console.log(`server is running on port ${process.env.port}`)
 })



 module.exports = app;