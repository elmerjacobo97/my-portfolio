import type { VercelRequest, VercelResponse } from '@vercel/node';

type GitLabEvent = {
  created_at: string;
  action_name: string;
};

type ContributionData = Record<string, number>;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = process.env.GITLAB_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'GITLAB_TOKEN not configured' });
  }

  try {
    // Obtener eventos del último año usando la API de eventos autenticada
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const afterDate = oneYearAgo.toISOString().split('T')[0];

    const contributions: ContributionData = {};
    let page = 1;
    const perPage = 100;
    let hasMore = true;

    // Paginar para obtener todos los eventos del año
    while (hasMore && page <= 20) {
      const url = `https://gitlab.com/api/v4/events?after=${afterDate}&per_page=${perPage}&page=${page}`;

      const response = await fetch(url, {
        headers: {
          'PRIVATE-TOKEN': token,
        },
      });

      if (!response.ok) {
        console.error('GitLab API error:', response.status, await response.text());
        break;
      }

      const events: GitLabEvent[] = await response.json();

      if (events.length === 0) {
        hasMore = false;
        break;
      }

      // Contar eventos por día
      for (const event of events) {
        const date = event.created_at.split('T')[0];
        contributions[date] = (contributions[date] || 0) + 1;
      }

      page++;

      // Si recibimos menos del máximo, no hay más páginas
      if (events.length < perPage) {
        hasMore = false;
      }
    }

    // Cache por 1 hora
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(contributions);
  } catch (error) {
    console.error('Error fetching GitLab data:', error);
    return res.status(500).json({ error: 'Failed to fetch GitLab data' });
  }
}
