const express=require('express');
const app=express();
const cors=require("cors")
const routes=require("./router/user.route");
require("./config/db");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use("/",routes);
app.use((req,res,next)=>{
    console.log("Route not found")
})
app.use((err,req,res,next)=>{
    console.log(err);
})
module.exports=app;
