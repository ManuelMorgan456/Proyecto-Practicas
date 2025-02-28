const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async ()=> {
    try {
        let mongoURI = process.env.db_mongo
        await mongoose.connect(mongoURI)
        console.log("Conectado a la base de datos");
        
    } catch (error) {
        console.log("No se pudo conectar a la base de datos!",error);        
    }
}

module.exports = connectDB