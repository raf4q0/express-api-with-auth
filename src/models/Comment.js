import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: Number
  }
}, { 
  timestamps: true 
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment