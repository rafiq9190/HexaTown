import React, { useEffect, useState, useReducer, useCallback } from "react";
import "./App.css";

import axios from "axios";
import RightSide from "./Components/RightSide";
import LeftSide from "./Components/LeftSide/LeftSide";
import { Container, Row, Col, Button } from "react-bootstrap";
import reducer from "./Components/Reducer";
import { RANDOM_Breed_ACTION } from "./Constants";

function App() {
  const [getData, setGetData] = useState([]);

  const [breedList, setBreedList] = useState([]);

  const [breedPageState, dispatchForBreed] = useReducer(reducer, null);

  useEffect(() => {
    let fetch = () => {
      return axios
        .get("https://dog.ceo/api/breeds/image/random")
        .then(function (response) {
          setGetData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetch();
  }, []);

  const getAgainData = () => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then(function (response) {
        setGetData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    dispatchForBreed({
      action: RANDOM_Breed_ACTION.INIT,
      payload: {
        add_list: [],
      },
    });
  }, []);

  const addToFavorite = useCallback(
    (name) => {
      let list_breed = [...breedList, name];

      dispatchForBreed({
        action: RANDOM_Breed_ACTION.UPDATE,
        payload: {
          add_list: list_breed,
        },
      });
      setBreedList([...breedList, name]);
      getAgainData();
    },
    [breedList, dispatchForBreed]
  );

  const resetParentStateValue = () => {
    dispatchForBreed({
      action: RANDOM_Breed_ACTION.INIT,
      payload: {
        add_list: [],
      },
    });
    setBreedList([]);
  };
  useEffect(() => {
    if (breedList.length) {
      setBreedList(RANDOM_Breed_ACTION.add_list);
    }
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <Button style={{ margin: "5px" }} onClick={getAgainData}>
              Swipe
            </Button>
            <LeftSide
              image={getData}
              addToFavorite={addToFavorite}
              resetParentStateValue={resetParentStateValue}
            />
          </Col>
          <Col xs={12} md={8}>
            <span
              style={{ display: "flex", flexWrap: "wrap", marginTop: "40px" }}
            >
              <RightSide breedPageState={breedPageState} />
            </span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
