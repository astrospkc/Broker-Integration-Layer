import { Trade } from "../types"
import normalizedZerodhaTradeData from "../normalization/normalization.tradeData"
import zerodhaTradeInfo from "./zerodhaService"

const incomingServiceProcess = async (serviceType: string, accessToken: string) => {

    // switch (serviceType) {
    //     case "zerodha":
    //         return zerodhaTradeInfo(accessToken)
    //     case "angelone":
    //         return []
    //     default:
    //         return "invalid service type"
    // }
    console.log("service type: ", serviceType)
    let data, normalizedData: Trade
    if (serviceType === "zerodha") {
        data = await zerodhaTradeInfo(accessToken)
        console.log("data", data)
        normalizedData = normalizedZerodhaTradeData(data)
        return normalizedData
    }

}

export default incomingServiceProcess

