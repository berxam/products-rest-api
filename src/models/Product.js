const { Schema, model } = require('mongoose')

const PLACEHOLDER_IMG = 'https://pokerrun.fi/wp-content/uploads/2020/03/image-placeholder.png'

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
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
