const nodemailer = require('nodemailer')
const cfg = require('./config.json')

const USERNAME = process.env.STEAM_USER
const PASS = process.env.STEAM_PASS
const GUARD = process.env.STEAM_GUARD

const delay = (minutes) =>
  new Promise((res) => setTimeout(res, minutes * 60000))

const parseCfg = () => {
  if (!USERNAME || !PASS || !GUARD) {
    console.log('Missing env variables')
    return false
  }
  if (GUARD.length != 5) {
    console.log('The length of your STEAM_GUARD was wrong, should be 5')
    return false
  }
  if (!cfg.minutes || !cfg.groups || !cfg.message) {
    console.log('Please provide a valid cfg file')
    return false
  }
  const MINUTES = parseInt(cfg.minutes)
  if (isNaN(MINUTES) || MINUTES < 1) {
    console.log('Minutes has to be a number and greater than 0')
    return false
  }
  if (cfg.groups.length < 1) {
    console.log(
      'Please put at least 1 group in the "groups" field at config.json'
    )
    return false
  }
  return true
}

const printTime = () => {
  const today = new Date()
  const date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
  const time = today.getHours() + ':' + today.getMinutes()
  const dateTime = time + ', ' + date

  console.log(`Posting to groups at ${dateTime}`)
}

const sendEmail = (EMAIL, EMAIL_PASSWORD) => {
  const transporter = nodemailer.createTransport({
    service: cfg.service,
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: EMAIL,
    to: EMAIL,
    subject: 'Steampost is down!',
    text: 'Steampost just went down, you need to restart it.',
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = {
  delay,
  parseCfg,
  printTime,
  sendEmail,
}
