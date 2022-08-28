

# Steampost

  

## Requirements

  

- Some version of node

  

## Installation

  

1.  `git clone https://github.com/ninosalonen/steampost`

2.  `npm install` in the root
  

## How to use

  

1. Create a `config.json` file in the root of the project with the following template:

```
{
    "minutes": 30,
    "message": "Your message here",
    "groups": [ 
        "https://steamcommunity.com/groups/foo",
        "https://steamcommunity.com/groups/bar"
    ]
}

```
- `minutes` is the delay between posts.
- `message` is what you would like to post. 
- `groups` holds the list of groups you would like to post to.

2. Store the the required env variables in a `.env` file or use the CLI

Using the CLI:
- Define the env variables before `node index.js` when running the program
`STEAM_USER="user" STEAM_PASS="pass" STEAM_GUARD="12345" node index.js`

Using a .env file:
- Create a `.env` file in the root of the project

```
STEAM_USER="username"
STEAM_PASS="password"
STEAM_GUARD="12345"
```

- Now you can run the program by typing `node index.js`


## Troubleshooting

  

### Error: Failed to launch the browser process

  

Change `const browser = await puppeteer.launch()` in index.js to point at a specific location where chromium is installed:

```

const browser = await puppeteer.launch({

    executablePath: '/usr/bin/chromium-browser'

})

```
