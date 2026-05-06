import AppError from "../../errorHerplrs/appError"
import { User } from "../user/user.model"


const getAllUsers = async ()=>{
    const users = await User.find().sort({createdAt: -1})

    const totalUser = await User.countDocuments()

    return {
        data:users,
        meta:{
            total:totalUser
        }
    }
}


const getAllAgents = async ()=>{
    const agents = await User.find({role:"AGENT"}).sort({createdAt: -1})

   const totalAgents = await User.countDocuments({role:"AGENT"})

 return{
    data:agents,
    meta:{
      total:totalAgents
    }
  };
}

const approveAgent = async(userId:string)=>{
    const agent = await User.findById(userId)

    if(!agent){
        throw new AppError(404, "Agent not found" )
    }

    if(agent.role !=="AGENT"){
        throw new AppError(400, "User is not an agent")
    }

    if(agent.isApproved){
        throw new AppError(400, "Agent already approve")
    
    }

    agent.isApproved = true;
    await agent.save()

    return agent;
}

const suspendAgent = async (userId:string)=>{
    const agent = await User.findById(userId);

    if(!agent){
        throw new AppError(404, "agent not found")
    }

    if(agent.role !=="AGENT"){
        throw new AppError(400, "User is not an agent")
    }

    if(!agent.isApproved){
        throw new AppError(400, "Agent already suspended");
    }

    agent.isApproved = false;
    await agent.save()
    return agent;
}

export const adminService = {
    getAllUsers,
    getAllAgents,
    approveAgent,
    suspendAgent
} 