import React, { Component } from 'react';
import {
    Card,
    CardBlock,
    CardFooter,
    Row,
    Col,
    Input,
    Label,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { updateCart } from '../../actions/cart';
import { PACKAGE_CATEGORY_PATH } from '../../util/util';
import { APP_URL } from '../../api';

class Preview extends Component {
    removeItem(itemToRemove) {
        let newCart = Object.assign({}, this.props.cart);
        newCart.packages.forEach((_package) => {
            if (_package.isCreating) {
                _package.items.every((item, key) => {
                    if (item.id === itemToRemove.id) {
                        _package.items.splice(key, 1);
                        return false;
                    }
                    return true;
                });
            }
        });
        this.props.updateCart(newCart);
    }

    renderItems() {
        const { cart } = this.props;
        if (cart.packages !== undefined && typeof cart.packages.length !== 'undefined') {
            return cart.packages.map((_package) => {
                if (_package.isCreating) {
                    return _package.items.map((item) => {
                        return (
                            <Card style={{ margin: '1%', width: '30%' }}>
                                <p style={{ margin: '.5rem', fontSize: '12px' }}>{item.name}</p>
                                <img style={{ margin: 'auto', width: 'auto', maxHeight: '80px' }} src={APP_URL + item.image} alt="product" />
                                <CardBlock>
                                    <Button size="sm"
                                        onClick={(e) => { this.removeItem(item); }}>Odebrat</Button>
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
        const { cart } = this.props;
        let price = 0;
        cart.packages.forEach(_package => {
            if (_package.isCreating) {
                _package.items.forEach(item => {
                    price += item.price;
                });
            }
        });
        return parseFloat(price).toFixed(2);
    }

    getPackageItemsCount() {
        const { cart } = this.props;
        let count = 0;
        cart.packages.forEach(_package => {
            if (_package.isCreating) {
                count = _package.items.length;
            }
        });
        return count;
    }


    isTextFilled() {
        let isFilled = false;
        const { cart } = this.props;
        cart.packages.forEach((_package) => {
            if (_package.isCreating) {
                isFilled = _package.text !== undefined && _package.text !== '';
            }
        });
        return isFilled;
    }

    isPackageSelected() {
        let isSelected = false;
        const { cart } = this.props;
        cart.packages.forEach((_package) => {
            if (_package.isCreating) {
                _package.items.forEach((item) => {
                    if (item.category === PACKAGE_CATEGORY_PATH) {
                        isSelected = true;
                    }
                })
            }
        });
        return isSelected;
    }

    render() {
        return (
            <Card>
                <CardBlock>
                    <Row>
                        {this.renderItems()}
                    </Row>
                </CardBlock>
                <CardFooter style={{ background: 'none' }}>
                    <Row>
                        <Col xs={6}>
                            <Label check>
                                <Input type="checkbox" disabled checked={this.isPackageSelected()} />{' '}
                                Balení
                            </Label>
                        </Col>
                        <Col xs={6}>
                            <Label check>
                                <Input type="checkbox" disabled checked={this.isTextFilled()} />{' '}
                                Vzkaz
                            </Label>
                        </Col>
                    </Row>
                </CardFooter>
                <CardFooter>
                    <strong style={{ fontSize: '24px' }}>Cena celkem: <span style={{ fontSize: '20px' }}>{this.getPackagePrice()} Kč</span></strong>
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
