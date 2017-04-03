'use strict'

const Debug = require('debug')('delighted:server')
const Express = require('express')
const Path = require('path')
const BodyParser = require('body-parser')
const Config = require('./config/config')
const Router = require('./router')
const express = Express()

/**
 * Setup webserver
 */
express.set('port', Config.get('port'))
express.set('views', Path.join(__dirname, '/views'))
express.set('view engine', 'ejs')

/**
 * Setup middlewares
 */
express.use(BodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString()
  }
}))
express.use(Express.static('src/public'))
express.use(BodyParser.urlencoded({ extended: true }))
express.use(BodyParser.json())

express.use('/', Router)

/**
 * Start server
 * Webhooks must be available via SSL with a certificate signed by a valid
 * certificate authority. Use Ngrok for development.
 */
express.listen(Config.get('port'), () => {
  Debug(`Alexa app is running on port ${Config.get('port')}`)
})
