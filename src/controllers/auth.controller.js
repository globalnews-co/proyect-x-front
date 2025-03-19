import { getConnection, querys, sql } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import moment from 'moment/moment.js';

export const log = async (req, res) => {
    try {
        const { userName } = req.body;
        const idUser = req.params.id;

        const pool = await getConnection();
        await pool.request()
            .input("ID_Registro", null)
            .input("Tabla", "Sesión finalizada")
            .input("Detalle", "Sesión terminada registrada")
            .input("Fecha", moment().format('YYYY-MM-DDTHH:mm:ss'))
            .input("ID_User", idUser)
            .query(querys.queryInsertLog);

        res.status(200).json({ message: 'Logout registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar logout:', error);
        res.status(500).json({ message: 'Error al registrar logout' });
    }
}
export const register = async (req, res) => {

    const { username, password, idrol } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("UserName", username)
            .query(querys.querySelectuserid)
        if (result.recordset[0] != null) {
            return res.status(400).json({ message: "User already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);


        const createuser = await pool.request()
            .input("UserName", username)
            .input("Password", hashPassword)
            .input("Salt", salt)
            .query(querys.queryInsertUser)
        createuser.recordset[0].ID_User
        let rol = idrol || 2
        if (createuser.recordset[0].ID_User) {


            await pool.request()
                .input("ID_User", createuser.recordset[0].ID_User)
                .input("ID_Rol", rol)
                .query(querys.queryInsertRol)

        }

        const rolname = await pool.request()
            .input("idrol", rol)
            .query(querys.querySelectRolByID)

        const token = jwt.sign({

            _id: createuser.recordset[0].ID_User,
        }, TOKEN_SECRET, { expiresIn: '10h' });

        return res.status(200).json({
            message: "User created successfully",
            "profile": {},
            "token": token,
            "user": {
                _id: createuser.recordset[0].ID_User,
                rol: rolname.recordset[0].Rol

            }
        });
    }
    catch (error) {
        return res.status(400).json({ message: "Error creating user " + error });
    }



}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const pool = await getConnection();
        const result = await pool.request()
            .input("UserName", username)
            .query(querys.querySelectuserid)

        if (result.recordset[0] == null) {
            return res.status(400).json({ message: "User not exist" });
        }

        const user = result.recordset[0];
        const validPassword = await bcrypt.compare(password, user.Password);

        if (!validPassword) {
            return res.status(400).json({ message: "Password is not valid" });
        }

        const requestProfile = await pool.request()
            .input("ID_User", user.ID_User)
            .query(querys.querySelectprofileuserid)

        await pool.request()
            .input("ID_Registro", null) 
            .input("Tabla", "Sesión Iniciada")
            .input("Detalle", "Inicio de sesión registrado")
            .input("Fecha", moment().format('YYYY-MM-DDTHH:mm:ss'))
            .input("ID_User", user.ID_User)
            .query(querys.queryInsertLog);

        const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 10);
        const userdetails = {
            id: user.ID_User,
            username: user.UserName,
            rol: user.Rol
        }

        const token = jwt.sign({
            id: user.ID_User,
            rol: user.Rol
        }, TOKEN_SECRET, { expiresIn: '10h' });

        res.status(200).json({
            message: "Login success",
            "profile": requestProfile.recordset[0] || {},
            "token": token,
            "user": userdetails
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error login" });
    }
}

export const profile = async (req, res) => {
    try {
        // Validar que todos los campos requeridos existan
        const requiredFields = ['id_user', 'nombre', 'email', 'telefono', 'ciudad'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    message: `Campo requerido: ${field}`
                });
            }
        }

        const pool = await getConnection();
        
        // Verificar si el usuario existe
        const userResult = await pool.request()
            .input("ID_User", req.body.id_user)
            .query(querys.queryfinduserbyid);

        if (!userResult.recordset[0]) {
            console.log(`Usuario con ID ${req.body.id_user} no existe`);
            return res.status(404).json({
                message: "El usuario no existe"
            });
        }

        // Verificar si el perfil ya existe
        const requiredProfile = await pool.request()
            .input("ID_User", req.body.id_user)
            .query(querys.queryfindprofilebyid);

        if (requiredProfile.recordset[0]) {
            console.log(`Perfil para usuario ${req.body.id_user} ya existe`);
            return res.status(409).json({
                message: "El perfil ya existe"
            });
        }

        // Crear el perfil
        const insertProfile = await pool.request()
            .input("Nombre", req.body.nombre)
            .input("Email", req.body.email)
            .input("Telefono", req.body.telefono)
            .input("Ciudad", req.body.ciudad)
            .input("ID_User", req.body.id_user)
            .query(querys.queryInserDirector);

        // Verificar si la inserción fue exitosa
        if (insertProfile.rowsAffected[0] > 0) {
            return res.status(201).json({
                message: "Perfil creado exitosamente",
                "profile": {
                    ID_Director: insertProfile.recordset[0].ID_Director,
                    nombre: req.body.nombre,
                    email: req.body.email,
                    telefono: req.body.telefono,
                    ciudad: req.body.ciudad
                },
                "user": {
                    _id: req.body.id_user
                }
            });
        }
        
        console.log(`Error al crear perfil para usuario ${req.body.id_user}. Filas afectadas: ${insertProfile.rowsAffected}`);
        return res.status(500).json({ message: "Error al crear el perfil" });
    } catch (error) {
        console.error("Error en la función profile:", error);
        return res.status(500).json({ 
            message: "Error al crear el perfil", 
            error: error.message 
        });
    }
}

export const verifyToken = async (req, res) => {

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        req.userId = decoded._id;
        return res.status(200).json({ message: 'Autorizado' });
    } catch {

        return res.status(401).json({ message: 'No autorizado' });
    }
}

























