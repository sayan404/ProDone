y
const catchAsyncError = require('../middleware/catchAsyncError')
const SpecialOffers = require('../models/specialOffersModel')


// Get Specialoffers 

exports.getSpecialOffer = catchAsyncError(async (req, res, next) => {
    let SpecialOffs = await SpecialOffers.find({});
    res.status(200).json({
        success: true,
        results: SpecialOffs.length,
        SpecialOffs
    })
})

// Create new Specialoffers --admin 

exports.createSpecialOffer = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id
    const newSpecialOffs = await SpecialOffers.create(req.body);
    res.status(201).json({
        success: true,
        newSpecialOffs
    })
})


// Delete Specialoffers --Admin

exports.deleteSpecialOffer = catchAsyncError(async (req, res, next) => {
    let specialOffs = await SpecialOffers.findById(req.params.id)
    if (!specialOffs) {
        return res.status(500).json({
            success: false,
            message: 'Offer not Found'
        })
    }
    await SpecialOffers.findOneAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        message: "Offer Deleted Sucessfully"
    })
})


// update product --admin

exports.updateSpecialOffer = catchAsyncError(async (req, res, next) => {

    let specialOffs = await SpecialOffers.findById(req.params.id)

    if (!specialOffs) {
        return res.status(404).json({
            success: false,
            message: 'Offer not Found'
        })
    }
    specialOffs = await SpecialOffers.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        specialOffs
    })
})