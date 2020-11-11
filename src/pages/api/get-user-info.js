import loadActivityByUser from '@netlify/activity-hub/load';
import { loadMissionBySlug } from '@context/missions';

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

  const completedVideoPaths = activity
    .filter((a) => a.type === 'video-complete')
    .map((video) => video.event_data.path)
    // filter for unique array entries
    .filter((path, i, paths) => paths.findIndex((p) => p === path) === i);

  const activeMissionsPromises = completedVideoPaths.map((video) => {
    const [, , missionSlug] = video.split('/');
    return loadMissionBySlug(missionSlug);
  });

  // load missions in parallel by awaiting promises here instead of in the map
  const activeMissions = await Promise.all(activeMissionsPromises);

  // figure out how much of each mission is completed
  const userMissions = activeMissions
    .filter((m) => m?._id) // only keep valid missions
    // filter for unique array entries
    .filter((mission, i, missions) => {
      return missions.findIndex((m) => m._id === mission._id) === i;
    })
    .map((mission) => {
      const missionSlug = mission.slug.current;
      const totalStages = mission.stages.length;
      const completedStages = completedVideoPaths.filter((v) =>
        v.match(missionSlug)
      ).length;

      return {
        title: mission.title,
        instructor: mission.instructor.name,
        coverImage: mission.coverImage.asset.url,
        progress: completedStages / totalStages,
      };
    });

  // for now we’re hard-coding that ANY 3 completed missions earn a certificate
  const completedMissions = userMissions.filter((m) => m.progress === 1).length;
  const certificateProgress = (completedMissions / 3).toFixed(2);

  // TODO radar chart data once we have tags
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

  res.status(200).json({
    ...data,
    activity: {
      activeDates: Object.fromEntries(updates),
      userMissions,
      certificateProgress,
    },
  });
}
