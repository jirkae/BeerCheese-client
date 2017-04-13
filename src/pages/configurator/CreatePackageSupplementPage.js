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
import ProductList from '../../components/product/ProductList';
import localizedTexts from '../../text_localization/LocalizedStrings';

const mockSupplementsCategories = ['glass', 'beerMat'];

export default class CreatePackageSupplementPage extends Component {
  state = {
    beerCategoryExpanded: false,
    supplCategoryExpanded: false
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
        <Col xl="2" lg="2" md="4" sm="12" xs="12">
          <Nav vertical>
            <NavbarBrand>{localizedTexts.HomePage.categories}</NavbarBrand>
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
          </Nav>
        </Col>
        <Col xl="10" lg="10" md="8" sm="12" xs="12">
            <ProductList itemSize="250" />
            <Button>{localizedTexts.HomePage.previous}</Button>
            <Button>{localizedTexts.HomePage.next}</Button>
        </Col>
      </Row>
    );
  }
}
