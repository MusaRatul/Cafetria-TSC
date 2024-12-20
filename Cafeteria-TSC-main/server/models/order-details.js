const mongoose=require('mongoose');
const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})
const orderdetails=mongoose.model("orderdetails",newSchema);
module.exports=orderdetails;