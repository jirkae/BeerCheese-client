import React from 'react';
import { Modal, ModalBody, Container, Row } from 'reactstrap';

export default props => {
  return (
    <Modal isOpen={true} toggle={props.hideModals}>
      <ModalBody>
        <Container>
          <Row>
            edit order {props.data.id}
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};
