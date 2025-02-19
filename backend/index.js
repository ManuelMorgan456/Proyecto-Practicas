const express = require('express');
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const config = require("./config.js").config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

// Configurar sesiones
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: config.expiracion,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" // Solo en HTTPS
    }
}));

// Conexión a MongoDB
mongoose.connect(config.mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("✅ Conexión a MongoDB correcta");
}).catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
});

// mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta) => {
//     console.log("Conexión a MongoDB correcta");
// })
//     .catch((error) => {
//         console.log("Error al conectar a MongoDB:", error);
//     });


// mongoose.connect("mongodb://" + config.bdUser + ":" + config.bdPass + '@' + config.bdIp + ":" + config.bdPort + "/" + config.bd).then((respuesta) => {
//     console.log("Conexion correcta a mongo")
// }).catch((error) => {
//     console.log(error)
// })


//Rutas
app.use(require("./rutas.js"))

// Servir archivos estáticos
app.use("/", express.static(path.join(__dirname, "Pagina")));

// Ruta para manejar SPA en Angular
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "frontend", "browser", "index.html"));
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

