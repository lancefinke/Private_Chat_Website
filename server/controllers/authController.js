const router  = require('express').Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup',async (req,res)=>{
    try{
        //check if user exists
        const user = await User.findOne({email: req.body.email})
        //if user exists, send error message
        if(user){
            return res.status(400).send({
                message:'An account with this email already exists',
                success:false
            })
        }
        //Encrypt Password
        const hashedPassword = await bcrypt.hash(req.body.password,8)
        req.body.password = hashedPassword;

        //Create user
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).send({
            message:"User Created",
            success:true
        })

    }catch(error){
        res.send({
            message: error.message,
            success: false
        });
    }
});

router.post('/login',async (req,res)=>{
    try{
        //check if user exist
        const user = await User.findOne({email: req.body.email}).select("+password");//add the select because password is hidden
        if(!user){
            return res.status(400).send({
                message:"User does not exit",
                success:false
            });
        }
        //check if password is correct
        console.log(user.password)
        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if(!checkPassword){
            return res.send({
                message:"Password was incorrect",
                success:false
            });
        }
        //create JWT
        const token = jwt.sign({userId: user._id},process.env.SECRET_KEY, {expiresIn:"4h"});

        res.status(201).send({
            message:"user Logged in successfully",
            success:true,
            token:token
        })
    }catch(error){
        console.log(error)
        res.status(400).send({
            message:error.message,
            success:false
        })
    }
});

module.exports = router;