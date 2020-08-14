<h1 align="center">
  🚀👩‍🚀👨‍🚀<br />
  Jamstack Explorers
</h1>
<p align="center">Presented by Netlify</p>

Ground Control to Major Tom  
Ground Control to Major Tom  
Check your Lighthouse scores and put your `<Helmet />` on  
Ground Control to Major Tom  
Commencing countdown, dark mode on  
Check your build logs and why didn’t you use Vue?  

This is Ground Control to Major Tom  
Your pull request looks great  
And the Twitters want to know whose theme you use  
Now it's time to tell us what’s the font you choose  

This is Major Tom to Ground Control  
I'm shipping to the cloud  
Point-three seconds to my first contentful paint  
GitHub stars feel very different today  
For here  
Am I copying solutions  
From Stack Overflow  
And there’s nothing I can do  

## Local Development

### Front-End

The frontend is a Next site. Env vars are in Netlify, so work with Netlify Dev for easier local development.

```bash
# clone the repo
git clone git@github.com:netlify/explorers.git

# move into the new project
cd explorers/

# install dependencies
npm install

# start the site with Netlify Dev
ntl dev
```

### Sanity

```bash
# install the Sanity CLI if you don’t have it already
npm i -g @sanity/cli

# go into the Sanity folder
cd backend/

# start the studio
sanity start
```

> **NOTE:** you don’t have to run the studio locally during development. You _only_ need to run the studio locally if you’re making changes to the data schema.

After making changes, you need to deploy both the studio and the GraphQL API.

```bash
sanity deploy
sanity graphql deploy
```

## How to commit to this repo!

- We use the following branch convention:
      tzm/13/fixesThing
      <initials>/<issue #>/<title of issue camelcase>

- Everything needs to be a pull request — no direct commits to `main`
- PRs are merged with squash merges only and use [conventional commits](https://github.com/commitizen/cz-cli#if-your-repo-is-commitizen-friendly) for easier changelog generation
- All PRs need to be approved by one of the CODEOWNERS