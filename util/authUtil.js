require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { token } = require('morgan');

const secret = process.env.JWT_SECRET;

const emailValidate = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const passwordValidate = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }

  if (!/[A-Z]/.test(password)) {
    return 'Password must contain uppercase letters'
  }

  if ((password.match(/[0-9]/g) || []).length < 3) {
    return 'Password must contain numbers(at least 3)'
  }

  return true
}

const passwordCompare = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
      if (err) {
        reject(err)
      } else {
        resolve(isMatch)
      }
    })
  })
}

const jwtSign = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

const jwtCheck = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}

module.exports = { passwordValidate, passwordCompare, jwtSign, jwtCheck, emailValidate }
