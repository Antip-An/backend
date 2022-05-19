import express from "express";
const { createService, deleteSrvice, findAll, findOne, updateService } = require("../controllers/service.controller")

const router = express.Router();


router.post('/services', createService)

router.get('/services', findAll)

router.get('/services/:id', findOne)

router.put('/services/:id', updateService)

router.delete('/services/:id', deleteSrvice)


export { router as ServiceRouter }