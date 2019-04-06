const login = (req, res) => {
  res.status(200)
  res.json({
    "message": "User logged in: " + req.body.email
  })
}

const register = (req, res) => {
  res.status(200)
  res.json({
    "message": "User registered: " + req.body.email
  })
}

module.exports = {
  login,
  register
}