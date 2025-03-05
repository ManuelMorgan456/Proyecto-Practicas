const mongoose = require('mongoose');
const config = require('../../config.js').config;

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI); 
        console.log("Conexión a MongoDB correcta");
    } catch (error) {
        console.log("No se pudo conectar a la base de datos!", error);
    }
};

module.exports = connectDB;


// const mongoose = require('mongoose')
// require('dotenv').config()

// const connectDB = async ()=> {
//     try {
//         let mongoURI = process.env.db_mongo
//         await mongoose.connect(mongoURI)
//         console.log("Conectado a la base de datos");
        
//     } catch (error) {
//         console.log("No se pudo conectar a la base de datos!",error);        
//     }
// }

// module.exports = connectDB

