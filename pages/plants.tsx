import Link from 'next/link';
import React from 'react';
import { Plant } from '../types';
import data from '../data/plants.json';

import styles from '../styles/Plant.module.css';
import { NextPage } from 'next';
import Head from 'next/head';

interface Props {
  plants: Plant[];
}

const PlantsPage: NextPage<Props> = ({ plants }: Props) => {
  return (
    <div>
      <Head>
        <title>Plantery | Plants</title>
      </Head>
      <div className={styles.list}>
        {plants
          ?.sort((a, b) => a.name > b.name)
          .map((plant) => (
            <Link
              href={`/[plant]`}
              as={`/${plant.name
                .toLocaleLowerCase()
                .replace(' ', '-')
                .replace("'", '')}`}
              key={plant.id}
            >
              <a className={styles.plant}>
                {plant.name}, (<i>{plant.scientificName}</i>)
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlantsPage;

export async function getStaticProps() {
  return {
    props: {
      plants: data
    },
    revalidate: 60
  };
}
