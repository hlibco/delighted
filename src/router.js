'use strict'

const Express = require('express')
const HandlerAuth = require('./handlers/auth')
const HandlerSkill = require('./handlers/skill')

const router = Express.Router()

module.exports = router

/**
 * Privacy policy
 */
router.get('/privacy', HandlerAuth.privacy)

/**
 * Login form
 */
router.get('/login', HandlerAuth.getLogin)

/**
 * Login authentication
 */
router.post('/login', HandlerAuth.postLogin)

/**
 * Alexa skill
 */
router.post('/skill', HandlerSkill.handler)

/**
 * Skill settings
 */
router.get('/config', (req, res) => {
  res.render('config', {
    schema: HandlerSkill.app.schema(),
    utterances: HandlerSkill.app.utterances()
  })
})
