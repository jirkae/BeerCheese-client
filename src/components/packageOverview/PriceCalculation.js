import React, {Component} from 'react';
import { Card, CardHeader, CardBlock, CardFooter, Table } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';


class PriceCalculation extends Component {

    getPackagesPrice() {
        let price = 0;
        const {cart} = this.props;
        cart.packages.forEach((_package) => {
            if (_package.isCreating !== true) {
                let packagePrice = 0;
                _package.items.forEach((item) => {
                    packagePrice += item.price;
                });
                price += packagePrice * _package.count;
            }
        });
        return price;
    }

    render() {
        const {cart} = this.props;
        const packagesPrice = this.getPackagesPrice();
        const shippingPrice = cart.shipping !== undefined ? cart.shipping.price : 0;

        return(
            <Card>
                <CardHeader>{localizedTexts.PackageOverview.priceCalculation.title}</CardHeader>
                <CardBlock>
                    <Table>
                        <tbody>
                            <tr>
                                <td>{localizedTexts.PackageOverview.priceCalculation.packages}</td>
                                <td className="text-right">{packagesPrice} Kč</td>
                            </tr>
                            {cart.shipping !== undefined &&
                                <tr>
                                    <td>{localizedTexts.PackageOverview.priceCalculation.delivery}</td>
                                    <td className="text-right">{shippingPrice}</td>
                                </tr>
                            }
                            <tr>
                                <td>{localizedTexts.PackageOverview.priceCalculation.payment}</td>
                                <td className="text-right">23</td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBlock>
                <CardFooter>{localizedTexts.PackageOverview.priceCalculation.total}: <strong>{packagesPrice + shippingPrice} Kč</strong></CardFooter>
            </Card>
        );
    }
}


const mapSateToProps = state => ({
  cart: state.cart
});

export default connect(mapSateToProps, {  })(PriceCalculation);