import React from 'react';
import {
  Modal, ModalBody, Container, Row, Form, FormGroup,
  Label, Input, Button, Col, InputGroupAddon, InputGroup,
} from 'reactstrap';

import api from '../../api';

export default class EditSupplierAdmin extends React.Component {

  state = {
    name: this.props.data.name,
    phoneNumber: this.props.data.phoneNumber,
    deliveryTime: this.props.data.deliveryTime
  };

  onSubmit = (event) => {
    event.preventDefault();
    api.put('suppliers/' + this.props.data.id, {supplier: this.state})
      .then(response => {
        this.props.hideModals();
        this.props.data.refreshCB(response.data.supplier);
      })
      .catch(response => {
        console.log('error ', response);
      });
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  render() {
    return (
      <Modal isOpen={true} toggle={this.props.hideModals}>
        <ModalBody>
          <Container>
            <Row>
              <h3>Upravit dodavatele</h3>
              <br/> <br/>
              <Form onSubmit={this.onSubmit}>
                <FormGroup row>
                  <Label for="name" sm={3}>Jméno</Label>
                  <Col sm={9}>
                    <Input onChange={this.onInputChange} defaultValue={this.props.data.name} required type="text" name="name" id="name"/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="phoneNumber" sm={3}>Telefon</Label>
                  <Col sm={9}>
                    <Input defaultValue={this.props.data.phoneNumber} required type="text"
                           onChange={this.onInputChange}
                           name="phoneNumber" id="phoneNumber"/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="deliveryTime" sm={3}>Dodací lhůta</Label>
                  <Col sm={9}>
                    <InputGroup>
                      <Input defaultValue={this.props.data.deliveryTime} required type="number"
                             onChange={this.onInputChange} min="0"
                             name="deliveryTime" id="deliveryTime"/>
                      <InputGroupAddon>Dny</InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{size: 10, offset: 2}}>
                    <Button type="submit">Upravit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    );
  }
};
