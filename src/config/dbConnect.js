import mongoose from "mongoose";

/**
 * Estabelece uma conexão com o banco de dados MongoDB usando a string de conexão 
 * fornecida nas variáveis de ambiente. 
 * 
 * A função tenta conectar-se ao MongoDB e registra o sucesso ou falha no console.
 * Em caso de falha, a aplicação é encerrada com um código de saída de erro.
 */
async function dbConnect() {
    try {
        // Tenta estabelecer uma conexão usando a string de conexão do ambiente
        await mongoose.connect(process.env.STRING_CONNECTION);
        console.log("MongoDB connected");
    } catch (error) {
        // Registra o erro e encerra a aplicação se a conexão falhar
        console.log("Error in connection with MongoDB: ", error);
        process.exit(1);
    }
}

export default dbConnect;
