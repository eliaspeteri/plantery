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
            <p>{plant.createdAt?.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantPage;
