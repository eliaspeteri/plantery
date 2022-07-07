import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Errors } from '../types';

import styles from '../styles/Form.module.css';

const LoginPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Plantery | Login</title>
      </Head>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validate={(values) => {
          const errors: Errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
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
                <label htmlFor='email'>Email *</label>
                <Field name='email' type='email' required />
                <ErrorMessage
                  name='email'
                  component='div'
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowItem}>
                <label htmlFor='password'>Password *</label>
                <Field name='password' type='password' required />
                <ErrorMessage
                  name='password'
                  component='div'
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <div className={styles.row}>
              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
