import { loadMissions } from '@context/missions';

export default async function handler(_req, res) {
  const missions = await loadMissions();

  res.status(200).json(missions);
}
