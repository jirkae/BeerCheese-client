import React from 'react';
import {
  Modal,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import localizedTexts from '../../text_localization/LocalizedStrings';

class LoginModal extends React.Component {

  state = { };
  firstLoad = true;

  handleLogin = event => {
    event.preventDefault();
    this.firstLoad = false;
    const { login } = this.props;

    login({
      username: this.state.username,
      password: this.state.password
    });

  };

  updateUsernameValue = event => {
    this.setState({
      username: event.target.value
    });
  };

  updatePasswordValue = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    const { auth, hideModals } = this.props;

    return (
      <Modal isOpen={true} toggle={hideModals}>
        <ModalBody>
          {auth.err && !this.firstLoad &&
            <Alert color="danger">Neplatná kombinace uživatelského jména a hesla.</Alert>
          }
          <Form onSubmit={this.handleLogin}>
            <FormGroup>
              <Label for="username">{localizedTexts.logIn.name}</Label>
              <Input required type="text" name="username" id="username" value={this.state.username} onChange={this.updateUsernameValue} />
            </FormGroup>
            <FormGroup>
              <Label for="password">{localizedTexts.logIn.pass}</Label>
              <Input required type="password" name="password" id="password" value={this.state.password} onChange={this.updatePasswordValue} />
            </FormGroup>
            <Button type="submit">{localizedTexts.logIn.btnSignIn}</Button>
          </Form>
          {auth.isFetching && <p>{localizedTexts.logIn.waiting}</p>}
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  login
})(LoginModal);
