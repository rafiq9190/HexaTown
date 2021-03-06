/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

function RightSide({ breedPageState }) {
  const fetchFromPageState =
    breedPageState !== null
      ? breedPageState.add_list.map((item, index) => {
          return (
            <img
              src={item}
              key={index}
              width="250px"
              height="200px"
              alt="this image isn't available"
              style={{ margin: "10px" }}
            />
          );
        })
      : "loading";
  return <>{fetchFromPageState}</>;
}

export default RightSide;
