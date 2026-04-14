import { Server } from "http";
import { envVers } from "./app/config/env";
import mongoose from "mongoose";
import app from "./app";

let server: Server

const startServer = async()=>{
     try {
        console.log(envVers.NODE_ENV);
        await mongoose.connect(envVers.DB_URL)

      console.log("contend to DB!!");    
      
      server = app.listen(envVers.PORT,()=>{
          console.log(`app is listen on the port ${envVers.PORT}`);
      })
     } catch (error) {
        console.log(error);
     }
}

startServer()