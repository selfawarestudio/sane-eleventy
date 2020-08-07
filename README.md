# sane-eleventy ![Prerequisite](https://img.shields.io/badge/node-12.18.2-red.svg) ![Prerequisite](https://img.shields.io/badge/yarn-1.22.4-blue.svg)

> Repo template for [Sanity](https://sanity.io) + [Eleventy](https://11ty.dev) projects at [Self Aware](https://selfaware.studio)

## 📖 About

- Eleventy front-end lives in the [`web`](web) directory
- Templates are authored in the [`web/src/templates`](web/src/templates) directory using any template language supported by eleventy (Nunjucks by default)
- Eleventy global data files live in [`web/src/data`](web/src/data).
- Styles are authored using Sass and live in [`web/src/styles`](web/src/styles). Our utility-first styling library, [wool](https://github.com/selfawarestudio/wool) is included by default and can be configured via [`web/src/styles/_config.scss`](web/src/styles/_config.scss)
- JavaScript lives in [`web/src/scripts`](web/src/scripts)
- Place font and favicon files in their respective folders in [`web/src/assets`](web/src/assets).
- Netlify serverless functions are authored in [`web/src/functions`](web/src/functions)
- Place any eleventy related utilities in [`web/src/util`](web/src/functions)
- Sanity Studio lives in the [`studio`](studio) directory

## ✨ Install

```sh
# Ensure correct Node and NPM versions are installed using NVM
nvm install

# Install Yarn
npm i -g yarn

# Install project dependencies using yarn
yarn
```

## 👩🏻‍💻 Usage

To set up with Sanity, you will need to set your Sanity `projectId` and `dataset` in two places:

1. [`studio/sanity.json`](studio/sanity.json)
2. [`web/src/util/client.js`](web/src/util/client.js)

### Development

```sh
# Start Netlify dev server
yarn dev

# Start Sanity dev server
yarn start:studio
```

### Production

```sh
# Build front-end for production
yarn build
```

### Deployment

```sh
# Deploy front-end using Netlify CLI
yarn add netlify-cli -g
netlify init
netlify deploy

# Deploy Sanity Studio
yarn deploy:studio
```

## 🖼️ Showcase

The following sites are powered by sane-eleventy:

- [Off Season](https://offseasoncreative.com)
- [MIT Digital Humanities](https://digitalhumanities.mit.edu)
- More coming soon!

## 💡 Inspiration

Thanks to [sane-shopify](https://github.com/good-idea/sane-shopify) for the name inspiration 🙂

## 🧾 License

MIT
