require('dotenv').config(); //miller
const express = require('express');//miller
const router = require('./api/routes/routes.js');//miller
const connectDB = require('./api/config/DB.js');//miller

const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const config = require("./config.js").config;

const app = express();//miller
let PORT = process.env.PORT || config.puerto;;//miller
app.use(express.json());//miller
app.use('/api', router);//miller
connectDB();//miller

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});



// Configurar sesiones
// app.use(session({
//     secret: config.secret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: config.expiracion,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production" // Solo en HTTPS
//     }
// }));



// mongoose.connect("mongodb://localhost:27017/" + config.bd).then((respuesta) => {
//     console.log("Conexión a MongoDB correcta");
// }).catch((error) => {
//     console.log("Error al conectar a MongoDB:", error);
// });

mongoose.connect(config.mongoURI)
    .then(() => {
        console.log("Conexión a MongoDB correcta");
    })
    .catch((error) => {
        console.log("Error al conectar a MongoDB:", error);
    });

// Middleware CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || config.whitelist.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("CORS no permitido"), false);
        }
    },
    credentials: true
}));




// Servir archivos estáticos
// app.use("/", express.static(path.join(__dirname, "Pagina")));



// Ruta para manejar SPA en Angular
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, "dist", "frontend", "browser", "index.html"));
// });

// Iniciar servidor
app.listen(PORT || 3003, () => {
    console.log("Servidor corriendo en http://localhost:3003"); //MILLER
});




