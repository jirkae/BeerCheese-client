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
import localizedTexts from '../text_localization/LocalizedStrings';
import FontAwesome from 'react-fontawesome';
import { categoriesApi } from '../actions/categories';
import { Link } from 'react-router';
import Loading from "../components/images/Loading";
import { connect } from 'react-redux';

class HomePage extends Component {
  state = {
    expandedCategory: null
  };

  componentWillMount() {
    // get products
    this.props.categoriesApi();
  }

  renderSubNav(parent) {
    const categories = this.props.categories;
    const expandedCategory = this.state.expandedCategory;
    return categories.categories.map((category) => {
      category = category.category;
      if (category.mainCategory === parent.links.self && expandedCategory !== null && expandedCategory.id === parent.id) {
          return (<NavItem key={category.id} style={{marginLeft: '20px'}}>
            <NavLink
              tag={Link}
              to={'/?category='+category.id}
            >
              {category.name}
            </NavLink>
          </NavItem>)
      } else {
        return null;
      }
    });
  }

  renderNav() {
    const categories = this.props.categories;
    if (categories.isFetching || categories.categories === null) {
      return (<Loading />);
    }
    return categories.categories.map((category) => {
      category = category.category;
      if (typeof category.mainCategory === 'undefined') {
          return (<div  key={category.id}>
          <NavItem>
            <NavLink
              onClick={() =>
                this.setState({
                  expandedCategory: category
                })}
              tag={Link}
              to={'/?category='+category.id}
            >
              {category.name}
            </NavLink>
          </NavItem>
          {this.renderSubNav(category)}
          </div>)
      } else {
        return null;
      }
    });
  }


  render() {
    return (
      <Row>
        <Col xl="3" lg="3" md="4" sm="12" xs="12">
          <Nav pills vertical>
            <NavbarBrand>{localizedTexts.HomePage.categories}</NavbarBrand>
            {this.renderNav()}
            <NavItem>
              <Link to="/create-package">
                <Button color="secondary" size="lg">{localizedTexts.HomePage.createPackage} <FontAwesome style={{fontSize: '25px'}} name="gift" /></Button>
              </Link>
            </NavItem>
          </Nav>
        </Col>
        <Col xl="9" lg="9" md="8" sm="12" xs="12" style={{paddingTop: '50px'}}>
          <ProductList itemSize="250" categoryId={typeof this.props.location.query.category === 'undefined' ? null : this.props.location.query.category}/>
          <Button>{localizedTexts.HomePage.previous}</Button>
          <Button>{localizedTexts.HomePage.next}</Button>
        </Col>
      </Row>
    );
  }
}

const mapSateToProps = state => ({
  categories: state.categories
});

export default connect(mapSateToProps, { categoriesApi })(HomePage);