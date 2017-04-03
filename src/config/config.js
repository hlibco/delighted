// Global configuration settings
if (process.env.NODE_ENV === 'development' || !process.env.CI) {
  require('dotenv').config()
}

const Confidence = require('confidence')

const criteria = {
  env: process.env.NODE_ENV
}

const config = {
  env: process.env.NODE_ENV,
  api: {
    prefix: {
      $meta: 'The entry to the API URI',
      $value: '/v1'
    }
  },
  port: {
    $filter: 'env',
    $default: process.env.ALEXA_PORT,
    production: process.env.ALEXA_PORT
  },
  skill: {
    id: [
      'amzn1.ask.skill.e48fd38e-b625-4ad5-b298-267e33e998fd'
    ]
  },
  secret: {
    auth: process.env.ALEXA_SECRET_AUTH,
    session: process.env.ALEXA_SECRET_SESSION
  }
}

// Store config in Confindence
const store = new Confidence.Store(config)
module.exports = {
  get (key) {
    key = '/' + key.replace(/\./g, '/').replace(/^\/+/g, '')
    return store.get(key, criteria)
  },
  meta (key) {
    return store.meta(key)
  }
}
