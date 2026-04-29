import bcrypt from "bcryptjs";
import AppError from "../../errorHerplrs/appError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import { envVers } from "../../config/env";
import  httpStatus  from 'http-status-codes';
import { Wallet } from "../wallet/wallet.model";


const createUser = async(payload:Partial<IUser>)=>{

    const {email, password, ...rest} = payload;

    const isUserExist = await User.findOne({email});
   
    if(isUserExist){
        throw new AppError(400, "already user exist")
    }

    const hashedPassword = await bcrypt.hash(password as string, Number(envVers.BCRYPT_SALT_ROUND))

    const authProvider:IAuthProvider = {provider:"credentials", providerID: email as string }

    const user = await User.create({
          email,
          password:hashedPassword,
          auths:[authProvider],
          ...rest
    })

    if(user.role === Role.USER || user.role === Role.AGENT){

        await Wallet.create({
            user:user._id,
            balance:50,
            status:"active"
        })
    }


    return user
}

const updateUser = async (id:string, payload:Partial<IUser>)=>{

     if(payload.password){
            payload.password = await bcrypt.hash(payload.password, Number(envVers.BCRYPT_SALT_ROUND))
        }

    const user = await User.findByIdAndUpdate(id, payload,{
        new:true,
        runValidators:true
    }).select("-password")

    
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;

}

const getUsers = async ()=>{
    const users = await User.find({})

    const totalUser = await User.countDocuments()
         
     return{
        data:users,
        meta:{
            total:totalUser
        }
    }
}

const getSingleUser = async (id:string)=>{
    const user  = await User.findById(id).select("-password");

    return{
       data:user
    }
}

const getMe = async (userId:string)=>{
   const user = await User.findById(userId).select("-password")

   return{
    data:user
   }
}

export const userService = {
    createUser,
    updateUser,
    getUsers,
    getSingleUser,
    getMe
}