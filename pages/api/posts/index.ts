import { NextApiRequest, NextApiResponse } from 'next';
import PostModel from '../../../models/post';
import { Post, NewPost } from '../../../types';
import logger from '../../../utils/logger';

export async function getPosts(): Promise<Post[]> {
  const posts = await PostModel.find({});
  return posts;
}

export async function getPost(id: string) {
  const post = await PostModel.find({ id: id });
  return post;
}

export async function newPost(postObject: NewPost) {
  const post = new PostModel(postObject);
  await post.save();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      try {
        const data: Post[] = await getPosts();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: (error as any).message });
      }
      break;
    }
    case 'POST': {
      try {
        const { createdBy, postTitle, message, category } = req.body;
        const data = await newPost({
          createdAt: new Date(),
          createdBy: createdBy,
          postTitle: postTitle,
          message: message,
          category: category
        });
        res.status(200).json(data);
      } catch (error) {
        logger.error((error as any).message);
        res.json({ error: (error as any).message });
      }
      break;
    }
  }
}
