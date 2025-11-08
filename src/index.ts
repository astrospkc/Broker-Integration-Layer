import express from "express"
import brokerRouter from "./router/router.broker"
import userRouter from "./router/router.user"
import fakeTradeRouter from "./router/router.faketrade"
import rateLimit from "express-rate-limit"
const app = express()
import dotenv from 'dotenv'
import connectToMongo from "./connection/connection.mongodb"
dotenv.config()
connectToMongo()


// Create a rate limiter instance
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter)

app.use(express.json())
app.use('/api', brokerRouter)
app.use("/", userRouter)
app.use("/trade", fakeTradeRouter)

const PORT = 9000
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:9000')
})

