import React from 'react';
import {
  Modal, ModalBody, Container, Row, Form, FormGroup,
  Label, Input, Button, Col, InputGroupAddon, InputGroup,
} from 'reactstrap';

import api, { imageApi } from '../../api';

export default class NewProductAdmin extends React.Component {

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

  onSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    api.post('products', this.buildNewProductParams(formData))
      .then(response => {
        this.uploadProductImage(response.data.product, formData)
      })
      .catch(response => {
        console.log('error creating product ', response);
      });
  };

  uploadProductImage = (newProduct, formData) => {
    imageApi.instance.headers.post['Content-Type'] = 'multipart/form-data';
    imageApi.post(newProduct.image, formData.get("image"))
      .then(response => {
        console.log('image uploaded ', response);
      })
      .catch(response => {
        console.log('error uploading image ', response);
      });
  };

  buildNewProductParams = (formData) => {
    let result = {};

    for (let pair of formData.entries()) {
      result[pair[0]] = pair[1];
    }
    result.category = "/api/categories/" + formData.get("category");
    result.supplier = "/api/suppliers/" + formData.get("supplier");
    result.subcategory = "/api/subcategories/" + formData.get("subcategory");
    delete result.image;
    return result;
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

  handleImageChange = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        image: upload.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
    return (
      <Modal isOpen={true} toggle={this.props.hideModals}>
        <ModalBody>
          <Container>
            <Row>
              <h3>Přidat produkt</h3>
              <br/> <br/>
              <Form onSubmit={this.onSubmit}>

                <FormGroup row>
                  <Label for="name" sm={4}>Název</Label>
                  <Col sm={8}>
                    <Input required type="text" name="name" id="name"/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="price" sm={4}>Cena</Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Input required type="number" name="price" id="price"/>
                      <InputGroupAddon>Kč</InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="priceAfterDiscount" sm={4}>Cena po slevě</Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Input type="number" name="priceAfterDiscount" id="priceAfterDiscount"/>
                      <InputGroupAddon>Kč</InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="quantity" sm={4}>Skladem</Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Input type="number" name="quantity" id="quantity" defaultValue="0"/>
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
                  <Label for="subcategory" sm={4}>Podkategorie</Label>
                  <Col sm={8}>
                    <Input disabled={this.state.subCategories.length === 0}
                           required type="select" name="subcategory" id="subcategory">
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
                    <Input type="textarea" name="description" id="description"/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="image" sm={4}>Obrázek</Label>
                  <Col sm={8}>
                    <Input type="file" onChange={this.handleImageChange}
                           encType="multipart/form-data" name="image" id="image"/>
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{size: 10, offset: 2}}>
                    <Button type="submit">Vytvořit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    );
  }
}
