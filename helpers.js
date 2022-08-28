const delay = (minutes) =>
  new Promise((res) => setTimeout(res, minutes * 60000))

const parseCfg = (cfg, USERNAME, PASS, GUARD) => {
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

module.exports = {
  delay,
  parseCfg,
  printTime,
}
