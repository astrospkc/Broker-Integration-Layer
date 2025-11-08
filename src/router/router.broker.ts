

import express from 'express';
import kc from '../connection/connection.zerodha';
const router = express.Router()
import dotenv from "dotenv"
import authMiddleware from '../middleware/middleware.auth';
import User from '../models/models.user';
import axios from 'axios';
import incomingServiceProcess from '../services/incomingServiceProcess';
import Broker from '../models/models.broker';
dotenv.config()

const brokerApiSecret = process.env.ZERODHA_BROKER_SECRET_KEY ?? ""

const addBroker = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.user
        const { serviceType } = req.body
        await Broker.create({
            user_id: id,
            broker_type: serviceType
        })

        if (serviceType == "zerodha") {
            const login = kc.getLoginURL()
            console.log(login)
            return res.redirect(login)
        } else {
            return res.send("invalid service type")
        }

    } catch (error) {
        console.error("error", error)
        return res.send("internal error occurred while adding broker maybe serviceType is not provided")
    }
}



const zerodhaCallback = async (req: express.Request, res: express.Response) => {
    const { request_token } = req.query
    try {

        if (!request_token) {
            res.json("no token is provided")
        }

        const response = await kc.generateSession(request_token as string, brokerApiSecret)

        // store accesstoken in db
        await User.updateOne({ email: response.email }, { $set: { accessToken: response.access_token } })
        const user_data = await User.findOne({ email: response.email })
        if (!user_data) {
            return res.send("user not found")
        }
        // updating accesstoken and refreshtoken in broker collection
        await Broker.updateOne({ user_id: user_data._id }, { $set: { broker_accessToken: response.access_token, broker_refreshToken: response.refresh_token } }, { upsert: true })
        kc.setAccessToken(response.access_token)
        return res.send({ "message": "zerodha account linked successfully" })

    } catch (error) {

        return res.send("internal error occurred during callback")
    }
}



const getprofile = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.user
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).send({ "error": "User not found" })
        }
        const broker_data = await Broker.findOne({ user_id: userExist._id })
        const profilres = await axios.get("https://api.kite.trade/user/profile", {
            headers: {
                "Authorization": `token ${process.env.ZERODHA_BROKER_API_KEY}:${broker_data?.broker_accessToken}`
            }
        })
        const response = await profilres.data
        return res.send(response)

    } catch (error) {
        return res.send("internal error occurred")
    }
}

const getBrokerInfo = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.user
        const broker_data = await Broker.findOne({ user_id: id })
        return res.send(broker_data)
    } catch (error) {
        return res.send("internal error occurred while fetching broker info")
    }
}

const getTradeInfo = async (req: express.Request, res: express.Response) => {
    try {
        const { service } = req.body
        const { id } = req.user
        const broker_data = await Broker.findOne({ user_id: id })
        const brokerAccessToken = broker_data?.broker_accessToken ?? null
        if (!brokerAccessToken) {
            return res.status(400).send({ "error": "Broker not found or access token is not available" })
        }
        const tradeInfo = await incomingServiceProcess(service, brokerAccessToken)
        res.send(tradeInfo)
    } catch (error) {
        res.status(500).send({ "error": error, "message": "Internal error occured while getting trade info" })
    }
}

// router.get("/auth/zerodha", authMiddleware, loginZerodha)
router.post("/auth/addBroker", authMiddleware, addBroker)
router.get("/auth/zerodha/callback", zerodhaCallback)
router.get("/user/profile", authMiddleware, getprofile)
router.get("/user/trades", authMiddleware, getTradeInfo)
router.get("/broker", authMiddleware, getBrokerInfo)

export default router