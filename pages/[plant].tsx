import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import data from '../data/plants.json';
import { Plant } from '../types';

const PlantPage: NextPage = () => {
  const [plant, setPlant] = useState<Plant>();
  const router = useRouter();

  useEffect(() => {
    const plantName = router.query.plant as string;
    const plant = data.find((item) => item.id === plantName);
    setPlant(plant);
  }, [router.query.plant]);
  return (
    <div>
      <Head>
        <title>Plantery {plant && `| ${plant.name}`}</title>
      </Head>
      <div>
        {plant && (
          <div>
            <h2>
              {plant.name}, (<i>{plant.scientificName}</i>)
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
