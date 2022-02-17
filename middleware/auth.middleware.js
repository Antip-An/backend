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

      const decodedData = jwt.verify(token, process.env.AUTH_KEY)
      
      req.user = decodedData
      
      next()
   } catch (err) {
      console.log(err)
      return res.status(403).json({message: "Пользователь не авторизован"})
   }
}
