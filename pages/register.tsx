import { ErrorMessage, Field, Form, Formik } from 'formik';
import Head from 'next/head';
import React from 'react';
import { Errors } from '../types';

import styles from '../styles/Form.module.css';
import fieldStyles from '../styles/Field.module.css';
import Link from 'next/link';
import Button from '../components/Button';

const RegisterPage = () => {
  return (
    <div className='center'>
      <Head>
        <title>Plantery | Register</title>
      </Head>
      <h1>Register</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          isEmailVerified: false
        }}
        validate={(values) => {
          const errors: Errors = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          if (!values.lastName) {
            errors.lastName = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          if (values.password !== values.passwordConfirmation) {
            errors.passwordConfirmation = 'Passwords Do Not Match';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const result = await fetch(`${process.env.ROOT}/api/register`);
          console.table(result);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.rowItem}>
              <label htmlFor='email'>
                Email <span style={{ color: 'red' }}>*</span>
                &nbsp;
                <ErrorMessage
                  name='email'
                  component='span'
                  className={styles.errorMessage}
                />
              </label>
              <Field
                name='email'
                type='email'
                required
                className={fieldStyles.input}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.rowItem}>
                <label htmlFor='firstName'>
                  First name <span style={{ color: 'red' }}>*</span>
                  &nbsp;
                  <ErrorMessage
                    name='firstName'
                    component='span'
                    className={styles.errorMessage}
                  />
                </label>
                <Field
                  name='firstName'
                  required
                  className={fieldStyles.input}
                />
              </div>

              <div className={styles.rowItem}>
                <label htmlFor='lastName'>
                  Last name * &nbsp;
                  <ErrorMessage
                    name='lastName'
                    component='span'
                    className={styles.errorMessage}
                  />
                </label>
                <Field name='lastName' required className={fieldStyles.input} />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowItem}>
                <label htmlFor='password'>
                  Password<span style={{ color: 'red' }}>*</span>
                  &nbsp;
                  <ErrorMessage
                    name='password'
                    component='span'
                    className={styles.errorMessage}
                  />
                </label>
                <Field
                  name='password'
                  type='password'
                  required
                  className={fieldStyles.input}
                />
              </div>

              <div className={styles.rowItem}>
                <label htmlFor='passwordConfirmation'>
                  Confirm password <span style={{ color: 'red' }}>*</span>
                  &nbsp;
                  <ErrorMessage
                    name='passwordConfirmation'
                    component='span'
                    className={styles.errorMessage}
                  />
                </label>
                <Field
                  name='passwordConfirmation'
                  type='password'
                  required
                  className={fieldStyles.input}
                />
              </div>
            </div>
            <div className={styles.row}>
              <Button type='submit' disabled={isSubmitting}>
                Register
              </Button>
            </div>
            <Link href='/login' className={styles.row}>
              <a className={styles.rowItem}>Login with an existing account</a>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
