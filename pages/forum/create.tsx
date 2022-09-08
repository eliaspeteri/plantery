import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik';
import Head from 'next/head';
import React from 'react';

import styles from '../../styles/Form.module.css';
import fieldStyles from '../../styles/Field.module.css';
import Button from '../../components/Button';
import { Category, Errors } from '../../types';
import { useRouter } from 'next/router';
import { HiArrowLeft } from 'react-icons/hi';

interface Props {
  categories: Category[];
}

const ForumCreatePage = ({ categories }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Plantery | Forum | New Post</title>
      </Head>
      <Button
        onClick={() => router.push('/forum')}
        style={{ margin: '2vh', padding: '2vh 3vw' }}
      >
        <HiArrowLeft />
      </Button>
      <Formik
        initialValues={{ title: '', message: '' }}
        validate={(values): Errors => {
          const errors: Errors = {};
          if (!values.title) {
            errors.title = 'Required';
          }
          if (!values.message) {
            errors.message = 'Required';
          }
          return errors;
        }}
        onSubmit={(
          values: FormikValues,
          { setSubmitting }
        ): void | Promise<any> => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.row}>
              <div
                className={['center', styles.rowItem].join(' ')}
                style={{ width: '100vw' }}
              >
                <label htmlFor='title'>
                  Title <span style={{ color: 'red' }}>*</span>
                </label>
                <Field
                  type='text'
                  name='title'
                  className={[fieldStyles.input]}
                  style={{
                    minWidth: '60vw',
                    textAlign: 'center'
                  }}
                  placeholder='Add a snazzy title to your post!'
                />
              </div>
            </div>
            <div className={styles.row}>
              <div
                className={['center', styles.rowItem].join(' ')}
                style={{ width: '100vw' }}
              >
                <Field
                  as='textarea'
                  name='message'
                  className={[fieldStyles.input, fieldStyles.normal].join(' ')}
                  style={{
                    minWidth: '60vw',
                    minHeight: '20vh',
                    maxHeight: '50vh'
                  }}
                  placeholder="What's new today?"
                />
              </div>
            </div>
            <div
              className={[styles.row, styles.rowItem].join(' ')}
              style={{ margin: '0 20vw' }}
            >
              <Field
                as='select'
                name='category'
                className={['center', fieldStyles.dropdown].join(' ')}
              >
                {categories?.map((category) => (
                  <option key={category.id}>{category.title}</option>
                ))}
              </Field>
            </div>
            <div className={styles.row}>
              <Button type='submit' disabled={isSubmitting}>
                Create a new post!
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForumCreatePage;

export async function getServerSideProps() {
  const categories: Category[] = [
    {
      id: 'houseplants',
      title: 'Houseplants',
      description: 'Houseplants of all kind!'
    },
    {
      id: 'palms',
      title: 'Palm trees',
      description: 'Palm trees from all over the world'
    }
  ];
  return {
    props: {
      categories
    }
  };
}
