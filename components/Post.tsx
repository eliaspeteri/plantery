import React from 'react';
import { Post } from '../types';
import styles from '../styles/Post.module.css';

interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.user}>
          {post?.createdBy?.name || 'Default User'}
        </div>
        <div>
          Last seen{' '}
          {post?.createdBy?.lastLoggedIn.toLocaleDateString() || 'today'}
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{post?.postTitle || 'Title'}</h1>
        <p className={styles.message}>{post?.message || 'Message'}</p>
        {post.message}
      </div>
    </div>
  );
};

export default Post;
