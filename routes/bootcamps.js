const express = require('express')
const { 
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcamps')

//include other resourses route
const courseRoutes = require('./courses')

const router = express.Router()

//re-route into other resource router
router.use('/:bootcampId/courses', courseRoutes)

router
    .route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp)

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp)

router
    .route('/:id/photo')
    .put(bootcampPhotoUpload)


module.exports = router