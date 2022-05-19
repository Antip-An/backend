import express from "express";
const { login, signup } =  require("../controllers/auth.controller")

const router = express.Router();
const {check} = require("express-validator")
const authMiddleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")


router.post('/signup', [
   check("login", "Имя пользователя должно быть введено").notEmpty(),
   check("password", "Пароль должен быть больше 4-х символов").isLength(4),
], signup)

router.post('/login', login)



export { router as authRouter };
//