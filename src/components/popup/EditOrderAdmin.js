import React from 'react';
import {
  Modal, ModalBody, Container, Row, Form, FormGroup,
  Label, Input, Button, Col
} from 'reactstrap';

import api from '../../api';

const SHIPPINGS_URL = '/api/shippings/';
const USERS_URL = '/api/users/';

export default class EditOrderAdmin extends React.Component {

  state = {
    users: [],
    shippings: [],
    user: this.props.data.user,
    status: this.props.data.status,
    paymentType: this.props.data.paymentType,
    shipping: this.props.data.shipping,
    shippingAddress: this.props.data.shippingAddress,
    billingAddress: this.props.data.billingAddress,
  };

  componentWillMount() {
    this.loadUsers();
    this.loadShippings();
  }

  loadUsers = () => {
    api.get('users')
      .then((response) => {
        if (response) {
          this.setState({
            users: response.data.users.items.map((item) => {
              return item.user;
            })
          });
        }
      })
      .catch(response => {
        console.log('error ', response);
      });
  };

  loadShippings = () => {
    api.get('shippings')
      .then((response) => {
        if (response) {
          this.setState({
            shippings: response.data.shippings.items.map(item => {
              return item.shipping
            })
          });
        }
      })
      .catch(response => {
        console.log('error ', response);
      });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let data = {
      order: {
        user: this.state.user,
        status: this.state.status,
        paymentType: this.state.paymentType,
        shipping: this.state.shipping,
        shippingAddress: this.state.shippingAddress,
        billingAddress: this.state.billingAddress,
      }
    };
    api.put('orders/' + this.props.data.id, data)
      .then(() => {
        this.props.hideModals();
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

  onSelectShipping = (event) => {
    let shippingId = event.target.value;
    this.setState({
      shipping: SHIPPINGS_URL + shippingId
    })
  };

  renderShippingOptions = () => {
    return this.state.shippings.map(option => {
      return (
        <option key={option.id} value={option.id}>{option.name}</option>
      );
    });
  };

  renderUserOptions = () => {
    return this.state.users.map(option => {
      return (
        <option key={option.id} value={option.id}>
          {option.firstName} {option.lastName}
        </option>
      );
    });
  };

  onSelectUser = (event) => {
    this.setState({
      user: USERS_URL + event.target.value
    })
  };

  render() {
    return (
      <Modal isOpen={true} toggle={this.props.hideModals}>
        <ModalBody>
          <Container>
            <Row>
              <h3>Upravit objednávku</h3>
              <br/> <br/>
              <Form onSubmit={this.onSubmit}>

                <FormGroup row>
                  <Label for="user" sm={4}>Zákazník</Label>
                  <Col sm={8}>
                    <Input required type="select" name="user" id="user"
                           onChange={this.onSelectUser}
                    >
                      {this.renderUserOptions()}
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="status" sm={4}>Status</Label>
                  <Col sm={8}>
                    <Input defaultValue={this.props.data.status}
                           onChange={this.onInputChange}
                           required type="text" name="status" id="status"/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="paymentType" sm={4}>Způsob platby</Label>
                  <Col sm={8}>
                    <Input defaultValue={this.props.data.paymentType}
                           onChange={this.onInputChange}
                           required type="text" name="paymentType" id="paymentType"/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="shipping" sm={4}>Způsob dodání</Label>
                  <Col sm={8}>
                    <Input required type="select" name="shipping" id="shipping"
                           onChange={this.onSelectShipping}
                    >
                      {this.renderShippingOptions()}
                    </Input>
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

