# Discordbot

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 16.16.0

# Getting started

1. Clone the repository

```
git clone https://github.com/kaizhilam/discordbot.git
```

2. Install dependencies

```
cd discordbot
npm install
```

3. Add `.env` to `packages/server`

```
PORT=3000
```

4. Run the project

```
npm start
```

Navigate to `http://localhost:3000`

# Building the project

1. Run build script

```
npm run build
```

2. The build files will be in their respected location

| Build    | Location                  |
| -------- | ------------------------- |
| Frontend | `packages/frontend/build` |
| Server   | `packages/server/dist`    |

# NPM scripts

| Npm script | Description                     |
| ---------- | ------------------------------- |
| `start`    | Runs frontend and server        |
| `build`    | Builds both server and frontend |
| `clean`    | Removes all `node_modules`      |

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
