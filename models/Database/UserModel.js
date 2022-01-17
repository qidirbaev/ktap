import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 3
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  date: {
    type: Date,
    default: Date.now
  },
  phone_number: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);