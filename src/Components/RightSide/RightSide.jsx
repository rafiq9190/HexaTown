import React from 'react'
import { Container,Card } from 'react-bootstrap'

function RightSide({breedPageState}) {

  const fetchFromPageState = breedPageState !== null? breedPageState.add_list.map((item) => {
    return (
      
      <Container>
            <Card style={{ width: "20rem" }} >
      <Card.Img variant="top" src={item.message} /> 
            </Card> 
    </Container>
   
    )
  
  }):"loading"
  return (
    <>
        {fetchFromPageState}
    </>
                  
    
  )
}

export default RightSide