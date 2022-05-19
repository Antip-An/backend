const { User } = require("../models");

exports.getInfo = async function (req, res) {
   try {
      const user = await User.findOne({
         where: { id: req.user.id }
      })

      return res.json({ user })
   } catch (error) {
      console.log(error)
      res.status(503).json({ message: "Server error" })
   }
}
