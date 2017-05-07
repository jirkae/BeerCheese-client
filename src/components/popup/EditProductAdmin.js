import React from 'react';
import {
  Modal, ModalBody, Container, Row, Form, FormGroup,
  Label, Input, Button, Col, InputGroupAddon, InputGroup,
} from 'reactstrap';
import Loading from '../images/Loading';
import api from '../../api';

const CATEGOIRES_API_PREFIX = '/api/categories/';
const SUPPLIERS_API_PREFIX = '/api/suppliers/';
export default class EditProductAdmin extends React.Component {

  state = {
    categories: null,
    subCategories: null,
    suppliers: [],
    product: {
      id: null,
      name: null,
      price: null,
      priceAfterDiscount: null,
      quantity: null,
      description: null,
      category: null,
      supplier: null
    }
  };
  productSubCategory = null;
  productMainCategory = null;
  initialLoadSubCat = true;
  initialLoadMainCat = true;

  componentDidMount() {
    this.initialLoadSubCat = true;
    this.initialLoadMainCat = true;
    this.loadProduct().then(() => {
      api.get('categories/' + this.state.product.category.replace(CATEGOIRES_API_PREFIX, ''))
        .then(response => {
          const { category } = response.data;
          if(category.mainCategory){
            this.productSubCategory = category.id;
            this.productMainCategory = parseInt(category.mainCategory.replace(CATEGOIRES_API_PREFIX, ''), 10);
          }else{
            this.productMainCategory = category.id;
          }
          this.loadCategories();
          this.loadSubCategories(this.productMainCategory);
        });
    });
    this.loadSuppliers();
  }

  onSubmit = (event) => {
    event.preventDefault();
    const category = this.state.subCategories.length > 0 && this.productSubCategory
      ? this.productSubCategory
      : this.state.product.category;
    let data = {
      product: {
        name: this.state.product.name,
        price: this.state.product.price,
        priceAfterDiscount: this.state.product.priceAfterDiscount,
        quantity: this.state.product.quantity,
        description: this.state.product.description || "",
        category: category,
        supplier: this.state.product.supplier
      }
    };
    console.log("Date that will be send to backend: ", data);
    api.put('products/' + this.state.product.id, data)
      .then(() => {
        data.id = this.state.product.id;
        this.props.data.refreshCB(data.product);
        this.props.hideModals();
      })
      .catch(response => {
        console.log('error ', response);
      });
  };

  loadProduct = () => {
    return api.get('products/' + this.props.data.id)
      .then((response) => {
        if(response) {
          this.setState({
            product: response.data.product
          })
        }
      })
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
          let allCategories = response.data.categories.items.map(item => {
            return item.category
          });
          let mainCategories = allCategories.filter(category => {
            if(!category.mainCategory)
              return category;
            return null;
          });
          this.setState({
            categories: mainCategories
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
          let subCategories = response.data.categories.items.map(item => {
            return item.category
          });
          this.setState({subCategories});
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
    let categoriesRendered = this.state.categories.map(category => {
      return (
        <option
          key={category.id}
          value={category.id}
        >
          {category.name}
          </option>
      );
    });
    this.initialLoadMainCat = false;
    return categoriesRendered;
  };

  renderSubCategoryOptions = () => {
    let firstRun = true;
    let subCatRendered = this.state.subCategories.map(category => {
      if(firstRun){
        this.productSubCategory = CATEGOIRES_API_PREFIX + category.id;
        firstRun = false;
      }
      return (
        <option
          key={category.id}
          value={category.id}
        >
          {category.name}
          </option>
      );
    });
    this.initialLoadSubCat = false;
    return subCatRendered;
  };

  renderSupplierOptions = () => {
    return this.state.suppliers.map(supplier => {
      return (
        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
      );
    });
  };

  onInputChange = (event) => {
    let { product } = this.state;
    const { name, value } = event.target;
    if(name === 'category')
      product[name] = CATEGOIRES_API_PREFIX + value;
    else if(name === 'supplier')
      product[name] = SUPPLIERS_API_PREFIX + value;
    else
      product[name] = value;
    this.setState({
      product: product
    });
  };

  onInputChangeSubCategory = (event) => {
    this.productSubCategory = event.target.value;
  };

  getForm = () => {
    if(this.state.product.name) {
      const supplier = parseInt(this.state.product.supplier.replace(SUPPLIERS_API_PREFIX, ''), 10);
      return (
        <Form onSubmit={this.onSubmit}>

          <FormGroup row>
            <Label for="name" sm={4}>Název</Label>
            <Col sm={8}>
              <Input value={this.state.product.name}
                     onChange={this.onInputChange}
                     required type="text" name="name" id="name"/>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="price" sm={4}>Cena</Label>
            <Col sm={8}>
              <InputGroup>
                <Input value={this.state.product.price}
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
                <Input value={this.state.product.priceAfterDiscount}
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
                <Input value={this.state.product.quantity}
                       onChange={this.onInputChange}
                       type="number" name="quantity" id="quantity"/>
                <InputGroupAddon>Ks</InputGroupAddon>
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="category" sm={4}>Kategorie</Label>
            <Col sm={8}>
              {
                this.state.categories
                  ?
                  <Input onChange={this.onCategoryChosen} required type="select" name="category"
                         id="category" defaultValue={this.initialLoadMainCat && this.productMainCategory ? this.productMainCategory : ''}>
                    {this.renderCategoryOptions()}
                  </Input>
                  :
                  <Loading />
              }
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="productSubCategory" sm={4}>Podkategorie</Label>
            <Col sm={8}>
              {
                this.state.subCategories
                  ?
                  <Input disabled={this.state.subCategories.length === 0}
                         onChange={this.onInputChangeSubCategory}
                         required type="select" name="productSubCategory" id="productSubCategory"
                          defaultValue={this.initialLoadSubCat && this.productSubCategory ? this.productSubCategory : ''}
                  >
                    {this.renderSubCategoryOptions()}
                  </Input>
                  :
                  <Loading />
              }
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="supplier" sm={4}>Dodavatel</Label>
            <Col sm={8}>
              {
                this.state.suppliers
                  ?
                  <Input
                    type="select"
                    name="supplier"
                    onChange={this.onInputChange}
                    id="supplier"
                    defaultValue={supplier ? supplier : ''}
                  >
                    {this.renderSupplierOptions()}
                  </Input>
                  :
                  <Loading />
              }
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="description" sm={4}>Popis</Label>
            <Col sm={8}>
              <Input value={this.state.product.description}
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
      )
    }else{
      return (
        <Loading />
      )
    }
  }

  render() {
    return (
      <Modal isOpen={true} toggle={this.props.hideModals}>
        <ModalBody>
          <Container>
            <Row>
              <h3>Upravit produkt</h3>
              <br/> <br/>
              { this.getForm() }
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    );
  }
};
