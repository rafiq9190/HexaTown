import React,{useEffect,useState,useReducer} from 'react';
import './App.css';

import axios from 'axios';
import RightSide from './Components/RightSide';
import LeftSide from './Components/LeftSide/LeftSide';
import { Container, Row, Col, Button } from 'react-bootstrap'
import reducer from './Components/Reducer';
import {RANDOM_Breed_ACTION}from './Constants'

function App() {


  const [getData, setGetData] = useState({})
  const [breedList, setBreedList] = useState([])

  
  const [breedPageState, dispatchForBreed] = useReducer(
    reducer,
    null,
    )
   
  useEffect(() => {
    
    let fetch = () => {
      return axios.get('https://dog.ceo/api/breeds/image/random')
      .then(function (response) {
        console.log("🚀 ~ file: App.js ~ line 26 ~ response", response);
        setGetData(response.data)
      })
      .catch(function (error) {
        
        console.log(error);
      })
    }
    fetch()
  
    
  }, [])

  const getAgainData = ()=>{
    axios.get('https://dog.ceo/api/breeds/image/random')
    .then(function (response) {
      
      setGetData(response.data)
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  useEffect(() => {
    dispatchForBreed({
      action: RANDOM_Breed_ACTION.INIT,
      payload: {
        add_list:[]
      }
    })
  }, [])
  
  const addToFavorite = (name) => {
  console.log("🚀 ~ file: App.js ~ line 63 ~ addToFavorite ~ name",  name)
    setBreedList([...breedList,name])
    
    dispatchForBreed({
      action: RANDOM_Breed_ACTION.UPDATE,
      payload: {
        add_list: breedList,
      },
    })
    const res = axios.get('https://list-breed-default-rtdb.firebaseio.com/breed_list.json', {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        breedList,
      })
    })
    if (res) {
      alert("Data has been save")
    } 
    getAgainData()
  }

  const resetParentStateValue = () => {
    dispatchForBreed({
      action: RANDOM_Breed_ACTION.INIT,
      payload: {
        add_list: [],
      },
    })
    setBreedList([])
    
  }

  return (
    <div >
        <Container>
    <Row>
                    
    <Col xs={12} md={4}>
    <Button style={{ margin: '5px' }} onClick={getAgainData}>Swipe</Button>
     <LeftSide image={getData} addToFavorite={ addToFavorite} resetParentStateValue={resetParentStateValue}/>
    
    </Col>
    <Col xs={12} md={8}>
            <div style={{ display: 'flex' }}>
              
                <RightSide breedPageState={breedPageState} />
                          
      </div>
    </Col>
  </Row>
            </Container>
    </div>
  );
}

export default App;
