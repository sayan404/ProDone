const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require('cloudinary')

//--Register a User

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: 'scale'
  })
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  });

  sendToken(user, 201, res);
});

// Login User

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email , password);
  // check if user has given password and emaail both or not correctly

  if (!email || !password) {
    return next(new ErrorHandler(`Please Enter Email and Password`, 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
  console.log('ok');
  // console.log(sendToken);
});



// Logout User

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});



// Forgot Pssword
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Foud", 404));
  }
  // console.log(user);
  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save();
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
  const message = `Your Password token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this mail please igonre`;
  // const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;
  try {
    sendEmail({
      email: user.email,
      subject: `Ecommarce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email Sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save();
    return next(new ErrorHandler(err.message, 500));
  }
});


// Reset Pssword

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash 
  const resetToken = req.params.token
  const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  if (!user) {
    return next(new ErrorHandler(`Reset Password Token is invalid or has been expired`, 400))
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(`Password is not matching with with Confirm Password`, 400))
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  sendToken(user, 200, res);
});


// Get User Details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  console.log(req);
  console.log(req.user._id);
  const user = await User.findById(req.user._id)
  console.log("sfdgfdgahbhjbjnvknkfv");
  console.log(user);
  res.status(200).json({
    success: true,
    user
  })
})



// update User Password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password")
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  // console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is Incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesnot Match", 400));
  }
  user.password = req.body.newPassword;
  const stmn = await user.save()
  // console.log(stmn);
  sendToken(user, 200, res)
})

// update User Profile 
exports.updateUserData = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // console.log(name);
  // console.log("1");
  // console.log(email);

  if (req.body.avatar !== "") {
    // console.log("-2");
    const user = await User.findById(req.user.id);
    // console.log(user);
    const imageId = user.avatar.public_id;
    // console.log("-1")
    // console.log(imageId);
    // console.log("0")
    const response2 = await cloudinary.v2.uploader.destroy(imageId);
    // console.log("1")
    // console.log(response2);
    // console.log("2")
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
    // console.log("3")
    // console.log(newUserData);
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    success: true
  })
})

//GET all users --- admin

exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({
    success: true,
    results: users.length,
    users
  })
})

//GET single users --- admin

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new ErrorHandler(`User does not exit with Id: ${req.params.id}`))
  }
  res.status(200).json({
    success: true,
    user
  })
})

// Update User Role/Data --admin 

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserata = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  }
  const user = await User.findByIdAndUpdate(req.params.id, newUserata, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    success: true
  })
})


// Delete User Data --adimn

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  // will remove avatar later 
  if (!user) {
    return next(new ErrorHandler(`User does not exit with Id: ${req.params.id}`))
  }
  await user.deleteOne()
  res.status(200).json({
    success: true
  })
})
