'use strict'

const Debug = require('debug')('delighted:intents/launch')

module.exports = (req, res) => {
  Debug('Intent: Launch')

  const intros = [
    `Hello`,
    `Hi`
  ]

  const meta = {
    intro: intros[Math.floor(Math.random() * intros.length)]
  }

  res.session().clear()
  res.say(res.msg.WELCOME, meta)
  res.tag(res.tags.RETRY_METRICS)
}
