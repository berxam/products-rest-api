require('dotenv').config()

const { PORT, MONGODB_URL } = process.env

require('mongoose').connect(MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).catch(err => {
  console.error(err)
  process.exit(1)
})

require('express')()
  .use('/products', require('./routes/products'))
  .listen(PORT, () => console.log(`Server running at port ${PORT}`))
