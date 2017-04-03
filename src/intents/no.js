'use strict'

const Debug = require('debug')('delighted:intents/no')

module.exports = (req, res) => {
  Debug('AMAZON.NoIntent', req.tag())

  switch (req.tag()) {
    case res.tags.RETRY_METRICS:
      return res.say(res.msg.OK)
    default:
      return res.say(res.msg.UNKNOWN)
  }
}
