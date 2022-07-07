import React from 'react';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage
} from 'formik';
import { Errors } from '../types';
import Head from 'next/head';

import styles from '../styles/Form.module.css';
import { NextPage } from 'next';

const NewPlant: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Plantery | Add a plant</title>
      </Head>
      <h1>Add a new plant!</h1>
      <Formik
        initialValues={{
          name: '',
          scientificName: '',
          minTemp: 0,
          maxTemp: 0,
          minHumid: 0,
          maxHumid: 0,
          light: '',
          watering: 0,
          waterTemp: 0,
          fertilizing: 0,
          minPh: 0,
          maxPh: 14
        }}
        validate={(values) => {
          const errors: Errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.scientificName) {
            errors.scientificName = 'Required';
          }
          if (values.minPh < 0 || values.minPh > 14) {
            errors.minPh = 'Must be between 0 and 14';
          }
          if (values.maxPh < 0 || values.maxPh > 14) {
            errors.maxPh = 'Must be between 0 and 14';
          }
          if (values.minPh > values.maxPh) {
            errors.minPh = 'Must be less than maxPh';
          }
          if (values.maxPh < values.minPh) {
            errors.maxPh = 'Must be greater than minPh';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.row}>
              <div className={styles.rowItem}>
                <label htmlFor='name'>Name *</label>
                <Field type='text' name='name' />
                <ErrorMessage
                  name='name'
                  component='div'
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.rowItem}>
                <label htmlFor='scientificName'>Scientific Name *</label>
                <Field type='text' name='scientificName' />
                <ErrorMessage
                  name='scientificName'
                  component='div'
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowItem}>
                <label htmlFor='description'>Description</label>
                <Field as='textarea' name='description' />
                <ErrorMessage
                  name='description'
                  component='div'
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <h2>Cultivation</h2>
            <div className={styles.row}>
              Temperature:&nbsp;
              <Field type='number' name='minTemp' placeholder='Minimum' />
              <ErrorMessage
                name='minTemp'
                component='div'
                className={styles.errorMessage}
              />
              &nbsp;-&nbsp;
              <Field type='number' name='maxTemp' placeholder='Maximum' />
              <ErrorMessage
                name='maxTemp'
                component='div'
                className={styles.errorMessage}
              />
              <Field as='select' name='unit'>
                <option value='C'>°C</option>
                <option value='F'>°F</option>
              </Field>
            </div>
            <div className={styles.row}>
              Humidity:&nbsp;
              <Field
                type='number'
                name='minHumidity'
                placeholder='Minimum'
                min={0}
              />
              <ErrorMessage
                name='minHumidity'
                component='div'
                className={styles.errorMessage}
              />
              &nbsp;-&nbsp;
              <Field
                type='number'
                name='maxHumidity'
                placeholder='Maximum'
                max={100}
              />
              &nbsp;%
              <ErrorMessage
                name='maxHumidity'
                component='div'
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.row}>
              Light:&nbsp;
              <Field as='select' name='light'>
                <option value='shade'>Shade</option>
                <option value='half-shade'>Half shade</option>
                <option value='medium-sun'>Medium sun</option>
                <option value='full-sun'>Full sun</option>
              </Field>
              <ErrorMessage
                name='light'
                component='div'
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.row}>
              Watering:&nbsp;
              <Field
                type='number'
                name='waterTimesPerMonth'
                placeholder='times per month'
              />
              <ErrorMessage
                name='timesPerMonth'
                component='div'
                className={styles.errorMessage}
              />
              <Field
                type='number'
                name='waterTemperature'
                placeholder='Water temperature'
              />
              <Field as='select' name='unit'>
                <option value='C'>°C</option>
                <option value='F'>°F</option>
              </Field>
            </div>
            <div className={styles.row}>
              Fertilizing:&nbsp;
              <Field
                type='number'
                name='fertilizerTimesPerMonth'
                placeholder='times per month'
                min={0}
              />
              <ErrorMessage
                name='fertilizerTimesPerMonth'
                component='div'
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.row}>
              Acidity:&nbsp;
              <Field
                type='number'
                name='minAcidity'
                placeholder='Minimum'
                min={0}
                max={13}
              />
              <ErrorMessage
                name='minAcidity'
                component='div'
                className={styles.errorMessage}
              />
              &nbsp;-&nbsp;
              <Field
                type='number'
                name='maxAcidity'
                placeholder='Maximum'
                min={1}
                max={14}
              />
              <ErrorMessage
                name='maxAcidity'
                component='div'
                className={styles.errorMessage}
              />
              &nbsp;pH
            </div>
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPlant;
