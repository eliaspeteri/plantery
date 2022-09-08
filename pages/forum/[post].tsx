import { useRouter } from 'next/router';
import React from 'react';
import { Post } from '../../types';
import { getPost } from '../api/posts';

import PostComponent from '../../components/Post';
import Comment from '../../components/Comment';
import Button from '../../components/Button';
import { HiArrowLeft } from 'react-icons/hi';

interface Props {
  post: Post;
}

const PostPage = ({ post }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => router.push('/forum')}
        style={{ margin: '2vh', padding: '2vh 3vw' }}
      >
        <HiArrowLeft />
      </Button>
      <PostComponent post={post} />
      {post?.comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default PostPage;

export async function getServerSideProps({
  req,
  res,
  query
}): Promise<{ props: { post: {} } }> {
  const { id } = query;
  let post = {};
  if (id) post = await getPost(id);
  return {
    props: {
      post
    }
  };
}
