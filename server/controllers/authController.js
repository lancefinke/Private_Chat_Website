const router  = require('express').Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');

router.post('/signup',async (req,res)=>{
    try{
        //check if user exists
        const user = await User.findOne({email: req.body.email})
        //if user exists, send error message
        if(user){
            return res.send({
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

        res.send({
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

module.exports = router;