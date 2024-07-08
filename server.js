import dotenv from "dotenv";
import app from "./src/app.js";
import dbConnect from "./src/config/dbConnect.js";

dotenv.config();

dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server started...")
});

