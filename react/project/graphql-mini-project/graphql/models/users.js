import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  desc: String,
  bio: String,
  thumbnail: String,
  posts: {
    type: [],
    defualt: [],
  },
  following: {
    type: [],
    default: [],
  },
  followers: {
    type: [],
    default: [],
  }
})

export default mongoose.model('User', userSchema)
