import { Formik, FormikValues, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { Errors, Plant } from '../types';
import Button from './Button';

import styles from '../styles/Form.module.css';
import fieldStyles from '../styles/Field.module.css';

interface Props {
  onSubmit: (values: Record<string, any>, setSubmitting: any) => void;
  existingPlant?: Plant;
}

const PlantForm = ({ onSubmit, existingPlant }: Props) => {
  return (
    <Formik
      initialValues={{
        name: existingPlant?.name || '',
        genus: existingPlant?.genus || '',
        latin: existingPlant?.latin || '',
        minTemp: existingPlant?.cultivation?.temperature?.min || '',
        maxTemp: existingPlant?.cultivation?.temperature?.max || '',
        minHumid: existingPlant?.cultivation?.humidity?.min || '',
        maxHumid: existingPlant?.cultivation?.humidity?.max || '',
        light: existingPlant?.cultivation?.light || '',
        watering: existingPlant?.cultivation?.water?.timesPerMonth || '',
        waterTemp: existingPlant?.cultivation?.water?.temperature || '',
        fertilizing:
          existingPlant?.cultivation?.fertilizer?.timesPerMonth || '',
        minPh: existingPlant?.cultivation?.acidity?.min || 0,
        maxPh: existingPlant?.cultivation?.acidity?.max || 14,
        region: existingPlant?.region || ''
      }}
      validate={(values) => {
        const errors: Errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.latin) {
          errors.latin = 'Required';
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
      onSubmit={(values: FormikValues, { setSubmitting }) =>
        onSubmit(values, setSubmitting)
      }
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={styles.row}>
            <div className={styles.rowItem}>
              <label htmlFor='name'>Name *</label>
              <Field type='text' name='name' className={fieldStyles.input} />
              <ErrorMessage
                name='name'
                component='div'
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.rowItem}>
              <label htmlFor='latin'>Scientific Name *</label>
              <Field type='text' name='latin' className={fieldStyles.input} />
              <ErrorMessage
                name='latin'
                component='div'
                className={styles.errorMessage}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <label htmlFor='description'>Description</label>
              <Field
                as='textarea'
                name='description'
                className={[fieldStyles.input, fieldStyles.normal].join(' ')}
              />
              <ErrorMessage
                name='description'
                component='div'
                className={styles.errorMessage}
              />
            </div>
          </div>
          <h2 style={{ textAlign: 'center' }}>Cultivation</h2>

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <label htmlFor='minTemp'>Minimum temperature</label>
              <Field
                type='text'
                name='minTemp'
                placeholder='Minimum'
                className={[fieldStyles.input, fieldStyles.narrow].join(' ')}
              />
              <ErrorMessage
                name='minTemp'
                component='div'
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.rowItem}>
              <label htmlFor='maxTemp'>Maximum temperature</label>
              <Field
                type='text'
                name='maxTemp'
                placeholder='Maximum'
                className={[fieldStyles.input, fieldStyles.narrow].join(' ')}
              />
              <ErrorMessage
                name='maxTemp'
                component='div'
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.rowItem}>
              <div></div>
              <Field as='select' name='unit' className={fieldStyles.dropdown}>
                <option value='C'>°C</option>
                <option value='F'>°F</option>
              </Field>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <label htmlFor='minHumidity'>Minimum Humidity</label>
              <Field
                type='text'
                name='minHumidity'
                placeholder='Minimum'
                className={[fieldStyles.input, fieldStyles.narrow].join(' ')}
              />
              <ErrorMessage
                name='minHumidity'
                component='div'
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.rowItem}>
              <label htmlFor='maxHumidity'>Maximum humidity</label>
              <Field
                type='text'
                name='maxHumidity'
                placeholder='Maximum'
                className={[fieldStyles.input, fieldStyles.narrow].join(' ')}
              />
              <ErrorMessage
                name='maxHumidity'
                component='div'
                className={styles.errorMessage}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <label htmlFor='light'>Light</label>
              <Field as='select' name='light' className={fieldStyles.dropdown}>
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
          </div>

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <label htmlFor='waterTimesPerMonth'>Watering</label>
              <Field
                type='text'
                name='waterTimesPerMonth'
                placeholder='times per month'
                className={[fieldStyles.input, fieldStyles.narrow].join(' ')}
              />
              <ErrorMessage
                name='timesPerMonth'
                component='div'
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.rowItem}>
              <label htmlFor='waterTemperature'>Water temperature</label>
              <Field
                type='text'
                name='waterTemperature'
                placeholder='Water temperature'
                className={[fieldStyles.input, fieldStyles.narrow].join(' ')}
              />
            </div>

            <div className={styles.rowItem}>
              <div></div>
              <Field as='select' name='unit' className={fieldStyles.dropdown}>
                <option value='C'>°C</option>
                <option value='F'>°F</option>
              </Field>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <label htmlFor='fertilizerTimesPerMonth'>Fertilizer</label>
              <Field
                type='text'
                name='fertilizerTimesPerMonth'
                placeholder='times per month'
                className={[fieldStyles.input, fieldStyles.narrow].join(' ')}
              />
              <ErrorMessage
                name='fertilizerTimesPerMonth'
                component='div'
                className={styles.errorMessage}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <label htmlFor='minAcidity'>Minimum acidity</label>
              <Field
                type='text'
                name='minAcidity'
                placeholder='Minimum'
                className={[fieldStyles.input, fieldStyles.narrow].join(' ')}
              />
              <ErrorMessage
                name='minAcidity'
                component='div'
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.rowItem}>
              <label htmlFor='maxAcidity'>Maximum acidity</label>
              <Field
                type='text'
                name='maxAcidity'
                placeholder='Maximum'
                className={[fieldStyles.input, fieldStyles.narrow].join(' ')}
              />
              <ErrorMessage
                name='maxAcidity'
                component='div'
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.rowItem}>&nbsp;pH</div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <label htmlFor='region'>Region of Origin</label>
              <Field as='select' name='region' className={fieldStyles.dropdown}>
                <option value='antarctica'>Antarctica</option>
                <option value='eurasia'>Eurasia</option>
                <option value='indonesia'>Indonesia</option>
                <option value='namerica'>North America</option>
                <option value='oceania'>Oceania</option>
                <option value='samerica'>South America</option>
              </Field>
            </div>
          </div>

          <div className={styles.row}>
            <Button type='submit' disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PlantForm;
