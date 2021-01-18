const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_PHONE_NUMBER

const Twilio = require('twilio')
const client = new Twilio(accountSid, authToken)

client.messages.create({
  body: 'Reminder: Your Social Security workshop is tomorrow at 5:00pm',
  to: '+17273071923',
  from: twilioNumber
})
.then((message) => console.log(message.sid))