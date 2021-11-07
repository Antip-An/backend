import getUsersList, {swGetUser} from './login-get.route'
import createTheUser, {swPostUser} from './login-post.route'
const express = require('express')
export const swLoginRouter = {
  "/login": {
    "get": {
      ...swGetUser
    },
    "post": {
      ...swPostUser
    }
  }
}
const router = express()
router.get('/', function (req, res) {
  getUsersList(req, res)
})
router.post('/', function (req, res) {
  createTheUser(req, res)
})
export default router