const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mediaSchema = new Schema ({
  title: {},
  owner: {},
  mediaFile: {},
  likes: [{}]
},
{timestamps: true}
)

const MediaModel = mongoose.model('Media', mediaSchema)

module.exports = MediaModel
