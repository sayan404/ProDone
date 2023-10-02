const catchAsyncError = require('../middleware/catchAsyncError')
const Product = require('../models/productModel')
const ErrorHandler = require("../utils/errorHandler")
const cloudinary = require('cloudinary')

// GET all products

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const { category, keyword, price, page, ratings } = req.query
    const queryObject = {}
    let products
    // console.log(req.query);
    products = await Product.find(queryObject)
    const totalNoOfProducts = products.length
    if (category) {
        queryObject.category = { $regex: category, $options: "i" }
    }
    if (keyword) {
        queryObject.name = { $regex: keyword, $options: "i" }
    }
    if (price) {
        queryObject.price = { $gte: price.gte, $lte: price.lte }
    }
    if (ratings) {
        queryObject.ratings = { $gte: ratings.gte }
    }
    const resultPerPage = 8
    let pageCount = Number(req.query.page) || 1
    let skipObjects = (pageCount - 1) * resultPerPage
    if (page) {
        products = await Product.find(queryObject).skip(skipObjects).limit(resultPerPage)
    }
    else {
        products = await Product.find(queryObject)
    }
    res.status(200).json({
        success: true,
        productsCountAfterAllFilters: products.length,
        products,
        resultPerPage,
        totalNoOfProducts
    })
})


exports.getAllProductsAdmin = catchAsyncError(async (req, res, next) => {
    const products = await Product.find()
    res.status(200).json({
        success: true,
        productsCountAfterAllFilters: products.length,
        products
    })
})


// Create Product --admin

exports.createProduct = catchAsyncError(async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

// Get single Product Details

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product Not Found"
        })
    }
    res.status(200).json({
        success: true,
        product
    })

})


// update product --admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not Found'
        })
    }

    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product --Admin

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    console.log(product);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: 'Product not Found'
        })
    }
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        // await product.remove();
    }
    
    console.log("working");
    const prod = await Product.findOneAndDelete(req.params.id)
    
    res.status(200).json({
        success: true,
        message: "Product Deleted Sucessfully"
    })
})


// Create New Review or Update the review 

exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    }
    else {
        product.reviews.push(review)
    }
    product.numofReviews = product.reviews.length
    let avg = 0
    product.reviews.forEach(rev => {
        avg += rev.rating
    })
    product.ratings = avg / product.reviews.length
    await product.save({ validateBeforeSave: false })
    await res.status(200).json({
        success: true
    })

})


// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})


// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    )

    let avg = 0

    reviews.forEach((rev) => {
        avg += rev.rating
    })

    let ratings = 0

    if (reviews.length === 0) {
        ratings = 0
    } else {
        ratings = avg / reviews.length
    }

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    )

    res.status(200).json({
        success: true,
    })
})

