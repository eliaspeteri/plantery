import Link from "next/link";
import React from "react";
import styles from "../styles/SearchResult.module.css";
import { Plant } from "../types";

interface Props {
  result: Plant;
}

const SearchResult = ({ result }: Props) => {
  return (
    <div className={styles.result}>
      <Link
        href="/plants/[plant]"
        as={`/plants/${result.name
          ?.toLocaleLowerCase()
          .replace(" ", "-")
          .replace("'", "")}`}
      >
        <a>
          {result.name} (<i>{result.latin}</i>)
        </a>
      </Link>
    </div>
  );
};

export default SearchResult;
