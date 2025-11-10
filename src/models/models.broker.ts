import mongoose from "mongoose";


const BrokerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    broker_type: {
        type: String,
        required: true
    },
    broker_accessToken: {
        type: String
    },
    broker_refreshToken: {
        type: String
    },
},
    {
        timestamps: true
    }
)

const Broker = mongoose.model("Broker", BrokerSchema)
export default Broker