const mongoose = require('mongoose');
const validator = require('validator');

const chatSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Please enter a room name.'],
        minlength:[3,'Name must have at least 3 characters'],
        maxlength:[100, 'Name cannot be more than 100 characters'],
        validate:[validator.isAlphanumeric,"Name Cannot contain special characters"]
    },
    members:{
        type:[
            {type:mongoose.Schema.Types.ObjectId, ref:"test"}
        ]
    },
    lastMessage:{
        type: mongoose.Schema.Types.ObjectId, ref:"messages"
    },
    unreadMessagesCount:{
        type:Number,
        default: 0
    }
}, {timestamps:true});

module.exports = mongoose.model('chats',chatSchema);