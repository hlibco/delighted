'use strict'

const Debug = require('debug')('delighted:intents/metrics')
const Actions = require('../actions')

module.exports = (req, res, slots) => {
  Debug('Metrics', slots)
  return Actions.getMetrics(req, res)
}
