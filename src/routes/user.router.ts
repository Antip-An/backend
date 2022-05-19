import express from "express";
const authMiddleware = require("../middleware/auth.middleware")
const { getInfo } = require("../controllers/user.controller")
const router = express.Router();


router.get('/getInfo', authMiddleware, getInfo)


export { router as UserRouter }