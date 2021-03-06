const { User } = require("../models");
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const role = "User"

function generateAccessToken(id, role) {
   const payload = {
      id,
      role
   }

   return jwt.sign(payload, process.env.KEY, { expiresIn: "1h" })
}

async function signup(req, res) {
   const errors = validationResult(req)
   const { login, password } = req.body;

   try {
      if (!errors.isEmpty()) {
         return res.status(400).json({ message: "Ошибка при регистрации", errors })
      }
      const candidate = await User.findOne({
         where: { login }
      })
      if (candidate) {
         return res.status(400).json({ message: "Пользователь уже существует" })
      }

      const hashPassword = bcrypt.hashSync(password, 7)
      const user = await User.create({
         login,
         password: hashPassword,
         role
      })

      const token = generateAccessToken(user.id, user.role)

      res.status(200).json({
         message: "Пользователь зарегистрирован",
         token
      })
   } catch (err) {
      console.log(err)
      res.status(400).json({ message: "Sing up error" })
   }
}

async function login(req, res) {

   try {
      const { login, password, } = req.body;

      const user = await User.findOne({
         where: { login }
      })
      if (!user) {
         res.status(400).json({ message: "Пользователь не найден" })
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
         res.status(400).json({ message: "Неверный пароль" })
      }

      const token = generateAccessToken(user.id, user.role)

      return res.json({ token })
   } catch (err) {
      console.log(err)
      res.status(400).json({ message: "Log in error" })
   }
}

async function getUsers(req, res) {

   try {
      const users = await User.findAll();

      return res.json(users);
   } catch (err) {
      console.log(err);
      return res.json(err);
   }

}

module.exports = {
   signup,
   login
}