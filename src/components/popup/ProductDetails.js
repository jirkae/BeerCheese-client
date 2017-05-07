import React from 'react';
import {
  Modal,
  ModalBody,
  Row,
  Col,
  ModalHeader
} from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';

export default props => {
  return (
    <Modal isOpen={true} toggle={props.hideModals}>
      <ModalHeader><h3>{props.data.name}</h3></ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <img
              className="img-fluid"
              src={props.data.image}
              style={{ alignSelf: 'center', width: 'auto', maxHeight: '200px' }}
              alt="Card cap"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {props.data.priceAfterDiscount
              ? <div>
                  <p>
                    <del>
                      {localizedTexts.Product.price + ': ' + props.data.price}
                      &nbsp;Kč
                    </del>
                  </p>
                  <p>
                    {localizedTexts.Product.priceAfterDiscount +
                      ': ' +
                      props.data.priceAfterDiscount}
                    &nbsp;
                    Kč
                  </p>
                </div>
              : <p>
                  {localizedTexts.Product.price + ': ' + props.data.price}
                  &nbsp;Kč
                </p>}
          </Col>
        </Row>
        <Row>
          <Col>
            {props.data.description}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};
