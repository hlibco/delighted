'use strict'

const Debug = require('debug')('delighted:intents/yes')
const Actions = require('../actions')

module.exports = (req, res) => {
  Debug('AMAZON.YesIntent', req.tag())

  switch (req.tag()) {
    case res.tags.RETRY_METRICS:
      return Actions.getMetrics(req, res)
    default:
      return res.say(res.msg.UNKNOWN)
  }
}
