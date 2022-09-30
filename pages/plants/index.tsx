import Link from "next/link";
import React from "react";

import styles from "../../styles/Plant.module.css";
import { NextPage } from "next";
import Head from "next/head";
import { getPlants } from "../api/plants";
import { Plant } from "../../types";

interface Props {
  plants: Record<string, any>;
}

const PlantsPage: NextPage<Props> = ({ plants }: Props) => {
  return (
    <div>
      <Head>
        <title>Plantery | Plants</title>
      </Head>
      <div className={styles.list}>
        {plants.map((plant: Plant) => (
          <Link
            href={`/plants/[plant]`}
            as={`/plants/${plant.latin
              .toLocaleLowerCase()
              .replace(" ", "-")
              .replace("'", "")}`}
            key={plant.id}
          >
            <a className={styles.plant}>
              {plant.name}, (<i>{plant.latin}</i>)
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlantsPage;

export async function getServerSideProps({ _req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const data = await getPlants();
  return {
    props: {
      plants: JSON.parse(data),
    },
  };
}
