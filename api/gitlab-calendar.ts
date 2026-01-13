import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const username = 'elmer_abeha';
  const token = process.env.GITLAB_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'GITLAB_TOKEN not configured' });
  }

  try {
    const response = await fetch(`https://gitlab.com/users/${username}/calendar.json`, {
      headers: {
        'PRIVATE-TOKEN': token,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'GitLab API error' });
    }

    const data = await response.json();

    // Cache por 1 hora
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch GitLab data' });
  }
}
