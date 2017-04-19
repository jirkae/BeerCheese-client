import React from 'react';
import {
  Modal,
  ModalBody,
  Row,
  Col,
  ModalFooter,
  Button,
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
              src="https://placeholdit.imgix.net/~text?txtsize=33&amp;txt=318%C3%97180&amp;w=318&amp;h=180"
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
      <ModalFooter>
        <Button>{localizedTexts.Product.btnAddToPackage}</Button>
      </ModalFooter>
    </Modal>
  );
};
