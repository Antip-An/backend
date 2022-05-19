const { Service } = require('../models')


async function createService(req, res) {
  const { name, price } = req.body;

  try {
    const service = await Service.create({
      name,
      price
    });

    return res.json(service);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

async function findAll(_, res) {
  try {
    const services = await Service.findAll();

    return res.json(services);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

async function findOne(req, res) {
  const id = req.params.id;

  try {
    const service = await Service.findOne({
      where: { id },
    });

    if(!service) return res.json({message: "Не удалось найти услугу с таким id"})

    return res.json(service);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

async function updateService(req, res) {
  const id = req.params.id;
  const { name, price } = req.body;

  try {
    const service = await Service.findOne({
      where: { id },
    });

    if(!service) return res.json({message: "Не удалось найти услугу с таким id"})

    service.name = name || service.name
    service.price = price || service.price


    await service.save();

    return res.json(service);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

async function deleteSrvice(req, res) {
  const id = req.params.id;

  try {
    const service = await Service.findOne({
      where: { id },
    });

    if(!service) return res.json({message: "Не удалось найти услугу с таким id"})

    await service.destroy();

    return res.status(201).json({ message: "Услуга успешно удалена" });
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

module.exports = {
  createService,
  findAll,
  findOne,
  updateService,
  deleteSrvice
}