import React from 'react';
import { Container } from 'reactstrap';
import NavBarAdmin from '../../components/navigation/NavBarAdmin';
import Modals from '../../components/navigation/Modals';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/currentUser';

class AdminPage extends React.Component {
  // Load current user
  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <Container>
        <NavBarAdmin />
        <Modals />
        {this.props.children}
      </Container>
    );
  }
}

export default connect(null, { getCurrentUser })(AdminPage);
