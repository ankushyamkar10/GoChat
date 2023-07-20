const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController')

router.post('/register', registerUser).post('/login', loginUser).get('/',getAllUsers)

module.exports = router