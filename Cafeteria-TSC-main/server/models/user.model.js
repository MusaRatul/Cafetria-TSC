const mongoose=require('mongoose');
const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const user=mongoose.model("usersinfos",newSchema);
module.exports=user;