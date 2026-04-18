import dotenv from "dotenv"

dotenv.config()

interface envConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    BCRYPT_SALT_ROUND:string
}

const loadEnvVars = ():envConfig=>{
    const reqEnvVars : string[] = [
        "PORT", "DB_URL",
        "NODE_ENV","BCRYPT_SALT_ROUND"
    ]

     reqEnvVars.forEach(key=>{
        if(!process.env[key]){
            throw new Error(`missing  env vars ${key}`)
        }
    })

    return{
    PORT:process.env.PORT as string,    
    DB_URL: process.env.DB_URL as string,
    NODE_ENV:process.env.NODE_ENV as "development" | "production",

    BCRYPT_SALT_ROUND:process.env.BCRYPT_SALT_ROUND as string
    }
}

export const envVers:envConfig = loadEnvVars()

