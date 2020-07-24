# GitHub Jobs App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Majority of code was done by following a guest tutorial by Web Dev Simplified on Traversy Media's YoutTube channel:
* Tutorial: https://www.youtube.com/watch?v=fxY1q4SCB64
* Web Dev Simplified's Channel: https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw
* Travery Media's Channel: https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA

The one small difference is that I used Netlify Functions to get around the CORs issues with using
the GitHub API versus the [CORs Anywhere Proxy](https://cors-anywhere.herokuapp.com/) approach used in the tutorial

In order to test Netlify Functions, make sure to use Netlify Dev.

## Available Commands

Package installation:

```bash
yarn install
```

Development Server:
```bash
yarn run start
```

Netlify Development Server:
```bash
ntl dev
```

Production Build
```bash
yarn run build
```