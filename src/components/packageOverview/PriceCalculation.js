import React from 'react';
import { Card, CardHeader, CardBlock, CardFooter, Table } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';


export default priceCalculation => (
    <Card>
        <CardHeader>{localizedTexts.PackageOverview.priceCalculation.title}</CardHeader>
        <CardBlock>
            <Table>
                <tbody>
                    <tr>
                        <td>{localizedTexts.PackageOverview.priceCalculation.packages}</td>
                        <td className="text-right">2 000</td>
                    </tr>
                    <tr>
                        <td>{localizedTexts.PackageOverview.priceCalculation.delivery}</td>
                        <td className="text-right">50</td>
                    </tr>
                    <tr>
                        <td>{localizedTexts.PackageOverview.priceCalculation.payment}</td>
                        <td className="text-right">23</td>
                    </tr>
                </tbody>
            </Table>
        </CardBlock>
        <CardFooter>{localizedTexts.PackageOverview.priceCalculation.total}: <strong>1 500 Kč</strong></CardFooter>
    </Card>
)