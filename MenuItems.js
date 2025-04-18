const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        reqired: true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required: true
    }
})


module.exports = mongoose.model("MenuItem", MenuItemSchema);
