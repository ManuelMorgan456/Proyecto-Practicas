const userModel = require('../models/sesionModel');
const jwt = require('jsonwebtoken');
require ('dotenv').config();
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    try {
        let { nombre, apellidos, correo, contrasena, rol } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Formato de correo electronico
        if (!emailRegex.test(correo)) {
            return res.status(400).json({ error: "Formato de email inválido" });
        }
        
        // Verificar que el rol sea permitido
        const rolesPermitidos = ["admin", "student"];
        if (rol && !rolesPermitidos.includes(rol)) {
            return res.status(400).json({ error: "Rol no válido" });
        }

        // Verificar si el usuario ya existe
        let userExist = await userModel.findOne({ correo });
        if (userExist) {
            return res.status(409).json({ error: "El usuario ya existe, intenta con otro correo." });
        }

        // Crear nuevo usuario
        let userRegister = new userModel({ nombre, apellidos, correo, contrasena, rol });
        let create = await userRegister.save();

        res.status(201).json(create);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error en el servidor, contacta al administrador" });
    }
};

exports.login = async (req, res) => {
    try {
        let data = req.body;
        let user = await userModel.findOne({ correo: data.correo });

        if (!user) {
            return res.status(401).send({ error: "Credenciales inválidas (correo)" });
        }

        // Comparar la contraseña ingresada con la almacenada (que está en hash)
        const isMatch = await bcrypt.compare(data.contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(401).send({ error: "Credenciales inválidas (contraseña)" });
        }

        // Si la contraseña es correcta, generar el token JWT
        let payLoad = {
            id: user._id,
            nombre: `${user.nombre}${user.correo}`
        };
        let JWT_SECRET = process.env.JWT_SECRET;
        let token = jwt.sign(payLoad, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

        res.status(200).send({ token });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ error: "Ha ocurrido un error, comunícate con el administrador" });
    }
};

exports.getUsers = async(req, res)=> {
    try {
        let dataUsers = await userModel.find()
        res.json(dataUsers)
    } catch (error) {
        console.log(error.message);
        res.send({error:"Información restringida"})
               
    }
}

exports.deleteUser = async(req, res)=> {
    try {
        let id = req.params.id
        if (id.length == 24) {
            let user = await userModel.findById(id)
            if (user) {
                let deleteUser = await userModel.findOneAndDelete({_id: id})
                res.json(deleteUser)

            } else {
                res.send({error:"El usuario que intentas eliminar no se encuentra en la base de datos"})
            }

        } else {
            res.send({error:"ID incorrecto"})
        }
       
        
    } catch (error) {
        console.log(error.message);
        res.send({error:"Error"})
        
    }
}


exports.updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;

        let user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        if (data.correo) {
            let existingUser = await userModel.findOne({ correo: data.correo });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(409).json({ error: "El correo ya está en uso por otro usuario." });
            }
        }
        
        Object.assign(user, data);
        let updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Ha ocurrido un error al intentar actualizar la información del usuario" });
    }
}