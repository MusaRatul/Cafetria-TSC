const app=require("./app");
require("dotenv").config();
const PORT=process.env.port;
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})