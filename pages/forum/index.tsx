import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Category, Post } from '../../types';

import postStyles from '../../styles/Post.module.css';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import { getCategories } from '../api/categories';

interface Props {
  categories: Category[];
}

const ForumPage = ({ categories }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Plantery | Forum</title>
      </Head>
      <section>
        <Button
          onClick={() => router.push('/forum/create')}
          style={{ margin: '2vh', padding: '2vh 3vw' }}
        >
          New post
        </Button>
        <span>
          {categories.map((category) => (
            <Link
              href={`/forum/categories/${encodeURIComponent(
                category.title
              ).toLocaleLowerCase()}`}
              key={category.id}
            >
              {category.title}
            </Link>
          ))}
        </span>
        {categories.map((category) => (
          <section
            key={category.id}
            style={{ flexDirection: 'column', padding: '1vh' }}
          >
            <h2 style={{ textAlign: 'center' }}>{category.title}</h2>
            {category.posts && category?.posts?.length > 0 ? (
              category.posts?.map((post: Post) => (
                <Link
                  href={`/forum/${encodeURIComponent(post.id)}`}
                  key={post.id}
                >
                  <div
                    className={postStyles.content}
                    style={{ border: '1px solid lightgray', cursor: 'pointer' }}
                  >
                    <h3>{post.postTitle}</h3>
                    <i>{post.message}</i>
                  </div>
                </Link>
              ))
            ) : (
              <div>There seems to be nothing here.</div>
            )}
          </section>
        ))}
      </section>
    </div>
  );
};

export default ForumPage;

export async function getServerSideProps({ _req, res }) {
  const categories = await getCategories();
  console.log(categories);

  return {
    props: {
      categories
    }
  };
}
