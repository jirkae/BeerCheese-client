import React from 'react';
import { Alert, Modal } from 'reactstrap';
import { css } from 'glamor';

const rule = css({
  marginBottom: 0,
  height: '50px'
});

export default props => (
  <Modal isOpen={true} toggle={props.hideModals}>
    <Alert id="alert" {...rule} color={props.data.type} toggle={props.hideModals}>
      {props.data.message}
    </Alert>
  </Modal>
)


