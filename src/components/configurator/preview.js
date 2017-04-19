import React from 'react';
import { Card, CardBlock, CardFooter, Row, Col, Input, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';

const Preview = ( {products} ) => (
    <Card>
        <CardBlock>
            <Row>
                {products.forEach((item) => {
                    return (
                        <Card>
                            <CardBlock>
                                Pivo
                            </CardBlock>
                            <img width={130} src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="product" />
                            <CardBlock>
                                <Button size="sm">Odebrat</Button>
                            </CardBlock>
                        </Card> 
                    );
                })}
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
            <strong style={{fontSize: '24px'}}>Cena celkem: <span style={{fontSize: '20px'}}>750 Kč</span></strong>
            <span className="pull-right">5/9</span>
        </CardFooter>
    </Card>
)

const mapSateToProps = state => ({
  products: state.configurator.products
});


export default connect(mapSateToProps, {

})(Preview);