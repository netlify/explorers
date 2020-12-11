# Sanity Setup and Development

If you’re running this project locally to learn and/or build your own version, you’ll need your own Sanity instance!

Check out [Sanity’s docs](https://www.sanity.io/docs) to learn how to create and configure your own Sanity instance.

## Developing with Sanity

**NOTE:** You _only_ need to get Sanity running locally if you need to make changes to the Sanity schema. Otherwise you should use the hosted version of the Sanity backend for content management.

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

> **REMINDER:** you don’t have to run the studio locally during development. You _only_ need to run the studio locally if you’re making changes to the data schema.

After making changes, you need to deploy both the studio and the GraphQL API.

```sh
sanity deploy
sanity graphql deploy
```

## Additional Resources

More links about Sanity:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- Check out the example frontend: [React/Next.js](https://github.com/sanity-io/tutorial-sanity-blog-react-next)
- [Read the blog post about this template](https://www.sanity.io/blog/build-your-own-blog-with-sanity-and-next-js?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
