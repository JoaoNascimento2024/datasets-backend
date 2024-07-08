import mongoose from "mongoose";

/**
 * Open connection with MongoDB Atlas by Mongoose
 */
async function dbConnect(){
    try {
        await mongoose.connect(process.env.STRING_CONNECTION);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error in connection with MongoDB: ", error);
        process.exit(1);
    }
}

export default dbConnect;