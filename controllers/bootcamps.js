const Bootcamp = require('../models/Bootcamp');

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: "Show All Bootcamps",
        hello: req.hello
    })
}


// @desc     Get single bootcamps
// @route    GET /api/v1/bootcamps/:id
// @access   Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Show bootcamp with id ${req.params.id}`
    })
}

// @desc     Create a new bootcamp
// @route    POST /api/v1/bootcamps
// @access   Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)

        res.status(201).json({
            success: true,
            data: bootcamp
        })   
    } catch (err) {
        res.status(400).json({
            success: false,
            data: "An Error occured"
        })    
    }
}

// @desc     Update bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @access   Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Updated bootcamp with id ${req.params.id}`
    })
}

// @desc     Delete bootcamp
// @route    DELETE /api/v1/bootcamps/:id
// @access   Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Removed bootcamp with id ${req.params.id}`
    })
}