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

// kc.generateSession("request_token", "api_secret")
//     .then(function (response) {
//         init();
//     })
//     .catch(function (err) {
//         console.log(err);
//     });

// function init() {
//     // Fetch equity margins.
//     // You can have other api calls here.
//     kc.getMargins()
//         .then(function (response) {
//             // You got user's margin details.
//         }).catch(function (err) {
//             // Something went wrong.
//         });
// }