const Debug = require('debug')('delighted:handlers/auth')
const JWT = require('jsonwebtoken')
const Querystring = require('querystring')
const Config = require('../config/config')

module.exports = {
  privacy,
  getLogin,
  postLogin
}

function privacy (req, res) {
  res.render('pages/privacy')
}

function getLogin (req, res) {
  const vars = {
    error: null
  }

  Debug(req.query)
  res.render('pages/login', vars)
}

function postLogin (req, res) {
  const vars = {
    error: null
  }

  const Delighted = require('delighted')(req.body.apiKey)

  const metrics = async function getMetrics () {
    return await Delighted.metrics.retrieve()
  }

  metrics().then(() => {
    const params = {
      state: req.query.state,
      access_token: JWT.sign(req.body.apiKey, Config.get('secret.auth')),
      token_type: 'Bearer'
    }

    const url = `${req.query.redirect_uri}#${Querystring.stringify(params)}`
    Debug(url)
    res.redirect(url)
  }).catch(err => {
    Debug('Error', err)
    vars.error = err.message.message
    res.render('pages/login', vars)
  })
}
