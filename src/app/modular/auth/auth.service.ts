import { JwtPayload } from "jsonwebtoken";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens"
import AppError from "../../errorHerplrs/appError";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import { envVers } from "../../config/env";

const getNewAccessToken = async (refreshToken:string)=>{

    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

    return {
        accessToken:newAccessToken
    }

}

const resetPassword = async (payload:Record<string, any>, decodedToken:JwtPayload)=>{
    // if(payload.id != decodedToken.userId){
    //     throw new AppError(401, "You can not reset your password")
    // }

    const isUserExist = await User.findById(decodedToken.userId)

    if(!isUserExist){
        throw new AppError(404,"user  not found")
    }


    const hashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(envVers.BCRYPT_SALT_ROUND)
    )

    isUserExist.password = hashedPassword;

    await isUserExist.save();
}

export const authService = {
    getNewAccessToken,
    resetPassword
}