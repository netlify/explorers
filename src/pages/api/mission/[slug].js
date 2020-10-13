import { loadMissionBySlug } from '@context/missions';

export default async function handler(req, res) {
  const { slug } = req.query;
  const mission = await loadMissionBySlug(slug);

  res.status(200).json(mission);
}
