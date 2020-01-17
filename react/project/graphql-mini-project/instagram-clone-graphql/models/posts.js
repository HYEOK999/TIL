import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  by: {
    type: {},
    required: true,
  },
  photo: String,
  desc: String,
  createdAt: {
    type: String,
    default: new Date(),
  },
  comments: {
    type: [],
    default: [],
  },
  likedBy: {
    type: [],
    default: [],
  },
})

export default mongoose.model('Post', postSchema)
