const express=require("express");
const doctorModel = require("../model/doctor.model");
// const jwt=require("jsonwebtoken");


const doctorRouter = express.Router();

// post route for adding appointments
doctorRouter.post("/appointments", async (req,res)=>{
    const payload=req.body
    try {
        const new_doctor=new doctorModel(req.body)
        await new_doctor.save()
        res.status(201).send({"msg":"appointment added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
 });

// get route for appointments
 doctorRouter.get("/get", async(req,res)=>{

    try {
            const doctor = await doctorModel.find();
            res.status(200).send(doctor);
        
        } catch (error) {
        res.status(400).send({"msg":error.message})
        }
})

// route for Filter by Specialization (Cardiologist, Dermatologist, Pediatrician, Psychiatrist)
doctorRouter.get("/filter", async(req,res)=>{
    const specialization = req.query.specialization;

    try {
            const filterData = await doctorModel.find({specialization});
            res.status(200).send(filterData);
        
        } catch (error) {
        res.status(400).send({"msg":error.message})
        }
})


// sort  api by date
doctorRouter.get("/sort", async(req,res)=>{
    const sortDate = req.query.date === "asc" ? 1 : -1;

    try {
            const sortedData = await doctorModel.find().sort({date: sortDate});
            res.status(200).send(sortedData);
        
        } catch (error) {
        res.status(400).send({"msg":error.message})
        }
})

// Search by doctor name route
doctorRouter.get("/search", async(req,res)=>{
    const searchTerm = req.query.name.toLowerCase();

    try {
            const searchResult = await doctorModel.find({
                name: { $regex: searchTerm, $options: "i"}
            });
            res.status(200).send(searchResult);
        
        } catch (error) {
        res.status(400).send({"msg":error.message})
        }
})


// update route for appointment
doctorRouter.put("/update/:id", async(req,res)=>{
    const payload=req.body
    const id=req.params.id;
    try {
        await doctorModel.findByIdAndUpdate({_id:id}, payload);
        
        res.status(202).send({"msg":"appointment Updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

// delete route for delete a specific appointment identified by its ID.
doctorRouter.delete("/delete/:id", async(req,res)=>{

    const id=req.params.id
    try {
        await doctorModel.findByIdAndDelete({_id:id})
        res.status(202).send({"msg":"appointment Deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})






 module.exports = doctorRouter;