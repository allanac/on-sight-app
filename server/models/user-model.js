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
    instagramID: {type: String},
    facebookID:  {type: String},
  {
    timestamps:
    { createdAt:'created_at',
      updatedAt:'updated_at'}
    }
)

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
