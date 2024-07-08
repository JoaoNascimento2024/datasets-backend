import mongoose from "mongoose";

export default async function dbConnect() {
    try{
        await mongoose.connect("mongodb+srv://araujonascimento:zBiZ0VvZP2TBf5rG@cluster0.yglu0f2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Conectado")
    }catch(error){
        console.log("Não conectado")
    }
}