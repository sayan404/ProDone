const express = require('express');
const ErrorHandler = require('./utils/errorHandler')
const app = express();
const cookieParser = require('cookie-parser')
const globalErrorHandler = require('./middleware/error')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config({path : './dot.env'});
const path = require("path");
const cors = require('cors'); // Import the 'cors' package


// Express body-parser is an npm module used to process data sent in an HTTP request body. It provides four express middleware for parsing JSON, Text, URL-encoded, and raw data sets over an HTTP request body.
const fileUpload = require('express-fileupload')
app.use(express.json({limit : "50mb"}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit : "50mb" , extended: true }))
app.use(fileUpload())
app.use(cors());

// app.get('/', (req, res) => {
//     res.send("Server Is Working Fine")
// });

// Route imports 
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
const specialOffer = require('./routes/specialOfferRoute')
const payment = require('./routes/paymentRoute')
// api route imports
app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)
app.use('/api/v1', specialOffer)
app.use('/api/v1', payment)


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Error Handling of all wrong routes
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Cannot find ${req.originalUrl} on this server`, 404))
})


// basic structure to handle api via an globalErrorHandler
app.use(globalErrorHandler)


module.exports = app 