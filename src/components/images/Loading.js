import React from 'react';
import { Col } from 'reactstrap';

const Loading = () => {
  const imagePath = require('../../images/lazyload.gif');

  return (
    <Col lg="4" md="6" xs="12">
      <img src={imagePath} alt="loading" />
    </Col>
  );
};

export default Loading;
