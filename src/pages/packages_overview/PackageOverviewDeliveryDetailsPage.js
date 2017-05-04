import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Input } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';

export default class PackageOverviewDeliveryDetailsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Form>
        <h4>{localizedTexts.PackageOverview.deliveryDetails.contacts}</h4>
        <FormGroup row>
          <Label for="firstName" sm={2}>{localizedTexts.PackageOverview.deliveryDetails.firstName}</Label>
          <Col xs={5}>
            <Input type="text" name="shipping[firstName]" id="firstName" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="lastName" sm={2}>{localizedTexts.PackageOverview.deliveryDetails.lastName}</Label>
          <Col xs={5}>
            <Input type="text" name="shipping[lastName]" id="lastName" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="email" sm={2}>{localizedTexts.PackageOverview.deliveryDetails.email}</Label>
          <Col xs={5}>
            <Input type="email" name="shipping[email]" id="email" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="phone" sm={2}>{localizedTexts.PackageOverview.deliveryDetails.phone}</Label>
          <Col xs={5}>
            <Input type="text" name="shipping[phone]" id="phone" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="street" sm={2}>{localizedTexts.PackageOverview.deliveryDetails.street}</Label>
          <Col xs={5}>
            <Input type="text" name="shipping[street]" id="street" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="city" sm={2}>{localizedTexts.PackageOverview.deliveryDetails.city}</Label>
          <Col xs={5}>
            <Input type="text" name="shipping[city]" id="city" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="zip" sm={2}>{localizedTexts.PackageOverview.deliveryDetails.zip}</Label>
          <Col xs={5}>
            <Input type="text" name="shipping[zip]" id="zip" />
          </Col>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" id="register" />{' '}
            {localizedTexts.PackageOverview.deliveryDetails.register}
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" id="register" />{' '}
            {localizedTexts.PackageOverview.deliveryDetails.differentDeliveryContact}
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" id="register" />{' '}
            {localizedTexts.PackageOverview.deliveryDetails.agree}
          </Label>
        </FormGroup>
      </Form>
    );
  }
}
