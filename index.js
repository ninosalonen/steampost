require('dotenv').config()
const cfg = require('./config.json')
const puppeteer = require('puppeteer')
const { delay, parseCfg } = require('./helpers')

const USERNAME = process.env.USERNAME
const PASS = process.env.PASS
const GUARD = process.env.GUARD

const main = async () => {
  if (!parseCfg(cfg, USERNAME, PASS, GUARD)) {
    return
  }
  console.log('Starting Steampost!')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://steamcommunity.com/login/')

  try {
    console.log(`Logging in ${USERNAME}...`)
    await page.type('#input_username', USERNAME)
    await page.type('#input_password', PASS)
    await page.click('#login_btn_signin > button')
    await page.waitForTimeout(6000)
    await page.click('#rejectAllButton')
    await page.type('#twofactorcode_entry', GUARD)
    await page.click(
      '#login_twofactorauth_buttonset_entercode > div.auth_button.leftbtn'
    )
  } catch (e) {
    console.log(
      'Something went wrong when logging you in, please check your USERNAME and PASS.'
    )
    await browser.close()
    return
  }

  try {
    await page.waitForNavigation()
  } catch (e) {
    console.log('Your GUARD was probably incorrent, please try again.')
    await browser.close()
    return
  }
  console.log('Successfully logged in!')

  const { groups } = cfg

  while (true) {
    groups.forEach(async (group) => {
      const groupName = group.split('/').pop() || group
      console.log(`Posting to group ${groupName}...`)
      try {
        const groupPage = await browser.newPage()
        await groupPage.goto(`${group}/memberslistxml/?xml=1`)
        await groupPage.waitForNavigation
        const idElement = await groupPage.$(
          '#folder0 > div.opened > div:nth-child(2) > span:nth-child(2)'
        )
        const id = await groupPage.evaluate((el) => el.innerHTML, idElement)
        await groupPage.goto(group)
        await groupPage.waitForNavigation
        await groupPage.type(`#commentthread_Clan_${id}_textarea`, cfg.message)
        await groupPage.click(`#commentthread_Clan_${id}_submit`)
        console.log(`Successfully posted on ${groupName}!`)
        await groupPage.close()
      } catch (e) {
        console.log(
          `Something went wrong while posting to group ${groupName} :/`
        )
      }
    })
    await delay(cfg.minutes)
  }
}

main()
