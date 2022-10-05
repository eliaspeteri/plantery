import Link from 'next/link';
import React from 'react';

import styles from '../../styles/Plant.module.css';
import { NextPage } from 'next';
import Head from 'next/head';
import { getPlants } from '../api/plants';
import { Plant } from '../../types';
import Button from '../../components/Button';

import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { useRouter } from 'next/router';
interface Props {
  results: {
    plants: Plant[];
    previous: string;
    next: string;
  };
}

const PlantsPage: NextPage<Props> = ({ results }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Plantery | Plants</title>
      </Head>
      <div className={styles.list}>
        {results?.plants.map((plant: Plant) => (
          <Link
            href={`/plants/[plant]`}
            as={`/plants/${plant.latin
              .toLocaleLowerCase()
              .replace(' ', '-')
              .replace("'", '')}`}
            key={plant.id}
          >
            <a className={styles.plant}>
              {plant.name}, (<i>{plant.latin}</i>)
            </a>
          </Link>
        ))}
      </div>
      <div style={{ margin: '2vh auto' }}>
        <Button
          style={{
            display: 'inline-flex',
            margin: 'auto 1vw'
          }}
          onClick={() =>
            router.push(
              `${router.route}?page=${
                router.query.page - 1 >= 0 ? router.query.page - 1 : 0
              }`
            )
          }
        >
          <HiArrowLeft />
        </Button>
        <Button
          style={{ display: 'inline-flex', margin: 'auto 1vw' }}
          onClick={() =>
            router.push(
              `${router.route}?page=${parseInt(router.query.page) + 1}`
            )
          }
        >
          <HiArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default PlantsPage;

export async function getServerSideProps({ req, res, query }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const data = await getPlants(parseInt(query.page));
  return {
    props: {
      results: JSON.parse(data)
    }
  };
}
