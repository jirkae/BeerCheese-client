import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
// import localizedTexts from '../../text_localization/LocalizedStrings';

export default class CreatePackageMessagePage extends Component {
  state = {
    beerCategoryExpanded: false,
    supplCategoryExpanded: false
  };

  render() {
    return (
      <Row>
        <Col xl={{ size: 10, offset: 2 }} lg="10" md="8" sm="12" xs="12">
          <Row>
            <Col xs="9">
              <FormGroup>
                <Label for="exampleText">Napsat vzkaz k balíčku</Label>
                <Input type="textarea" name="text" id="exampleText" rows={10} />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup tag="fieldset">
            <legend>Druh papíru</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Normální papír
            </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Speciální papír
            </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Bez papíru
            </Label>
            </FormGroup>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}
