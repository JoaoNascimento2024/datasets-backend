import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();

const amqpURL = process.env.AMQP_URL;

async function connectAMQP(){
    try{
        const conn = await amqp.connect(amqpURL);
        const channel = await conn.createChannel();
        await channel.assertQueue("datasets", {durable : true});
        return channel;
    }catch(error){
        console.log("Error connecting AMQP", error);
        return null;
    }
}

export default connectAMQP;