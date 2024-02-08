require('dotenv').config()
const mongoose=require('mongoose');
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        // console.log("connected")
    }catch(error){
        console.log("something error in database",error)
    }

}
connectDB();
module.exports=mongoose;