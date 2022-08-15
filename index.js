require('dotenv').config()
const puppeteer = require('puppeteer')
const { delay } = require('./helpers')

const USERNAME = process.env.USERNAME
const PASS = process.env.PASS
const GUARD = process.env.GUARD

// CHANGE THE COMMENT HERE!!!
const COMMENT = 'MY MESSAGE TO STEAM GROUPS'

// CHANGE THE POSTING INTERVAL HERE!!!
const MINUTES = 30

const kauppiasScript = async (id, page) => {
  try {
    await page.waitForTimeout(6000)
    await page.type(`#commentthread_Clan_${id}_textarea`, COMMENT)
    await page.click(`#commentthread_Clan_${id}_submit`)
    console.log(`Successfully posted on ${id}`)
  } catch (e) {
    console.log(
      `Something went wrong when posting to ${id}, please try again :/`
    )
  }
}

const main = async () => {
  console.log('Starting kauppiasscript!')
  const browser = await puppeteer.launch()
  const page1 = await browser.newPage()
  await page1.goto('https://steamcommunity.com/login/')

  try {
    console.log(`Logging in ${USERNAME}...`)
    await page1.type('#input_username', USERNAME)
    await page1.type('#input_password', PASS)
    await page1.click('#login_btn_signin > button')
    await page1.waitForTimeout(6000)
    const submitElem = await page1.$(
      '#login_twofactorauth_buttonset_entercode > div.auth_button.leftbtn'
    )
    await page1.click('#rejectAllButton')
    await page1.type('#twofactorcode_entry', GUARD)
    await submitElem.click()
  } catch (e) {
    console.log(
      'Something went wrong logging you in, please check your USERNAME and PASS.'
    )
    await browser.close()
    return
  }

  try {
    await page1.waitForNavigation()
  } catch (e) {
    console.log('Your GUARD was probably incorrent, please try again.')
    await browser.close()
    return
  }

  console.log('Opening new tabs and Steam groups...')
  await page1.goto('https://steamcommunity.com/groups/tradecenter2016')

  /* 
    ADD, REMOVE OR CHANGE STEAM GROUPS BELOW!
    You can also change the page1.goto URL

    const page_n = await browser.newPage()
    await page_n.goto("steamGroupUrl")
  */
  const page2 = await browser.newPage()
  await page2.goto('https://steamcommunity.com/groups/CSGOTrader')
  const page3 = await browser.newPage()
  await page3.goto('https://steamcommunity.com/groups/csgolounge')
  const page4 = await browser.newPage()
  await page4.goto('https://steamcommunity.com/groups/tradingcards')

  /* 
    To post to the added group, call kauppiasScript()
    with the Steam group's ID and page_n
    
    await kauppiasScript("123123123", page_n)
  */
  while (true) {
    console.log('Posting!')
    await kauppiasScript('103582791432884064', page1)
    await kauppiasScript('103582791434560775', page2)
    await kauppiasScript('103582791434670817', page3)
    await kauppiasScript('103582791434277245', page4)
    await delay(MINUTES)
  }
}

main()
