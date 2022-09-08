import { NextApiRequest, NextApiResponse } from 'next';
import PostModel from '../../../models/post';
import { Post, NewPost } from '../../../types';

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
  if (req.method === 'GET') {
    try {
      const data: Post[] = await getPosts();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  } else if (req.method === 'POST') {
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
      res.status(500).json({ error: (error as any).message });
    }
  }
}
