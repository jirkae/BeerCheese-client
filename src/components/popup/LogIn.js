import React from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';


const loginModal = ({ auth, hideModals, login }) => {
  const handleAdminLogin = event => {
    event.preventDefault();
    login({
      username: 'admin',
      password: 'admin'
    });
  };
  
  const handleUserLogin = event => {
    event.preventDefault();
    login({
      username: 'user',
      password: 'user'
    });
  };

  // const {auth, user, hidModals} = props;

  return (
    <Modal isOpen={true} toggle={hideModals}>
      <ModalBody>
        <Button onClick={handleAdminLogin}>Login as Admin</Button>
        <Button onClick={handleUserLogin}>Login as User</Button>
        {auth.isFetching && <p>Loading</p>}
        {auth.err && <p color="warning">Login failed: {JSON.stringify(auth.err)}</p>}
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(loginModal);
