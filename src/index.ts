import express from "express"
import brokerRouter from "./router/router.broker"
import userRouter from "./router/router.user"
const app = express()
import dotenv from 'dotenv'
import connectToMongo from "./connection/connection.mongodb"
dotenv.config()
connectToMongo()

app.use(express.json())
app.use('/api', brokerRouter)
app.use("/", userRouter)

const PORT = 9000
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:9000')
})

