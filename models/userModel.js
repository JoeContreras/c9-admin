const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
    role: {
      type: Number,
      default: 0, //0= user && 1= admin
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/joeutd/image/upload/v1621813798/samples/people/User_Avatar_2_mranwa.png",
    },
  },
  { timestamps: true }
);
userSchema.virtual("clientes", {
  ref: "Cliente",
  localField: "_id",
  foreignField: "owner",
});
userSchema.virtual("citas", {
  ref: "Cita",
  localField: "_id",
  foreignField: "owner",
});

module.exports = mongoose.model("User", userSchema);
