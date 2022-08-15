# Kauppiasscript

## Requirements

- Some version of node idk...

## Installation

1. `npm install` in the root
2. `.env` file needed in the root with Steam credentials: USERNAME and PASS

## How to use

1.  Customize the script to fit your needs.
2.  Run: `GUARD=FOO123 node index.js`, where GUARD is your Steam guard code.

## Customizing the script

- Change the COMMENT variable inside index.js to what you would like to post.
- Change the MINUTES variable inside index.js to change the time gap between posts.
- Add, remove or change the Steam groups.
  - Adding a new group inside the index.js file:
  - `const page_n = await browser.newPage()`
  - `await page_n.goto("steamGroupUrl")`
  - You should do this after the `console.log('Opening new tabs and steam groups...')`
  - Add `await kauppiasScript('steamGroupId', page_n)` inside the while loop.
