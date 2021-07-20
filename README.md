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

### Frontend

The frontend is a Next site. Environment variable are set in Netlify, so work with Netlify Dev for easier local development.

#### Requirements

- [Node.js](https://nodejs.org/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation)

#### Installation

1. Install Node.
1. Clone the repo.
    ```sh
    git clone git@github.com:netlify/explorers.git
    cd explorers/
    ```
1. Install project packages.
    ```sh
    npm install
    ```

#### Configuration

Add the following environment variable to a `.env` file at the project root:

```
NEXT_PUBLIC_SANITY_GRAPHQL_URL=https://q8efilev.api.sanity.io/v1/graphql/production/default
```

This is a read-only GraphQL API to pull Jamstack Explorers missions, stages, and other data.

#### Usage

Start the server for local development:

```sh
npm run dev
```

The browser will open at `http://localhost:8888`.

### OAuth

Right now the OAuth is set up to run through the production site, so you _do not_ need to set up local OAuth.

If you want to try it out, you can [create a new OAuth app](https://app.netlify.com/user/applications) with a redirect URL of `http://localhost:8888/.netlify/functions/auth-callback` to allow local OAuth flows and testing.

See `.env.EXAMPLE` for the required env vars.

### Sanity

See [the backend README](/backend/README.md) for details on the Sanity setup for this project.

### Code Formatting With Prettier

We have a prettier pre-commit hook. To run formatting on the command line:

```sh
npm run format
```

### Certificate Generation

Certificate generation is managed through a [private repo](https://github.com/sdras/az-certificate). If you’re a project maintainer, you’ll need an invite to view it.

## How to commit to this repo!

See our [contributing guidelines](/CONTRIBUTING.md) for more info about getting involved!

## How to contribute mission!

Thinking about a technology or best practice that you would like to share with the community? Check out our [Content Contribution Guide](https://www.notion.so/netlify/Content-Contribution-Guide-7e8c17246a524dec85ffe9525084403c) to learn how ✲ ﾟ｡.(✿╹◡╹)ﾉ ☆.｡₀:_ﾟ ✲ ﾟ_:₀｡
