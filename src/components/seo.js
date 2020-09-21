import Head from 'next/head';

export function SEO({
  title = 'Jamstack Explorers',
  description = 'It’s not flying; it’s FTP with style!',
  url = 'https://explorers.netlify.com/',
  image = 'https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?q=85&fm=jpg&fit=crop&w=1600&h=800',
  creator = '@netlify',
}) {
  return (
    <Head>
      <title key="title">{title}</title>
      <link key="canonical" rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      <meta name="og:type" property="og:type" content="website" />
      <meta name="og:url" property="og:url" content={url} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta name="og:image" property="og:image" content={image} />

      <meta name="twitter:dnt" content="on" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={creator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
