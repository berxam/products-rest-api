require('dotenv').config()

require('mongoose').connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).catch(err => {
  console.error(err)
  process.exit(1)
})

const app = require('express')()

app.use('/products', require('./routes/products'))

const API_DOCS = require('path').join(__dirname, '../DOCS.md')
app.get('/docs', (req, res) => res.sendFile(API_DOCS))

const { PORT } = process.env
app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
