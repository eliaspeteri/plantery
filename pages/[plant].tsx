import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Plant } from '../types';
import { getPlant } from './api/plants/[plant]';
import PlantModel from '../models/plant';

interface Props {
  plant?: Plant;
}

const PlantPage: NextPage = ({ plant }: Props) => {
  return (
    <div>
      <Head>
        <title>Plantery {plant && `| ${plant.name}`}</title>
      </Head>
      <div>
        {plant && (
          <div>
            <h2>
              {plant.name}, (<i>{plant.latin}</i>)
            </h2>
            <p>Created at {plant.createdAt?.toLocaleString()}</p>
            {plant.cultivation && (
              <p>
                Keep temperature between {plant.cultivation?.temperature?.min}
                &#176;C and {plant.cultivation?.temperature?.max}
                &#176;C. Water {plant.cultivation?.water?.timesPerMonth} times
                per month. Fertilize{' '}
                {plant.cultivation?.fertilizer?.timesPerMonth} times per month.
              </p>
            )}
          </div>
        )}
      </div>
      <Link href='/plants'>
        <a> Back to plants</a>
      </Link>
    </div>
  );
};

export default PlantPage;

export async function getStaticPaths() {
  const plants = await PlantModel.find({});

  const paths = plants.map((plant) => ({
    params: { id: plant.id }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const data = await getPlant(params.id);
  return { props: { plant: data } };
}
