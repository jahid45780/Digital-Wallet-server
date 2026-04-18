import express, { Request,  Response } from 'express'
import { globalErrorHandler } from './app/middleware/globalErrorHandler'
import NotFound from './app/middleware/NotFound'
import { router } from './app/routes'

const app = express()

app.use(express.json());


app.use("/api/v1", router)

app.get("/",(req:Request, res:Response)=>{
      res.status(200).json({
        message:"welcome to digital-wallet"
      })
})

app.use(globalErrorHandler)
app.use(NotFound)

export default app