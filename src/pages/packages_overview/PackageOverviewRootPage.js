import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PackageOverviewNav from '../../components/navigation/PackageOverviewNav';
import PriceCalculation from '../../components/packageOverview/PriceCalculation';

const packageOverviewRootPage = (props) => (
    <Container>
        <PackageOverviewNav />
        <Row>
            <Col xs={8}>
                {props.children}
            </Col>
            <Col xs={4}>
                <PriceCalculation />
            </Col>
        </Row>
    </Container>
)

export default packageOverviewRootPage;