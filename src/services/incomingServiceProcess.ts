import { Trade } from "../types"
import normalizedZerodhaTradeData from "../normalization/normalization.tradeData"
import zerodhaTradeInfo from "./zerodhaService"

const incomingServiceProcess = async (serviceType: string, accessToken: string) => {
    let data, normalizedData: Trade
    if (serviceType === "zerodha") {
        data = await zerodhaTradeInfo(accessToken)
        normalizedData = normalizedZerodhaTradeData(data)
        return normalizedData
    }

}

export default incomingServiceProcess

