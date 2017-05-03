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
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { isNull } from '../../util/util';
import { browserHistory } from 'react-router';

class AdminLoginPage extends React.Component {
  state = {
    name: '',
    pass: '',
    errors: {
      name: null,
      pass: null
    }
  };

  componentWillUpdate(nextProps) {
    const { auth } = nextProps;

    //after successfull login redirect to admin pages
    if (auth.isAuthenticated && auth.isAdmin) {
      browserHistory.push('/admin/customers');
    }
  }

  formHasErrors = (errors = this.state.errors) =>
    Array.prototype.reduce.call(
      errors,
      (acc, key) => acc || isNull(key),
      false
    );

  handleSubmit = e => {
    e.preventDefault();
    const { login } = this.props;
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

    if (!this.formHasErrors(errors)) {
      login({
        username: this.state.name,
        password: this.state.pass
      });
    }
  };

  updateFields = e => {
    const { name, value } = e.target;
    let tempState = this.state;
    tempState[name] = value;
    this.setState(tempState);
  };

  render() {
    const { auth } = this.props;
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
            <Form onSubmit={this.handleSubmit}>
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
              <Button type="submit">
                {localizedTexts.logIn.btnSignIn}
              </Button>
              {auth.isFetching && <p>{localizedTexts.logIn.waiting}</p>}
              {auth.err &&
                <p className="text-danger">
                  {localizedTexts.logIn.error}
                </p>}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  login
})(AdminLoginPage);
