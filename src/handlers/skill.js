'use strict'

const Debug = require('debug')('delighted:handlers/booking')
const Alexa = require('alexa-bootstrap')
const Utterances = require('../utterances')
const Intents = require('../intents')
const Config = require('../config/config')
const Utils = require('../utils')

const Tags = require('../tags')
const Messages = require('../lang/en')

const app = new Alexa({
  tags: Tags,
  repeat: true,
  reprompt: false,
  messages: {
    source: Messages
  }
})

// Assign dictionary
app.dictionary = Utterances._dictionary

/*
LaunchRequest
--------------------------------------- */
app.launch(Intents.Launch)

/*
AMAZON.HelpIntent
--------------------------------------- */
app.intent('AMAZON.HelpIntent', Intents.Help)

/*
AMAZON.StartOverIntent
--------------------------------------- */
app.intent('AMAZON.StartOverIntent', Intents.Launch)

/*
Intents
--------------------------------------- */
app.intent('Metrics', Utterances.Metrics, Intents.Metrics)
app.intent('AMAZON.NoIntent', Intents.No)
app.intent('AMAZON.YesIntent', Intents.Yes)

/*
AMAZON.RepeatIntent
--------------------------------------- */
app.intent('AMAZON.RepeatIntent', (req, res) => {
  Debug('Intent: AMAZON.RepeatIntent')
  res.say(req.repeat() || res.msg.ERR_CANT_REPEAT)
})

/*
AMAZON.CancelIntent
--------------------------------------- */
app.intent('AMAZON.CancelIntent', (req, res) => {
  Debug('Intent: AMAZON.CancelIntent')
  res.end()
})

/*
AMAZON.StopIntent
--------------------------------------- */
app.intent('AMAZON.StopIntent', (req, res) => {
  Debug('Intent: AMAZON.StopIntent')
  res.say(res.msg.STOP).end()
})

/*
SessionEndedRequest
--------------------------------------- */
app.sessionEnded((req, res) => {
  // Logout(req.userId)
  Debug('sessionEnded')

  // Cleanup the user's session
  res.end()
})

/*
Pre and Post request
--------------------------------------- */
app.pre((req, res, type) => {
  if (Config.get('skill.id').indexOf(req.applicationId()) === -1) {
    Debug('Invalid applicationId')
    res.say(res.msg.ERR_INVALID_APPLICATION_ID).send()
  } else if (!Utils.auth.loggedIn(req) && req.intent() !== 'AMAZON.HelpIntent') {
    Debug('User is not authenticated')
    res.say(res.msg.ERR_LOGGED_OUT)
    res.linkAccount().send() // Return the account linking card
  }
})

app.post((req, res, type, exception) => {
  if (exception) {
    Debug('Exception', exception)
    // Always turn an exception into a successful response
    res.say(res.msg.EXCEPTION).end()
  }
})

/*
Export the handler
--------------------------------------- */
module.exports = {
  app,
  // EC2
  handler: (req, res) => {
    app.request(req.body).then(response => {
      res.json(response)
    }, response => {
      res.status(500).send('Server Error')
    })
  }
  // Lambda
  // handler: (event, context, callback) => {
  //   app.request(event.request).then(response => {
  //     callback(null, response)
  //   })
  //   .catch(response => {
  //     callback(response)
  //   })
  // }
}
