import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authUser = async(req,res,next)=>{
  try{
  const authHeader = req.headers["authorization"]
  let token 
  if(authHeader!==undefined){
      token = authHeader.split(" ")[1]
  }
  if(token===undefined){
      return res.status(401).json({status:'fail',message:"Please Login in"})
  }
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
  if(!decoded){
      return res.status(401).json({status:'fail',message:"Token is invalid or token expired"})
  }
  const {_id} = decoded 
  console.log(_id)
  req.user = await User.findById(_id)
  console.log(req.user)
  next()
}
  catch(error){
      return res.status(500).json({status:'fail',message:"something went wrong"})
  }
}
export default authUser