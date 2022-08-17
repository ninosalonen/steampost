# Steampost

## Requirements

- Some version of node

## Installation

1. `git clone https://github.com/ninosalonen/steampost`
2. `npm install` in the root

## Required env variables
- STEAM_USER (steam username)
- STEAM_PASS (steam password)
- STEAM_GUARD (steam guard code)

## How to use

1.  Customize the config.json file to fit your needs.
2.  Run: `node index.js`, where GUARD is your Steam guard code.

## Customizing config.json

- `minutes` decides the time gap between posts.
- `message` is what you would like to post.
- `groups` holds the list of groups to post to.
  - You need to be a member of these groups!

## Troubleshooting

### Error: Failed to launch the browser process
Change `const browser = await puppeteer.launch()` in index.js to point at a specific location where chromium is installed:
```
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium-browser'
})
```
