
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectToMongo = () => {
    mongoose
        .connect(process.env.MONGODB_URI ?? "")
        .then(() => {
            console.log("connection to mongo is successfull");
        })
        .catch((err) => {
            console.log(err);
        });
};
export default connectToMongo;