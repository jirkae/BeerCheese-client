import React, { Component } from 'react';
import { Table, Button, Input } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';

export default class PackageOverviewPackagesPage extends Component {

  constructor(props) {
    super(props);

    this.handleCountChange = this.handleCountChange.bind(this);
  }

  handleCountChange(e) {
    
  }

  render() {
    const makeRow = (i) => {
      return (
        <tr key={i}>
          <td>Balíček 1</td>
          <td><Input type="number" defaultValue="2" onChange={this.handleCountChange} style={{width: '80px'}}/></td>
          <td>750</td>
          <td><Button size="sm" color="secondary">{localizedTexts.PackageOverview.packages.edit}</Button></td>
          <td><Button size="sm" color="secondary">{localizedTexts.PackageOverview.packages.remove}</Button></td>
        </tr>
      );
    }

    const getRows = () => {
      let rows = [];
      for (var i = 0; i < 10; i++) {
        rows.push(makeRow(i));
      }
      return rows;
    }

    return (
      <Table>
        <tbody>
          {getRows()}
        </tbody>
      </Table>
    );
  }
}
