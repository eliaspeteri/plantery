import Link from 'next/link';
import React from 'react';
import Button from '../components/Button';
import SessionContext from '../contexts/SessionContext';

import buttonStyles from '../styles/Button.module.css';

const MyPlantPage = () => {
  const currentDate = new Date();
  return (
    <SessionContext.Consumer>
      {(value) => (
        <div>
          <h1 style={{ textAlign: 'center' }}>Hi, {value.user.name}!</h1>
          <p style={{ textAlign: 'center' }}>
            Below you can find your plants and data relating to them.
          </p>
          {value.user.plants?.map((plant, index) => (
            <div key={plant.id}>
              <Link
                href={`/[plant]`}
                as={`/${plant.name
                  .toLocaleLowerCase()
                  .replace(' ', '-')
                  .replace("'", '')}`}
                key={plant.id}
              >
                <a>{plant.name}</a>
              </Link>
              {plant.lastWatered
                ? `, last watered ${
                    Math.floor(
                      Date.UTC(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        currentDate.getDate()
                      ) -
                        Date.UTC(
                          plant.lastWatered.getFullYear(),
                          plant.lastWatered.getMonth(),
                          plant.lastWatered.getDate()
                        )
                    ) /
                    (1000 * 60 * 60 * 24)
                  } days ago.`
                : ', never watered.'}
              <Button
                className={[buttonStyles.button, buttonStyles.small].join(' ')}
                style={{ margin: '1vh' }}
              >
                Water!
              </Button>
            </div>
          ))}
        </div>
      )}
    </SessionContext.Consumer>
  );
};

export default MyPlantPage;
