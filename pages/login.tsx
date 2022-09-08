import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Errors } from '../types';

import styles from '../styles/Form.module.css';
import fieldStyles from '../styles/Field.module.css';
import Link from 'next/link';
import Button from '../components/Button';
import { setSessionCookie } from '../utils/sessions';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const router = useRouter();
  return (
    <div className='center'>
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
        onSubmit={async (values, { setSubmitting }) => {
          //   api call to login service here
          const res = await fetch(`${process.env.ROOT}/api/login`);
          console.table(res);
          if (res !== undefined) {
            setSessionCookie({ user: { email: values.email } });
            router.push('/');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) =>
          isSubmitting ? (
            <h4>Logging in...</h4>
          ) : (
            <Form>
              <div className={styles.row}>
                <div className={styles.rowItem}>
                  <label htmlFor='email'>
                    Email <span style={{ color: 'red' }}>*</span>&nbsp;
                    <ErrorMessage
                      name='email'
                      component='span'
                      className={styles.errorMessage}
                    />
                  </label>
                  <Field
                    name='email'
                    type='email'
                    className={fieldStyles.input}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowItem}>
                  <label htmlFor='password'>
                    Password <span style={{ color: 'red' }}>*</span>&nbsp;
                    <ErrorMessage
                      name='password'
                      component='span'
                      className={styles.errorMessage}
                    />
                  </label>
                  <Field
                    name='password'
                    type='password'
                    className={fieldStyles.input}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <Button type='submit' disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            </Form>
          )
        }
      </Formik>
      <div>
        <Link href='/register' className={styles.row}>
          <a className={styles.rowItem}>Create a new account</a>
        </Link>
        <Link href='/password-reset' className={styles.row}>
          <a className={styles.rowItem}>Forgot password?</a>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
