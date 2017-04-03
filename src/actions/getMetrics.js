'use strict'

const Debug = require('debug')('delighted:actions/placeOrder')
const Auth = require('../utils/auth')

module.exports = (req, res) => {
  Debug('getMetrics()')
  const Delighted = require('delighted')(Auth.apiKey(req))

  const metrics = async function getMetrics () {
    return await Delighted.metrics.retrieve()
  }

  // https://delighted.com/docs/api/getting-metrics
  return metrics().then(result => {
    Debug('getMetrics()', result)

    result.promoter_percent = Math.round(result.promoter_percent)
    result.detractor_percent = Math.round(result.detractor_percent)
    result.passive_percent = Math.round(result.passive_percent)

    res.say(res.msg.METRICS, result)
    .card(res.msg.CARD_METRICS_TITLE, res.msg.CARD_METRICS_BODY, undefined, result).end()
  }).catch(err => {
    Debug(err)
    res.say(res.msg.EXP_GET_METRICS).tag(res.tags.RETRY_METRICS)
  })
}
