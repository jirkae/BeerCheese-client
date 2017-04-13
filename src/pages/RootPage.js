import * as React from 'react';
import { Container } from 'reactstrap';
import NavBar from '../components/navigation/NavBar';
import LoginRegisterNav from '../components/navigation/LoginRegisterNav';
import Footer from '../components/navigation/Footer';
import Modals from '../components/navigation/Modals';
import { css } from 'glamor';
import { getCurrentUser } from '../actions/currentUser';
import { connect } from 'react-redux';

const minHeight = css({
  minHeight: '85vh',
});

class RootPage extends React.Component {
  // Load current user
  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div>
        <Container fluid>
          <LoginRegisterNav />
        </Container>
        <Container fluid style={{background: '#cfcfcf'}}>
          <NavBar />
        </Container>
        <Container fluid className={`${minHeight}`}>
          <Modals />
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }

}

export default connect(null, { getCurrentUser })(RootPage);
