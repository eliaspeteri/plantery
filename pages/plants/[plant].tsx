import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/Button";
import { Plant } from "../../types";
import { getPlantByName } from "../api/plants/[plant]";

interface Props {
  plant?: Plant;
}

const PlantPage: NextPage = ({ plant }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Plantery {(plant && `| ${plant.name}`) || "| Not Found"}</title>
      </Head>
      <div>
        <Button onClick={() => router.push("/plants")}>Back to plants</Button>
        {plant && (
          <div>
            <h2>
              {plant.name}, (<i>{plant.latin}</i>)
            </h2>
            <p>Created at {plant.createdAt?.toLocaleString()}</p>
            {plant.cultivation && (
              <p>
                Keep temperature between {plant.cultivation?.temperature?.min}
                &#176;C and {plant.cultivation?.temperature?.max}
                &#176;C. Water {plant.cultivation?.water?.timesPerMonth} times
                per month. Fertilize{" "}
                {plant.cultivation?.fertilizer?.timesPerMonth} times per month.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantPage;

export async function getServerSideProps({ params }) {
  const data = await getPlantByName(params.plant.replace("-", " "));
  return { props: { plant: JSON.parse(data) } };
}
