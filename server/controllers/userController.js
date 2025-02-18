const router  = require('express').Router();
const User = require('./../models/user');
const authorize = require('./../middlewares/authMiddleware');

router.get('/get-logged-user',authorize, async (req,res)=>{
    try{
        const user = await User.findOne({_id: req.body.userId});

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

module.exports = router;