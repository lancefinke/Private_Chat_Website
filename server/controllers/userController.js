const router  = require('express').Router();
const User = require('./../models/user');
const authorize = require('./../middlewares/authMiddleware');

router.get('/get-logged-user',authorize, async (req,res)=>{
    try{
        const user = await User.findOne({ _id: req.body.userId }).select('-password'); 

        res.send({
            message:"User fetched successfully",
            success:true,
            data:user
        })
    }catch(error){
        res.send({
            message:error.message,
            success:false
        })
    }


});

router.get('/get-all-users',authorize, async (req,res)=>{
    try{

        const allUsers = await User.find({_id: {$ne: req.body.userId}});

        res.send({
            message:"All users fetched successfully",
            success:true,
            data:allUsers
        })
    }catch(error){
        res.send({
            message:error.message,
            success:false
        })
    }


});

module.exports = router;