import React from 'react';
import {
  Modal, ModalBody, Container, Row, Form, FormGroup,
  Label, Input, Button, Col, InputGroupAddon, InputGroup,
} from 'reactstrap';

import api from '../../api';

export default class EditProductAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      suppliers: []
    };
  }

  componentDidMount() {
    this.loadSuppliers();
    this.loadCategories();
    this.loadSubCategories(1);
  }

  onSubmit = (event) => {
    event.preventDefault();
    api.put('products/' + this.props.data.id, new FormData(event.target))
      .then(data => {
        console.log('success ', data);
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
                  <Label for="productName" sm={4}>Název</Label>
                  <Col sm={8}>
                    <Input defaultValue={this.props.data.name}
                           required type="text" name="productName" id="productName"/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="productPrice" sm={4}>Cena</Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Input defaultValue={this.props.data.price}
                             required type="number" name="productPrice" id="productPrice"/>
                      <InputGroupAddon>Kč</InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="productPriceAfterDiscount" sm={4}>Cena po slevě</Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Input defaultValue={this.props.data.priceAfterDiscount}
                             type="number" name="productPriceAfterDiscount" id="productPriceAfterDiscount"/>
                      <InputGroupAddon>Kč</InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="productQuantity" sm={4}>Skladem</Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Input defaultValue={this.props.data.quantity}
                             type="number" name="productQuantity" id="productQuantity"/>
                      <InputGroupAddon>Ks</InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="productCategory" sm={4}>Kategorie</Label>
                  <Col sm={8}>
                    <Input onChange={this.onCategoryChosen} required type="select" name="productCategory"
                           id="productCategory">
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
                  <Label for="productSupplier" sm={4}>Dodavatel</Label>
                  <Col sm={8}>
                    <Input type="select" name="productSupplier" id="productSupplier">
                      {this.renderSupplierOptions()}
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="productDesc" sm={4}>Popis</Label>
                  <Col sm={8}>
                    <Input defaultValue={this.props.data.description}
                           type="textarea" name="productDesc" id="productDesc"/>
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
