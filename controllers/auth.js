const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

// @desc     Register user
// @route    POST /api/v1/auth/register
// @access   Public
exports.register = asyncHandler(async (req, res, next) => {  
    const { name, email, password, role } = req.body

    // Create User
    const user = await User.create({
        name,
        email,
        password,
        role
    })

    const token = User.getSignedJwtToken()

    res
        .status(200)
        .json({
            success: true,
            token
        })
})

// @desc     Login user
// @route    POST /api/v1/auth/LOGIN
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {  
    const { email, password} = req.body

    //validate email e password
    if (!email || !password) {
        return next(new ErrorResponse(`Please provider an email and password`, 400))
    }

    //check for user
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorResponse(`Inválid credentials`, 401))
    }

    //check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return next(new ErrorResponse(`Inválid credentials`, 401))
    }

    const token = user.getSignedJwtToken()

    res
        .status(200)
        .json({
            success: true,
            token
        })
})