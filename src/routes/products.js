const { Router, json } = require('express')

const ProductModel = require('../models/Product')
const router = Router()

router.use(require('cors')())
router.use(json(), require('../middleware/handle415'))
router.use(require('../middleware/attachHostUrls'))

router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find()
    res.json(products)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id)
    if (!product) return res.sendStatus(404)
    res.json(product)
  } catch (error) {
    switch (error.name) {
      case 'CastError':
        res.sendStatus(404)
        break
      default:
        res.sendStatus(500)
    }
    console.error(error)
  }
})

router.post('/', async (req, res) => {
  const product = new ProductModel({ ...req.body })

  try {
    await product.save()
    res.location(req.fullUrl + product._id).sendStatus(201)
  } catch (error) {
    res.status(error.name === 'ValidationError' ? 422 : 500)
    console.error(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { body, params } = req
    const product = await ProductModel.findById(params.id)

    if (!product) return res.sendStatus(404)

    for (const prop in product.toObject()) {
      if (prop in body) product[prop] = body[prop]
    }

    await product.save()
    res.json(product)
  } catch (error) {
    switch (error.name) {
      case 'CastError':
        res.sendStatus(404)
        break
      case 'ValidationError':
        res.status(422).json(error)
        break
      default:
        res.sendStatus(500)
    }
    console.error(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await ProductModel.deleteOne({ _id: req.params.id })
    if (result.n === 0) return res.sendStatus(404)
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(error.name === 'CastError' ? 404 : 500)
    console.error(error)
  }
})

module.exports = router
