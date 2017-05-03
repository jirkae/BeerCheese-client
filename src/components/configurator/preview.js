import React, {Component} from 'react';
import { Card, CardBlock, CardFooter, Row, Col, Input, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { updateCart } from '../../actions/cart';

class Preview extends Component {
    removeItem(itemToRemove) {
        let newCart = Object.assign({}, this.props.cart);
        newCart.packages.forEach((_package) => {
            if (_package.isCreating) {
                _package.items.forEach((item, key) => {
                    if (item.id === itemToRemove.id) {
                        _package.items.splice(key,1);
                    }
                });
            }
        });
        this.props.updateCart(newCart);
    }

    renderItems() {
        const {cart} = this.props;
        if (cart.packages !== undefined && typeof cart.packages.length !== 'undefined') {
            return cart.packages.map((_package) => {
                if (_package.isCreating) {
                    return _package.items.map((item) => {
                        return (
                            <Card style={{margin: '10px'}}>
                                <CardBlock>
                                    <p style={{width: '130px', margin: 0}}>{item.name}</p>
                                </CardBlock>
                                <img width={130} style={{margin: 'auto'}} src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="product" />
                                <CardBlock>
                                    <Button size="sm"
                                    onClick={(e) => {this.removeItem(item);}}>Odebrat</Button>
                                </CardBlock>
                            </Card> 
                        );
                    });
                }
                return null;
            });
        }
        return null;
    }

    getPackagePrice() {
        const {cart} = this.props;
        let price = 0;
        cart.packages.forEach((_package) => {
            if (_package.isCreating) {
                _package.items.forEach((item) => {
                    price += item.price;
                });
            }
        });
        return price;
    }

    getPackageItemsCount() {
        const {cart} = this.props;
        let count = 0;
        cart.packages.forEach((_package) => {
            if (_package.isCreating) {
                count = _package.items.length;
            }
        });
        return count;
    }

    render() {
        return (
            <Card>
                <CardBlock>
                    <Row>
                        {this.renderItems()}
                    </Row>
                </CardBlock>
                <CardFooter style={{background: 'none'}}>
                    <Row>
                        <Col xs={6}>
                            <Label check>
                                <Input type="checkbox" disabled/>{' '}
                                Balení
                            </Label>
                        </Col>
                        <Col xs={6}>
                            <Label check>
                                <Input type="checkbox" disabled checked/>{' '}
                                Vzkaz
                            </Label>
                        </Col>
                    </Row>
                </CardFooter>
                <CardFooter>
                    <strong style={{fontSize: '24px'}}>Cena celkem: <span style={{fontSize: '20px'}}>{this.getPackagePrice()} Kč</span></strong>
                    <span className="pull-right">{this.getPackageItemsCount()}/9</span>
                </CardFooter>
            </Card>
        );
    }
}

const mapSateToProps = state => ({
  cart: state.cart
});

export default connect(mapSateToProps, { updateCart })(Preview);