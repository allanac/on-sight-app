const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required']
    },
    encryptedPassword: {
      type: String,
      required:[true, 'Password is required']
    },
    scans: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Media', required: false
      }]
  },
  {
    timestamps:
    { createdAt:'created_at',
      updatedAt:'updated_at'}
    }
)

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
