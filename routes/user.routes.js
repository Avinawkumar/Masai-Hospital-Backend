const express = require("express");

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require("../model/user.model");



const userRouter = express.Router();

//register route
userRouter.post("/signup", async (req, res) =>{
    const {email,password}=req.body

    try {
        const user=await userModel.findOne({email})


        bcrypt.hash(password, 8, async (err, hash)=>{
            const user=new userModel({email,password:hash})

            try {
                
                await user.save()
                res.status(201).send({msg:"registration successful"})
            } catch (error) {
                res.status(201).send({msg:"user already registered"})
            }
                
            })

            // res.status(200).send({msg:"registration successful"})
        
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
});

// user login route
userRouter.post("/login", async (req, res) => {
    const {email,password} = req.body;
    try {
        const user=await userModel.findOne({email})
       
            if(user){
                // compairing the password
               bcrypt.compare(password, user.password, function(err, result) {
                
                   if(result){
                    // creating jwt token for auth
                   const token = jwt.sign({ "userID":user._id }, 'masai');
                   res.status(201).send({"msg":"Login Successfull","token":token})
                   }
                   else {
                    {res.status(400).send({msg:"Wrong Password"})}
                   }
                });
            }
             else {
              res.status(400).send({msg:"Wrong Password"})
            }

   
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
});


module.exports = userRouter;












