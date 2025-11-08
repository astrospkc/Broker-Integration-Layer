import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const zerodhaTradeInfo = async (accessToken: string) => {

    try {
        // const res = await axios.get("https://api.kite.trade/trades", {
        //     headers: {
        //         "Authorization": `token ${process.env.ZERODHA_BROKER_API_KEY}:${accessToken}`
        //     }
        // })
        const tradeResponse = await axios.get("http://localhost:9000/trade/fakeTrades")
        const tradeData = tradeResponse.data
        return tradeData
    } catch (error) {
        console.log("error: ", error)
        return {
            "message": "Internal error occured while getting zerodha trade info",
            "error": error
        }
    }
}

export default zerodhaTradeInfo