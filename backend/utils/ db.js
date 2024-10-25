import mongoose from "mongoose";

const connectDb = async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to mongodb')
    }
    catch(error){
        console.log(error.message)
    }
}

export default connectDb