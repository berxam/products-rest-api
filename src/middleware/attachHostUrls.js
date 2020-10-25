module.exports = (req, res, next) => {
  req.realBaseUrl = `${req.protocol}://${req.get('host')}`
  req.fullUrl = req.realBaseUrl + req.baseUrl + req.path
  next()
}
