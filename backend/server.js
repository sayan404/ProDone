const dotenv = require('dotenv').config({path : './dot.env'});
const app = require ('./app')
const connectDataBase = require('./controlers/dataBase')
const cloudinary = require("cloudinary")
// connecting to database 


connectDataBase()
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



app.listen(process.env.PORT || 8080 , () =>{
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})

// Problem 
// 1.Unhandeled Promise Rejection
// 2.Uncought Error
// 3.Wrong MingoDb Id error (Cast Error)