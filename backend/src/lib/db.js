import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database conectado! ${conn.connection.host}`)
    } catch (error){
        console.log("ERRO AO CONECTAR O DATABASE", error);
        process.exit(1);
        // sair do erro
    }
}