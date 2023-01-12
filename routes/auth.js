const { Router } = require('express')
const express = require('express')
const { 
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    updateDetails,
    updatePassword,
    logout
} = require('../controllers/auth')

const router = express.Router()

const { protect } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', protect, getMe)
router.put('/updateDetails', protect, updateDetails)
router.put('/updatePassword', protect, updatePassword)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)


module.exports = router