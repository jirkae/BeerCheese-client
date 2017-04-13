import React from 'react';
import { Row, Col, Container } from 'reactstrap';

export default () => (
  <Container style={{marginTop: '50px'}}>
    <Row>
      <Col xl="4" lg="4" md="4" sm="12" xs="12">
        © 2017 Pivnisuvenyry.cz
      </Col>
      <Col xl="4" lg="4" md="4" sm="12" xs="12">
        Tel.: +420 220 334 546
      </Col>
      <Col xl="4" lg="4" md="4" sm="12" xs="12">
        info@pivnisuvenyry.cz
      </Col>
    </Row>
  </Container>
);
