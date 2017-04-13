import React from 'react';
import { Container, Button, Table, Jumbotron } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';
import { openModal } from '../../actions/openModal';
import api from '../../api';

class AdminSuppliersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: []
    };
  }

  componentDidMount() {
    api
      .get('suppliers')
      .then(response => {
        if (response) {
          this.setState({
            suppliers: response.data.suppliers.items.map(item => {
              return item.supplier;
            })
          });
        }
      })
      .catch(response => {
        console.log('error ', response);
      });
  }

  getTableContent = () => {
    return this.state.suppliers.map(supplier => {
      return (
        <tr key={supplier.id}>
          <td>{supplier.id}</td>
          <td>{supplier.name}</td>
          <td>
            <Button
              onClick={() =>
                this.props.openModal({
                  name: 'editSupplierAdmin',
                  data: supplier
                })}
            >
              <i className="fa fa-pencil" />
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
          <h1 className="display-4">{localizedTexts.NavBar.suppliers}</h1>
        </Jumbotron>
        <Container>
          <Table striped>
            <thead>
              <tr>
                <th>{localizedTexts.AdminSuppliersPage.id}</th>
                <th>{localizedTexts.AdminSuppliersPage.name}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.getTableContent()}
            </tbody>
          </Table>
          <Button
            onClick={() =>
              this.props.openModal({ name: 'newSupplierAdmin', data: null })}
          >
            {localizedTexts.AdminSuppliersPage.btnAddSupplier}
          </Button>
        </Container>
      </div>
    );
  }
}

export default connect(null, {
  openModal
})(AdminSuppliersPage);
