import express from "express"
import brokerRouter from "./router/router.broker"
const app = express()
import dotenv from 'dotenv'
dotenv.config()

app.use(express.json())
app.use('/api', brokerRouter)

const PORT = 9000
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:9000')
})

