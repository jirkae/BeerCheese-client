import React from 'react';
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  FormFeedback
} from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';

export default class AdminLoginPage extends React.Component {
  state = {
    name: '',
    pass: '',
    errors: {
      name: null,
      pass: null
    }
  };

  handleSubmit = () => {
    let errors = {
      name: null,
      pass: null
    };
    if (!this.state.name) {
      errors.name = localizedTexts.logIn.mandatoryField;
    }
    if (!this.state.pass) {
      errors.pass = localizedTexts.logIn.mandatoryField;
    }
    this.setState({ errors });
  };

  updateFields = e => {
    const { name, value } = e.target;
    let tempState = this.state;
    tempState[name] = value;
    this.setState(tempState);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">{localizedTexts.admin.pageName}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>{localizedTexts.logIn.title}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup color={this.state.errors.name ? 'danger' : ''}>
                <Label for="name">{localizedTexts.logIn.name}</Label>
                <Input
                  state={this.state.errors.name ? 'danger' : ''}
                  name="name"
                  value={this.state.name}
                  onChange={this.updateFields}
                />
                <FormFeedback>{this.state.errors.name}</FormFeedback>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup color={this.state.errors.pass ? 'danger' : ''}>
                <Label for="pass">{localizedTexts.logIn.pass}</Label>
                <Input
                  type="password"
                  state={this.state.errors.pass ? 'danger' : ''}
                  name="pass"
                  value={this.state.pass}
                  onChange={this.updateFields}
                />
                <FormFeedback>{this.state.errors.pass}</FormFeedback>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.handleSubmit}>
              {localizedTexts.logIn.btnSignIn}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
