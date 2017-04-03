module.exports = {
  WELCOME: `{intro}. <break time='100ms'/> Do you wanna know your NPS from the last 30 days?`,
  UNKNOWN: `Hmm <break time='1s'/> I didn't understand that. <break time='500ms'/>`,
  METRICS: `Your NPS is {nps} based on {response_count} responses. <break time='1s'/> {promoter_percent} percent promoters, {detractor_percent} percent detractors and {passive_percent} percent passives.`,

  // Cards
  CARD_METRICS_TITLE: `Metrics`,
  CARD_METRICS_BODY: `Your NPS is {nps} based on {response_count} responses. {promoter_percent}% promoters ({promoter_count}), {detractor_percent}% detractors ({detractor_count}) and {passive_percent}% passives ({passive_count}).`,

  // Default
  OK: `Ok.`,
  STOP: `Goodbye.`,
  HELP: `You can say: What's my NPS?... You can also say, stop, if you're done.`,
  HELP_REPROMPT: `What can I help you with?`,
  YES_OR_NO: `Please anwser "Yes" or "No"`,

  // Exceptions
  EXCEPTION: `I'm sorry, an error occured`,
  EXP_GET_METRICS: `I'm sorry, I'm having trouble with this request. Do you wanna try again?`,

  // Errors
  ERR_CANT_REPEAT: `I'm sorry, I can't repeat.`,
  ERR_INVALID_APPLICATION_ID: `Invalid application`,
  ERR_LOGGED_OUT: `Your Delighted account is not linked. Please, open the Alexa app and login to your Delighted account.`
}
