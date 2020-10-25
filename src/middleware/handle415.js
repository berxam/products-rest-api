module.exports = (req, res, next) => {
  if (req.headers['content-length'] > 0 && !req.is('json')) {
    return res.sendStatus(415)
  }

  next()
}
