import express from 'express';
import kc from '../connection/connection.zerodha';
const router = express.Router()
import dotenv from "dotenv"
dotenv.config()

const brokerApiKey = process.env.ZERODHA_BROKER_API_KEY ?? ""
const brokerApiSecret = process.env.ZERODHA_BROKER_SECRET_KEY ?? ""
const loginZerodha = (req: express.Request, res: express.Response) => {
    const login = kc.getLoginURL()
    console.log(login)
    return res.redirect(login)

}

const zerodhaCallback = async (req: express.Request, res: express.Response) => {
    const { request_token } = req.query
    console.log("request_token: ", request_token)
    try {
        if (!request_token) {
            res.json("no token is provided")
        }

        const response = await kc.generateSession(request_token as string, brokerApiSecret)
        console.log("response:", response)
        kc.setAccessToken(response.access_token)
        return res.send("zerodha account linked successfully")

    } catch (error) {
        console.error("error", error)
        return res.send("internal error occurred")
    }
}

router.get("/auth/zerodha", loginZerodha)
router.get("/auth/zerodha/callback", zerodhaCallback)

export default router