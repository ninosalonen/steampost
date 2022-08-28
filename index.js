require('dotenv').config()
const cfg = require('./config.json')
const puppeteer = require('puppeteer')
const { delay, parseCfg, printTime } = require('./helpers')

const USERNAME = process.env.STEAM_USER
const PASS = process.env.STEAM_PASS
const GUARD = process.env.STEAM_GUARD

const main = async () => {
  if (!parseCfg(cfg, USERNAME, PASS, GUARD)) {
    return
  }
  console.log('Starting Steampost!')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://store.steampowered.com/login/')

  try {
    console.log(`Logging in ${USERNAME}...`)
    await page.type(
      '#responsive_page_template_content > div > div:nth-child(1) > div > div > div > div.newlogindialog_FormContainer_3jLIH > div > form > div:nth-child(1) > input',
      USERNAME
    )
    await page.type(
      '#responsive_page_template_content > div > div:nth-child(1) > div > div > div > div.newlogindialog_FormContainer_3jLIH > div > form > div:nth-child(2) > input',
      PASS
    )
    await page.click(
      '#responsive_page_template_content > div > div:nth-child(1) > div > div > div > div.newlogindialog_FormContainer_3jLIH > div > form > div.newlogindialog_SignInButtonContainer_14fsn > button'
    )
    await page.waitForTimeout(5000) // Change for better
    for (let i = 0; i < 5; i++) {
      await page.type(
        `#responsive_page_template_content > div > div:nth-child(1) > div > div > div > div.newlogindialog_FormContainer_3jLIH > form > div > div.newlogindialog_FlexCol_1mhmm.newlogindialog_AlignItemsCenter_30P8x > div > input[type=text]:nth-child(${
          i + 1
        })`,
        GUARD[i]
      )
    }
  } catch {
    console.log(
      'Something went wrong when logging you in, please check your USERNAME and PASS.'
    )
    await browser.close()
    return
  }

  try {
    await page.waitForNavigation()
  } catch {
    console.log('Your GUARD was probably incorrent, please try again.')
    await browser.close()
    return
  }

  console.log('Successfully logged in!')
  console.log('Posting to groups...')
  const { groups } = cfg

  while (true) {
    printTime()
    for (const group of groups) {
      const groupName = group.split('/').pop()
      try {
        await page.goto(`${group}/memberslistxml/?xml=1`, {
          waitUntil: 'domcontentloaded',
        })
        const idElement = await page.$(
          '#folder0 > div.opened > div:nth-child(2) > span:nth-child(2)'
        )
        const id = await page.evaluate(
          (element) => element.innerHTML,
          idElement
        )
        await page.goto(group, { waitUntil: 'domcontentloaded' })
        await page.type(`#commentthread_Clan_${id}_textarea`, cfg.message)
        await page.click(`#commentthread_Clan_${id}_submit`)
        console.log(`Successfully posted to ${groupName}`)
      } catch {
        console.log(`Something went wrong while posting to group ${groupName}`)
        throw new Error('Unable to post, try restarting.')
      }
    }
    await delay(cfg.minutes)
  }
}

main()
