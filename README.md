# Steampost

## Requirements

- Some version of node

## Installation

1. `npm install` in the root
2. `.env` file needed in the root with Steam credentials: USERNAME and PASS

## How to use

1.  Customize the config.json file to fit your needs.
2.  Run: `GUARD=FOO12 node index.js`, where GUARD is your Steam guard code.

## Customizing config.json

- `minutes` decides the time gap between posts.
- `message` is what you would like to post.
- `groups` holds the list of groups to post to.
  - You need to be a member of these groups!
