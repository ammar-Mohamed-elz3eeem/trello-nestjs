# trello-clone

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#steps-to-run-this-on-your-local)
- [Tech Stack](#tech-stack)
- [Endpoints](#Endpoints)

## Overview

This is a clone application for trello. This has been built for learning purpose.

## Features 🤩

- Login/Register with JWT token authentication
- Ability to create/update/delete the board
- Ability to add/update/move/delete the card
- Background image library for the board
- Add labels to the card
- Supports adding of detail description in the card
- Invite user to the board
- Assign a card to the user

## Requirements

1. [Node.js](https://nodejs.org/)
2. [npm](https://www.npmjs.com/)

## Steps to run this on your local

First install the MongoDB Compass for better visualization of data with MongoDB server.

1. Clone this repo using `git clone https://github.com/knowankit/trello-clone.git`
2. Create _.env_ and add this env variable `LOCAL_MONGODB=mongodb://localhost:27017/trello`
    Add `JWT_SECRET_KEY=randomstrings`
    Add `MONGODB_URI=mongodb://localhost:27017/trello`
    Add `NODE_ENV=production`
    Add `MONGODB_DB=trello`
3. Run `npm install`
4. Run `npm run start`

## Tech Stack
- node.js
- NestJs
- express
- mongodb

## Endpoints

- /auth
  - POST /login authenticate user in website -> data { email, password }
  - POST /register add new user to website -> data { email, password, confirm_password, fullName }
  - POST /logout remove current session for logged in user
  - GET /me current logged in user (this request reqires credentials from frontend)

- /boards
  - POST / -> add new board to website data { name, dateCreated, backgroundImage } (this request reqires credentials from frontend)

  - GET / -> get all boards for the current logged in user

  - GET /:slug -> get only one board from boards which _id = slug

  - PUT /:slug -> edit board which _id = slug -> data { _id, name, backgroundImage } (this request reqires credentials from frontend)

  - DELETE /:slug -> delete board which _id = slug (this request reqires credentials from frontend)

- /boards/:boardSlug/cards/

  - GET / get all cards associated with board which _id = boardSlug

  

- /boards/:boardSlug/columns/

  - GET / get all columns associated with board which _id = boardSlug
