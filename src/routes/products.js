const { Router, json } = require('express')
const cors = require('cors')

const router = Router()

router.use(cors(), json())

router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find()
    res.json(products)
  } catch (error) {
    switch (error.name) {
      case 'CastError':
        res.sendStatus(404)
        break
      default:
        res.status(500).json(error)
    }
  }
})

router.get('/:id(\\d+)', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id)
    res.json(product)
  } catch (error) {
    switch (error.name) {
      case 'CastError':
        res.sendStatus(404)
        break
      default:
        res.status(500).json(error)
    }
  }
})

router.post('/', async (req, res) => {
  const product = new ProductModel({ ...req.body })

  try {
    await product.save()
    res.location(`/${product._id}`).sendStatus(201)
  } catch (error) {
    res.status(error.name === 'ValidationError' ? 422 : 500)
      .json(error)
  }
})

router.put('/:id(\\d+)', async (req, res) => {
  const { body, params } = req
  const product = await ProductModel.findById(params.id)

  for (const prop in product.toObject()) {
    if (prop in body) product[prop] = body[prop]
  }

  try {
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
        res.status(500).json(error)
    }
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await ProductModel.remove({ _id: product._id })
    if (!result) res.sendStatus(404)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
