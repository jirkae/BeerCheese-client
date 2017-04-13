import React from 'react';
import { Container, Button, Table, Jumbotron } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';
import { openModal } from '../../actions/openModal';
import api from '../../api';

class AdminProductsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    api.get('products')
      .then((response) => {
        if (response) {
          this.setState({
            products: response.data.products.items.map(item => {
              return item.product
            })
          });
        }
      })
      .catch(response => {
        console.log('error ', response);
      });
  }

  getTableContent = () => {
    return this.state.products.map(product => {
      return (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>
            <Button
              onClick={() =>
                this.props.openModal({name: 'editProductAdmin', data: product})}
            >
              <i className="fa fa-pencil"/>
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">{localizedTexts.NavBar.products}</h1>
        </Jumbotron>
        <Container>
          <Table striped>
            <thead>
            <tr>
              <th>{localizedTexts.AdminProductsPage.id}</th>
              <th>{localizedTexts.AdminProductsPage.name}</th>
              <th>{localizedTexts.AdminProductsPage.price}</th>
              <th />
            </tr>
            </thead>
            <tbody>
            {this.getTableContent()}
            </tbody>
          </Table>
          <Button
            onClick={() => this.props.openModal({name: 'newProductAdmin', data: null})}
          >
            {localizedTexts.AdminProductsPage.btnAddProduct}
          </Button>
        </Container>
      </div>
    );
  }
}

export default connect(null, {
  openModal
})(AdminProductsPage);
