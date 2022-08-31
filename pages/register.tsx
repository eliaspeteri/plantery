import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import React from 'react';
import { Errors } from '../types';

import styles from '../styles/Form.module.css';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div>
      <Head>
        <title>Plantery | Register</title>
      </Head>
      <h1>Register</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validate={(values) => {
          const errors: Errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
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
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowItem}>
                <label htmlFor='firstName'>First name *</label>
                <Field name='firstName' required />
              </div>

              <div className={styles.rowItem}>
                <label htmlFor='lastName'>Last name *</label>
                <Field name='lastName' required />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowItem}>
                <label htmlFor='password'>Password *</label>
                <Field name='password' type='password' required />
              </div>

              <div className={styles.rowItem}>
                <label htmlFor='passwordConfirmation'>Confirm password *</label>
                <Field name='passwordConfirmation' type='password' required />
              </div>
            </div>
            <div className={styles.row}>
              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
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
