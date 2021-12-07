import express from "express";

const router = express.Router();

const ServiceController = require("../controllers/service.controller");

router.post('/service', ServiceController.create)

router.get('/services', ServiceController.findAll)

router.get('/service/:id', ServiceController.findOne)

router.put('/service/:id', ServiceController.update)

router.delete('/service/:id', ServiceController.delete)


export { router as ServiceRouter }