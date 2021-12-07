const {Service} = require('../models')

class ServiceController {
  async create(req, res) {
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

  async findAll(req, res) {
    try {
      const services = await Service.findAll();

      return res.json(services);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  }

  async findOne(req, res) {
    const id = req.params.id;

    try {
      const service = await Service.findOne({
        where: { id },
      });

      return res.json([service]);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { name, price } = req.body;

    try {
      const service = await Service.findOne({
        where: { id },
      });

      service.name = name;
      service.price = price;
      

      await service.save();

      return res.json(service);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    try {
      const service = await Service.findOne({
        where: { id },
      });

      await service.destroy();
      return res.status(200).json({ message: "Service deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  }
}

module.exports = new ServiceController();
