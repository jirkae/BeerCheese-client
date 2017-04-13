import React, { Component } from 'react';
import {
    Nav,
    Row,
    Col,
    NavItem,
    NavLink,
} from 'reactstrap';
import { Link } from 'react-router';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';
import { openModal } from '../../actions/openModal';
import { logout } from '../../actions/auth';

const AuthNav = ({ isAuth, children }) => {
    return isAuth ? <div>{children}</div> : null;
};

class LoginRegisterNav extends Component {
    render() {
        const auth = this.props.auth;
        return (
            <Row>
                <Col xs={12}>
                    <Nav className="pull-right">
                        <NavItem tag={AuthNav} isAuth={auth.isAuthenticated}>
                            <NavLink tag={Link} to="#" onClick={(e) => {e.preventDefault(); this.props.logout();}}>
                                {localizedTexts.NavBar.logOut}
                            </NavLink>
                        </NavItem>
                        <NavItem tag={AuthNav} isAuth={!auth.isAuthenticated}>
                            <NavLink
                                tag={Link}
                                to="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.props.openModal({ name: 'logIn', data: null })}}
                            >
                                {localizedTexts.NavBar.logIn}
                            </NavLink>
                        </NavItem>
                        <NavItem tag={AuthNav} isAuth={!auth.isAuthenticated}>
                            <NavLink tag={Link} to="/register">
                                {localizedTexts.NavBar.signUp}
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {
    openModal,
    logout
})(LoginRegisterNav);
