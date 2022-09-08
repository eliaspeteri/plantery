import React from 'react';

import styles from '../styles/Comment.module.css';
import { Comment } from '../types';

interface Props {
  comment: Comment;
}

const Comment = ({ comment }: Props) => {
  return (
    <p className={styles.message} key={comment.id}>
      {comment.message}
    </p>
  );
};

export default Comment;
