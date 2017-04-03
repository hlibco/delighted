'use strict'

const Debug = require('debug')('delighted:utils/auth')
const JWT = require('jsonwebtoken')

module.exports = {
  apiKey,
  loggedIn
}

function apiKey (req) {
  const key = JWT.decode(req.accessToken())

  Debug('apiKey', key)
  return key
}

function loggedIn (req) {
  return !!apiKey(req)
}
