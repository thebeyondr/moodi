const mongoose = require('mongoose')
const { Schema } = mongoose

// TODO: Add User to Schema
const postSchema = new Schema({
  photoId: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    { user: { type: Schema.Types.ObjectId, ref: 'User' }, comment: { type: String } }
  ],
  isCurrent: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  archivedAt: { type: Date }
})

module.exports = mongoose.model('Post', postSchema)
