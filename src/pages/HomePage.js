import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from 'reactstrap';
import ProductList from '../components/product/ProductList';
import WelcomeWarningPopUp from '../components/popup/WelcomeWarningPopUp';
import localizedTexts from '../text_localization/LocalizedStrings';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

const mockBeerCategories = ['black', 'lager'];
const mockSupplementsCategories = ['glass', 'beerMat'];

export default class HomePage extends Component {
  state = {
    beerCategoryExpanded: false,
    supplCategoryExpanded: false
  };

  renderNavBeerItems = () => {
    if (this.state.beerCategoryExpanded) {
      return mockBeerCategories.map(value => (
        <NavItem>
          <NavLink href="#">{localizedTexts.categories[value]}</NavLink>
        </NavItem>
      ));
    }
    return null;
  };

  renderNavSupplementsItems = () => {
    if (this.state.supplCategoryExpanded) {
      return mockSupplementsCategories.map(value => (
        <NavItem>
          <NavLink href="#">{localizedTexts.categories[value]}</NavLink>
        </NavItem>
      ));
    }
    return null;
  };

  render() {
    return (
      <Row>
        <WelcomeWarningPopUp />
        <Col xl="3" lg="3" md="4" sm="12" xs="12">
          <Nav pills vertical>
            <NavbarBrand>{localizedTexts.HomePage.categories}</NavbarBrand>
            <NavItem>
              <NavLink
                onClick={() =>
                  this.setState({
                    beerCategoryExpanded: !this.state.beerCategoryExpanded
                  })}
                href="#"
              >
                {localizedTexts.HomePage.beer}
              </NavLink>
            </NavItem>
            {this.renderNavBeerItems()}
            <NavItem>
              <NavLink
                onClick={() =>
                  this.setState({
                    supplCategoryExpanded: !this.state.supplCategoryExpanded
                  })}
                href="#"
              >
                {localizedTexts.HomePage.supplements}
              </NavLink>
            </NavItem>
            {this.renderNavSupplementsItems()}
            <NavItem>
              <Link to="/create-package">
                <Button color="secondary" size="lg">{localizedTexts.HomePage.createPackage} <FontAwesome style={{fontSize: '25px'}} name="gift" /></Button>
              </Link>
            </NavItem>
          </Nav>
        </Col>
        <Col xl="9" lg="9" md="8" sm="12" xs="12" style={{paddingTop: '50px'}}>
          <ProductList itemSize="250"/>
          <Button>{localizedTexts.HomePage.previous}</Button>
          <Button>{localizedTexts.HomePage.next}</Button>
        </Col>
      </Row>
    );
  }
}
