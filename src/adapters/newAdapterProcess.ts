import { Trade } from "../types"
import normalizedZerodhaTradeData from "../normalization/normalization.tradeData"
import zerodhaTradeInfo from "./adapters.zerodha"

const newAdapterProcess = async (serviceType: string, accessToken: string) => {
    let data, normalizedData: Trade
    if (serviceType === "zerodha") {
        data = await zerodhaTradeInfo(accessToken)
        normalizedData = normalizedZerodhaTradeData(data)
        return normalizedData
    }

}

export default newAdapterProcess

