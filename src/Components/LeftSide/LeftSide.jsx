import React from 'react'
import { Container,Card,Button } from 'react-bootstrap'
function LeftSide({image,addToFavorite,resetParentStateValue}) {


  return (
    <Container>
          
    <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={image.message} />
        <Button variant="primary" style={{ margin: '5px' }} onClick={() => addToFavorite(image)}>Add Favorite</Button>
        <Button variant="secondary" style={{margin:'5px'}} onClick={resetParentStateValue}>Reset</Button>   
 
</Card>

     
    </Container>
  )
}

export default LeftSide