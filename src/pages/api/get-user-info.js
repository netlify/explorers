export default async function handler(req, res) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).send('Unauthorized');
    return;
  }

  const data = await fetch('https://api.netlify.com/api/v1/user', {
    headers: { authorization },
  }).then((response) => response.json());

  res.status(200).json(data);
}
