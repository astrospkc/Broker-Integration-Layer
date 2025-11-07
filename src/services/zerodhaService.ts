import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const zerodhaTradeInfo = async (accessToken: string) => {

    try {
        const res = await axios.get("https://api.kite.trade/user/trades", {
            headers: {
                "Authorization": `token ${process.env.ZERODHA_BROKER_API_KEY}:${accessToken}`
            }
        })

        const tradeData = await res.data
        return tradeData
    } catch (error) {
        return {
            "message": "Internal error occured while getting zerodha trade info",
            "error": error
        }
    }
}

export default zerodhaTradeInfo