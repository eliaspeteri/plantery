// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  links: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    res.json({
      links: [
        `${process.env.ROOT}/api/plants`,
        `${process.env.ROOT}/api/posts`,
        `${process.env.ROOT}/api/users`
      ]
    });
  }
}
