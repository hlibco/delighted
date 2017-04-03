# Alexa Skills for Delighted

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

---

I wrote this project just for fun to implement the [alexa-bootstrap](https://github.com/hlibco/alexa-bootstrap) and serve as a kickoff for those who want to implement [Delighted](https://delighted.com) integrations via [Alexa](https://developer.amazon.com).

This project enables only 1 Skill Intent: Metrics. Feel free to add more integrations according to your needs and your PR is very welcome :)

To execute this project is required to have a developer account setup to develop [Alexa Skills](https://developer.amazon.com).

---

Checkout the project:
> git clone https://github.com/hlibco/delighted.git

Install dependencies:
> npm install

Setup environment:
- Update the file `.env` (used in development - this file is not committed.)

Create a string value for the variables:

```
ALEXA_SECRET_AUTH=...
ALEXA_SECRET_SESSION=...
```

Run in development mode:
> npm start

Run in staging mode:
> npm run staging

Run in production mode:
> npm run production

---

### Requirements
#### PM2

> npm i -g pm2

#### Lint
> yarn run lint
---

### Security
Audit dependencies to identify security vulnerabilities.

- `npm install -g retire nsp`
- `npm run check`
---

### Deployment
It's suggested to use PM2 Deployment.

The first time using it, the setup is needed:
> npm run deploy:staging:setup

For subsequent deployments:
`npm run deploy:staging`
or
`pm2 deploy ecosystem.config.js staging --force`

Help:
`pm2 deployment help`

Reference:
http://pm2.keymetrics.io/docs/usage/deployment/#deployment-options
---

### NGrok
NGrok provides a simple solution to tunnel HTTPS connection to your local machine.
In order to make it work, your server has to be up and running.

Install ngrok in the home directory ~/
> https://ngrok.com

Run ngrok exposing the port the Express server is running on (5000 default).
> ./ngrok http 3003
