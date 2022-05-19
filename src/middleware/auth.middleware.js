const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = function (req, res, next) {
   if (req.method === "OPTIONS") {
      next()
   }

   try {
      const token = req.headers.authorization.split(" ")[1]
      
      if (!token) {
         return res.status(403).json({message: "Пользователь не авторизован"})
      }
      console.log(req.headers.authorization)

      const decodedData = jwt.verify(token, process.env.KEY)
      
      req.user = decodedData
      console.log(req.user)
      next()
   } catch (err) {
      console.log(err)
      return res.status(503).json({message: "Server Error"})
   }
}
