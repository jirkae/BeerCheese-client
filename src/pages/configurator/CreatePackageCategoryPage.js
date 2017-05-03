import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
} from 'reactstrap';
import ProductList from '../../components/product/ProductList';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { categoriesApi } from '../../actions/categories';


class CreatePackageCategoryPage extends Component {
  state = {
    currentCategory: null,
    filterCategoryId: null
  };

  componentDidMount() {
    this.setCurrentCategory();
  }

  componentDidUpdate() {
    if (this.state.currentCategory === null || (parseInt(this.state.currentCategory.id, 10) !== parseInt(this.props.location.query.category, 10) && this.props.location.query.category !== undefined)) {
      this.setCurrentCategory();
    }
  }

  setCurrentCategory() {
    const { categories } = this.props.categories;
    const currentCategory = this.props.location.query.category;
    if (categories !== null && categories.length > 0) {
      if (currentCategory === undefined) {
        this.setState({ currentCategory: categories[0].category, filterCategoryId: categories[0].category.id });
      } else {
        categories.forEach((category) => {
          category = category.category;
          if (parseInt(category.id, 10) === parseInt(currentCategory, 10)) {
            this.setState({ currentCategory: category, filterCategoryId: category.id });
          }
        });
      }
    }
  }

  renderSubCategories() {
    const categories = this.props.categories;
    const { currentCategory } = this.state;
    if (currentCategory === null) {
      return null;
    }
    return categories.categories.map((category) => {
      category = category.category;
      if (category.mainCategory === currentCategory.links.self) {
        return (<NavItem key={category.id}>
          <NavLink
            tag={Link}
            to="#"
            onClick={(e)=>{this.setState({filterCategoryId: category.id}); e.preventDefault();}}
          >
            {category.name}
          </NavLink>
        </NavItem>)
      } else {
        return null;
      }
    });
  }


  render() {
    return (
      <Row>
        <Col xl="2" lg="2" md="4" sm="12" xs="12">
          <Nav vertical>
            <NavbarBrand>{localizedTexts.HomePage.categories}</NavbarBrand>
            {this.renderSubCategories()}
          </Nav>
        </Col>
        <Col xl="10" lg="10" md="8" sm="12" xs="12">
          <ProductList itemSize="250" categoryId={this.state.filterCategoryId} addCartButton={true}/>
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

export default connect(mapSateToProps, { categoriesApi })(CreatePackageCategoryPage);