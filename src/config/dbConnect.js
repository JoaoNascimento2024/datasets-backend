import mongoose from "mongoose";


const options = {
    useNewUrlParser : true, //Utilização de novo parser do Mongo
    poolSize : 5,           //Número de conexões do pool
    useUnifedTopology: true, //Utilização de nova gerência de conexões com o cluster,
    socketTimeoutMS: 60000   //Esperar até 45s para encerrar a espera de um comando ou consulta no Mongo
}

/**
 * Open connection with MongoDB Atlas by Mongoose
 */
async function dbConnect(){
    try {
        await mongoose.connect(process.env.STRING_CONNECTION, options);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error in connection with MongoDB: ", error);
        process.exit(1);
    }
}

export default dbConnect;