import loadActivityByUser from '@netlify/activity-hub/load';

export default async function handler(req, res) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).send('Unauthorized');
    return;
  }

  const data = await fetch('https://api.netlify.com/api/v1/user', {
    headers: { authorization },
  }).then((response) => response.json());

  const activity = await loadActivityByUser({
    userId: data.id,
    app: 'jamstack-explorers',
  });

  const activeDates = activity
    .filter((a) => a.type === 'video-progress')
    .reduce((dates, entry) => {
      const date = new Date(entry.timestamp);
      const offset = date.getTimezoneOffset();
      const updated = new Date(date.getTime() - offset * 60 * 1000);
      const [dateKey] = updated.toISOString().split('T');

      dates[dateKey] = new Set([
        ...(dates[dateKey] || []),
        entry.event_data.videoId,
      ]);

      return dates;
    }, {});

  const updates = Object.entries(activeDates).map(([date, videoIdSet]) => {
    return [date, [...videoIdSet].length];
  });

  const userData = {
    activeDates: Object.fromEntries(updates),
  };

  // const userdata = {
  //   accredidationProgress: 0.34,
  //   activeDates: {
  //     '2017-05-13': 2,
  //     '2017-05-14': 5,
  //     '2017-05-15': 4,
  //     '2017-05-16': 6,
  //     '2017-05-17': 1,
  //     '2017-05-18': 4,
  //   },
  //   skills: [
  //     {
  //       data: {
  //         jamstack: 0.4,
  //         react: 0.65,
  //         vue: 0.9,
  //         angular: 0.67,
  //         netlify: 0.8,
  //       },
  //       meta: { color: 'rgba(255, 68, 149, 0.7)' },
  //     },
  //     {
  //       data: {
  //         jamstack: 1,
  //         react: 0.9,
  //         vue: 0.5,
  //         angular: 0.6,
  //         netlify: 0.7,
  //       },
  //       meta: { color: 'rgba(170, 77, 232, 0.7)' },
  //     },
  //   ],
  //   userCourses: [
  //     {
  //       title: 'Vue and Nuxt',
  //       instructor: 'Sarah Drasner',
  //       coverImage:
  //         'https://cdn.sanity.io/images/q8efilev/production/e4313495f322e448fec7f41b833b0dabb3799178-800x714.jpg',
  //       progress: 0.6,
  //     },
  //     {
  //       title: 'Next and React',
  //       instructor: 'Cassidy Williams',
  //       coverImage:
  //         'https://cdn.sanity.io/images/q8efilev/production/e4313495f322e448fec7f41b833b0dabb3799178-800x714.jpg',
  //       progress: 0.3,
  //     },
  //   ],
  // };

  res.status(200).json({
    ...data,
    activity: userData,
  });
}
