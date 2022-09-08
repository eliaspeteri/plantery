import React from 'react';
import Head from 'next/head';

import { NextPage } from 'next';
import PlantForm from '../components/PlantForm';

const NewPlantPage: NextPage = () => {
  const submitHandler = (
    values: Record<string, any>,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };
  return (
    <div className='center'>
      <Head>
        <title>Plantery | Add a plant</title>
      </Head>
      <h1 style={{ textAlign: 'center' }}>Add a new plant!</h1>
      <PlantForm onSubmit={submitHandler} />
    </div>
  );
};

export default NewPlantPage;
