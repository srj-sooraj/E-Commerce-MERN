// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     password: {
//       type: String,
//       required: true
//     },
//     profilePic: {
//     type: String,
//     default: ""
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user"
//     },
//     wishlist: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//   },
// ],
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// export default User;


import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  house: String,
  street: String,
  city: String,
  state: String,
  pincode: String,
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    otp: String,
    otpExpiry: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true
    },
    resetToken: String,
    resetTokenExpire: Date,

    phone: {
      type: String,
    },

    addresses: [addressSchema],   

    profilePic: {
      type: String,
      default: ""
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;