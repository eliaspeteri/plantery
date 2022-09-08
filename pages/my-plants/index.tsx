import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../../components/Button';
import SessionContext from '../../contexts/SessionContext';

import buttonStyles from '../../styles/Button.module.css';
import { UserPlant } from '../../types';
import { timeDuration } from '../../utils/timeDuration';

const MyPlantPage = () => {
  const router = useRouter();
  return (
    <SessionContext.Consumer>
      {(session) => (
        <div>
          <h1 style={{ textAlign: 'center' }}>Hi, {session?.user?.name}!</h1>
          <p style={{ textAlign: 'center' }}>
            Below you can find your plants and data relating to them.
          </p>
          {session?.user?.plants?.map((plant: UserPlant, index: number) => (
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
                ? `, last watered ${timeDuration(plant.lastWatered)} days ago.`
                : ', never watered.'}
              <Button
                className={[buttonStyles.button, buttonStyles.small].join(' ')}
                style={{ margin: '1vh' }}
              >
                Water!
              </Button>
            </div>
          ))}
          <Button
            style={{ display: 'flex' }}
            onClick={() => router.push('/my-plants/create')}
          >
            Add a new plant
          </Button>
        </div>
      )}
    </SessionContext.Consumer>
  );
};

export default MyPlantPage;
