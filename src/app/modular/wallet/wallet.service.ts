import AppError from "../../errorHerplrs/appError"
import { Wallet } from "./wallet.model"



const getMyWallet = async (userId:string)=>{
    const result = await Wallet.findOne({user:userId})

    if(!result){
        throw new AppError(404, "Wallet not found")
    }

    return result
}

export const walletService ={
    getMyWallet
}