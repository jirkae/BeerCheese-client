import React from 'react';
import { Container, Button, Table, Jumbotron } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';
import { openModal } from '../../actions/openModal';
import api from '../../api';

class AdminOrdersPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    api.get('orders')
      .then(response => {
        if (response) {
          this.setState({
            orders: response.data.orders.items.map(item => {
              return item.order;
            })
          });
        }
      })
      .catch(response => {
        console.log('error ', response);
      });
  }

  getTableContent = () => {
    return this.state.orders.map(order => {
      return (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.user}</td>
          <td>{order.status}</td>
          <td>
            <Button
              onClick={() => this.props.openModal({name: 'editOrderAdmin', data: order})}
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
          <h1 className="display-4">{localizedTexts.NavBar.orders}</h1>
        </Jumbotron>
        <Container>
          <Table striped>
            <thead>
            <tr>
              <th>{localizedTexts.AdminOrdersPage.id}</th>
              <th>{localizedTexts.AdminOrdersPage.customer}</th>
              <th>{localizedTexts.AdminOrdersPage.state}</th>
              <th />
            </tr>
            </thead>
            <tbody>
            {this.getTableContent()}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default connect(null, {
  openModal
})(AdminOrdersPage);

