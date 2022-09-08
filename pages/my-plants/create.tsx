import Head from 'next/head';
import React from 'react';
import PlantForm from '../../components/PlantForm';

const MyPlantCreatePage = () => {
  const submitHandler = () => {
    alert('hello!');
  };
  return (
    <div className='center'>
      <Head>
        <title>Plantery | Add a plant</title>
      </Head>
      <PlantForm onSubmit={submitHandler} />
    </div>
  );
};

export default MyPlantCreatePage;
