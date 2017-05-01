import React from 'react';
import {
  Modal, ModalBody, Container, Row, Form, FormGroup,
  Label, Input, Button, Col, InputGroupAddon, InputGroup,
} from 'reactstrap';

import api from '../../api';

const CATEGORIES_URL = '/api/categories/';
const SUPPLIERS_URL = '/api/suppliers/';

export default class EditProductAdmin extends React.Component {

  state = {
    categories: [],
    subCategories: [],
    suppliers: [],
    name: this.props.data.name,
    price: this.props.data.price,
    priceAfterDiscount: this.props.data.priceAfterDiscount,
    quantity: this.props.data.quantity,
    description: this.props.data.description || "",
    category: this.props.data.category.replace(CATEGORIES_URL,''),
    supplier: this.props.data.supplier.replace(SUPPLIERS_URL,'')
  };

  componentDidMount() {
    this.loadSuppliers();
    this.loadCategories();
    this.loadSubCategories(1);
  }

  onSubmit = (event) => {
    event.preventDefault();
    let data = {
      product: {
        name: this.state.name,
        price: this.state.price,
        priceAfterDiscount: this.state.priceAfterDiscount,
        quantity: this.state.quantity,
        description: this.state.description || "",
        category: CATEGORIES_URL + this.state.category,
        supplier: SUPPLIERS_URL + this.state.supplier
      }
    };
    api.put('products/' + this.props.data.id, data)
      .then(() => {
        this.props.hideModals();
      })
      .catch(response => {
        console.log('error ', response);
      });
  };

  loadSuppliers = () => {
    api.get('suppliers')
      .then((response) => {
        if (response) {
          this.setState({
            suppliers: response.data.suppliers.items.map(item => {
              return item.supplier
            })
          });
        }
      })
      .catch(response => {
        console.log('error ', response);
      });
  };

  loadCategories = () => {
    api.get('categories')
      .then(response => {
        if (response) {
          this.setState({
            categories: response.data.categories.items.map(item => {
              return item.category
            })
          });
        }
      })
      .catch(response => {
        console.log('error ', response);
      });
  };

  loadSubCategories = (subCategoryId) => {
    api.get('categories?mainCategory=' + subCategoryId)
      .then(response => {
        if (response) {
          this.setState({
            subCategories: response.data.categories.items.map(item => {
              return item.category
            })
          });
        }
      })
      .catch(response => {
        console.log('error ', response);
      });
  };

  onCategoryChosen = (event) => {
    this.loadSubCategories(event.target.value);
    this.onInputChange(event);
  };

  renderCategoryOptions = () => {
    return this.state.categories.map(category => {
      return (
        <option key={category.id} value={category.id}>{category.name}</option>
      );
    });
  };

  renderSubCategoryOptions = () => {
    return this.state.subCategories.map(category => {
      return (
        <option key={category.id} value={category.id}>{category.name}</option>
      );
    });
  };

  renderSupplierOptions = () => {
    return this.state.suppliers.map(supplier => {
      return (
        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
      );
    });
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  render() {
    return (
      <Modal isOpen={true} toggle={this.props.hideModals}>
        <ModalBody>
          <Container>
            <Row>
              <h3>Upravit produkt</h3>
              <br/> <br/>
              <Form onSubmit={this.onSubmit}>

                <FormGroup row>
                  <Label for="name" sm={4}>Název</Label>
                  <Col sm={8}>
                    <Input defaultValue={this.props.data.name}
                           required type="text" name="name" id="name"/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="price" sm={4}>Cena</Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Input defaultValue={this.props.data.price}
                             onChange={this.onInputChange}
                             required type="number" name="price" id="price"/>
                      <InputGroupAddon>Kč</InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="priceAfterDiscount" sm={4}>Cena po slevě</Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Input defaultValue={this.props.data.priceAfterDiscount}
                             onChange={this.onInputChange}
                             type="number" name="priceAfterDiscount" id="priceAfterDiscount"/>
                      <InputGroupAddon>Kč</InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="quantity" sm={4}>Skladem</Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Input defaultValue={this.props.data.quantity}
                             onChange={this.onInputChange}
                             type="number" name="quantity" id="quantity"/>
                      <InputGroupAddon>Ks</InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="category" sm={4}>Kategorie</Label>
                  <Col sm={8}>
                    <Input onChange={this.onCategoryChosen} required type="select" name="category"
                           id="category">
                      {this.renderCategoryOptions()}
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="productSubCategory" sm={4}>Podkategorie</Label>
                  <Col sm={8}>
                    <Input disabled={this.state.subCategories.length === 0}
                           required type="select" name="productSubCategory" id="productSubCategory">
                      {this.renderSubCategoryOptions()}
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="supplier" sm={4}>Dodavatel</Label>
                  <Col sm={8}>
                    <Input type="select" name="supplier" id="supplier">
                      {this.renderSupplierOptions()}
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="description" sm={4}>Popis</Label>
                  <Col sm={8}>
                    <Input defaultValue={this.props.data.description}
                           onChange={this.onInputChange}
                           type="textarea" name="description" id="description"/>
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{size: 10, offset: 2}}>
                    <Button type="submit">Upravit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    );
  }
};
