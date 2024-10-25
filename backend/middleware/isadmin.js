import User from "../models/userModel.js"

export const isAdmin = async(req,res,next)=>{
    try{
        const {email} = req.user 
        const admin = await User.findOne({email:email})
        if(admin.role!=="admin"){
            return res.status(400).json({status:'fail',message:'Forbidden - user is not authorized to access this resource.'})
        }
        next()
    }
    catch(error){
        return res.status(500).json({status:'fail',message:error.message})
    }
}

export default isAdmin