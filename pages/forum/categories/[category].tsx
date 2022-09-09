import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { getCategory } from '../../api/categories/[category]';

const CategoryPage = ({
  category
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  return <div>{category?.title}</div>;
};

export default CategoryPage;

export async function getServerSideProps({ req, res, query, params }) {
  const category = await getCategory(params.category);
  console.log(category);
  if (category === undefined || category?.length === 0)
    return {
      notFound: true
    };
  return {
    props: {
      category
    }
  };
}
