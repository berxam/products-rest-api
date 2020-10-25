const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: PLACEHOLDER_IMG,
  },
  stock: {
    type: Number,
    default: 0,
  },
})

module.exports = model('products', productSchema)
