import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
// import ProductList from '../../components/product/ProductList';
// import localizedTexts from '../../text_localization/LocalizedStrings';

export default class CreatePackageSummaryPage extends Component {
  state = {
    beerCategoryExpanded: false,
    supplCategoryExpanded: false
  };

  render() {
    return (
      <Row>
        <Col xl={{ size: 10, offset: 2 }} lg="10" md="8" sm="12" xs="12">
          <h1 style={{marginBottom: '30px'}}>Shrnutí</h1>
          <Row>
            <Col xs="2"><strong>Balení:</strong></Col>  
            <Col xs="4">Bedýnka 1</Col>  
          </Row>
          <Row>
            <Col xs="2"><strong>Vzkaz:</strong></Col>  
            <Col xs="4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultricies sollicitudin eros, id ullamcorper risus maximus sed. Sed rutrum non elit et ultricies. Aenean mattis a neque laoreet malesuada. Maecenas finibus maximus ipsum, vitae laoreet ex imperdiet ac. Phasellus vel bibendum enim, et dictum nunc. Nunc sit amet justo elementum, tempor libero eget, interdum eros. Aenean tempus lacus quis urna dictum, nec viverra elit consectetur.</Col>  
          </Row>
          <Row>
            <Col xs={{size: 5, offset: 2}} style={{marginTop: '100px'}}> 
              <Button color="secondary" size="lg">Vložit do košíku</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
