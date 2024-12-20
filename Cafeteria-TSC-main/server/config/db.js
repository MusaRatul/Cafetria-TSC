require("dotenv").config();
const mongoose=require("mongoose")
const db_url=process.env.url;
mongoose.connect(db_url)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})