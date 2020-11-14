const TWITTER_DOMAIN = 'twitter.com/';

export const findTwitterUrl = (urlList) => {
  return urlList.find((url) => url.includes(TWITTER_DOMAIN));
};

export const parseTwitterHandle = (url) => {
  if (url.includes(TWITTER_DOMAIN)) {
    const startIndex = url.indexOf(TWITTER_DOMAIN);
    const domainLength = TWITTER_DOMAIN.length;

    return url.slice(startIndex + domainLength);
  }
};
