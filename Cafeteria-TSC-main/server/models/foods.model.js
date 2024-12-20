const mongoose=require("mongoose");
const newSchema=new mongoose.Schema({
    id:{
        type: String,
        require: true,
        unique: true
    },
    name:{
        type: String,
        require: true,
        
    },
    price:{
        type: String,
        require: true,
        
    },
    image1:{
        type: String,
        require: true,
        
    },
    description:{
        type: String,
        require: true,
    
    },
    tag:{
        type: String,
        require: true,
   
    }
})
const foods=mongoose.model("foods",newSchema);
module.exports=foods