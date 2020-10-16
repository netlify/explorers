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

#### Prerequisite

- [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation)

#### Instructions

```bash
# clone the repo
git clone git@github.com:netlify/explorers.git

# move into the new project
cd explorers/

# install dependencies
npm install
```

Add the following env vars to `.env` at the project root:

```
NEXT_PUBLIC_SANITY_GRAPHQL_URL=https://q8efilev.api.sanity.io/v1/graphql/production/default
```

Start the site locally:

```sh
# start the site for local development
npm run dev
```

The site will open at `http://localhost:8888`.

### OAuth

Right now the OAuth is set up to run through the production site, so you _do not_ need to set up local OAuth.

If you want to try it out, you can [create a new OAuth app](https://app.netlify.com/user/applications) with a redirect URL of `http://localhost:8888/.netlify/functions/auth-callback` to allow local OAuth flows and testing.

See `.env.EXAMPLE` for the required env vars.

### Sanity

**NOTE:** You _only_ need to get Sanity running locally if you need to make changes to the Sanity schema. Otherwise you can ignore this section for local development.

```bash
# install the Sanity CLI if you don’t have it already
npm i -g @sanity/cli

# go into the Sanity folder
cd backend/

# install sanity into the project
sanity install

# start the studio
sanity start
```

> **NOTE:** you don’t have to run the studio locally during development. You _only_ need to run the studio locally if you’re making changes to the data schema.

After making changes, you need to deploy both the studio and the GraphQL API.

```sh
sanity deploy
sanity graphql deploy
```

## To Format Correctly

We have a prettier pre-commit hook. To run formatting on the command line:

```sh
npm run format
```

## How to commit to this repo!

- We use the following branch convention:

  ```
  // Structure
  <initials>/<issue #>/<title of issue camelcase>

  // Example
  sd/coolFeature
  tzm/13/fixesThing
  ```

- Everything needs to be a pull request — no direct commits to `main`
- PRs are merged with squash merges only and use [conventional commits](https://github.com/commitizen/cz-cli#if-your-repo-is-commitizen-friendly) for easier changelog generation
- All PRs need to be approved by one of the CODEOWNERS
