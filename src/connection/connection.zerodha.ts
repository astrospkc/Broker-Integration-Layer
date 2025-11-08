// var KiteConnect = require("kiteconnect").KiteConnect;
import { KiteConnect } from "kiteconnect";
import dotenv from 'dotenv'
dotenv.config()

const brokerApiKey = process.env.ZERODHA_BROKER_API_KEY
console.log("brokerApiKey", brokerApiKey)
const kc = new KiteConnect({
    api_key: brokerApiKey ?? "",
});

export default kc

