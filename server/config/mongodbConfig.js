const mongoose = require('mongoose');

mongoose.connect(process.env.CONN_STR);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('MongoDB connection Successful');
});

db.on('err',()=>{
    console.log('MongoDB connection failed');
})

module.exports = db;