import express from "express";


const router = express.Router();
const {check} = require("express-validator")
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")


router.post('/api/singup', [
   check("login", "Имя пользователя должно быть введено").notEmpty(),
   check("password", "Пароль должен быть больше 4-х символов").isLength(4),
], authController.singup)

router.post('/api/login', authController.login)

router.get('/getusers', roleMiddleware(["Admin"]), authController.getUsers)



export { router as authRouter }