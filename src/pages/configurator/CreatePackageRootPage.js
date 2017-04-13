import React from 'react';
import {  Row, Col } from 'reactstrap';
import PackageCreationNav from '../../components/navigation/PackageCreationNav';
import Preview from '../../components/configurator/preview';
//import PriceCalculation from '../../components/configurator/PriceCalculation';

const createPackageRootPage = (props) => (
    <div>
        <PackageCreationNav />
        <Row>
            <Col xs={{size: 7, offset: 1}}>
                {props.children}
            </Col>
            <Col xs={{size: 3}}>
                <Preview />
            </Col>
        </Row>
    </div>
)

export default createPackageRootPage;