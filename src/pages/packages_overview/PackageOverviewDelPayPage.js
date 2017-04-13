import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';

export default class PackageOverviewDelPayPage extends Component {
  render() {

    function makeOptions(name, options) {
      let items = [];
      options.forEach(function (data) {
        items.push(
          <Row key={name + '-' + data.value}>
            <Col xs={8}>
              <label><input type="radio" name={name} value={data.value} /> {data.label}</label>
            </Col>
            <Col xs={4} className="text-right">{data.price}</Col>
          </Row>
        );
      });
      return items;
    }

    function makeDeliveryOptions() {
      var options = [
        { label: 'Česká pošta', value: 'post', price: 15 },
        { label: 'PPL', value: 'ppl', price: 25 },
      ];

      return makeOptions('delivery', options);
    }

    function makePaymentOptions() {
      var options = [
        { label: 'Dobírka', value: 'cod', price: 55 },
        { label: 'Platební karta', value: 'card', price: 0 },
      ];

      return makeOptions('payment', options);
    }

    return (
      <div>
        <Row>
          <Col xs={6}>
            <p><strong>{localizedTexts.PackageOverview.delPay.selectDelivery}</strong></p>
            {makeDeliveryOptions()}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <p><strong>{localizedTexts.PackageOverview.delPay.selectPayment}</strong></p>
            {makePaymentOptions()}
          </Col>
        </Row>
      </div>
    );
  }
}
