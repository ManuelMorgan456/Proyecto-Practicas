const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userModel = mongoose.Schema({
    nombre: { 
        type: String, 
        required: true, 
        trim: true 
    },
    apellidos: { 
        type: String, 
        required: true, 
        trim: true 
    },
    correo: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
    },
    contrasena: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    rol: { 
        type: String, 
        required: true, 
        enum: ["admin", "student"]
    }
}, {
    versionKey: false,
    timestamps: true
});

// Cifrado de contraseña con BCRYPT

userModel.pre('save', async function (next) {
    // Verifica si la contraseña ya está cifrada
    if (!this.isModified('contrasena')) return next();
    
    try {
        const saltRounds = 10; // cantidad de rondas de cifrado
        const hashedPassword = await bcrypt.hash(this.contrasena, saltRounds);
        this.contrasena = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports= mongoose.model('register',userModel);