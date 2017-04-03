'use strict'

const Debug = require('debug')('delighted:intents/help')

module.exports = (req, res) => {
  Debug('Intent: AMAZON.HelpIntent')

  res.say(res.msg.HELP).reprompt(res.msg.HELP_REPROMPT).tag(res.tags.HELP)
}
