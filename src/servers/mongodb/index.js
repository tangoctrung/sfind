import mongoose from "mongoose";
import job from "../cronjob/index";

let connection = {};

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    job.start()

    if (connection?.isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || "", {
            dbName: "sfind",
        });

        connection.isConnected = db.connections[0].readyState;


        console.log("MongoDB is connected successfully");
    } catch (error) {
        console.log(error);
    }
};