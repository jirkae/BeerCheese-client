import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { updateCart } from '../../actions/cart';
import { connect } from 'react-redux';
// import localizedTexts from '../../text_localization/LocalizedStrings';

class CreatePackageMessagePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      paperType: null
    }
  }

  componentDidMount() {
    this.props.cart.packages.forEach((_package) => {
      if (_package === this.props.currentPackage) {
        this.setState({
          text: _package.text,
          paperType: _package.paperType
        });
      }
    })
  }

  handleOnChange(data) {
    this.setState(data);
    setTimeout(() => {
      let newCart = Object.assign({}, this.props.cart);
      newCart.packages.forEach((_package) => {
          if (_package === this.props.currentPackage) {
              _package.text = this.state.text;
              _package.paperType = this.state.paperType;
          }
      });
      this.props.updateCart(newCart);
    }, 50);
  }
  
  render() {
    return (
      <Row>
        <Col xl={{ size: 10, offset: 2 }} lg="10" md="8" sm="12" xs="12">
          <Row>
            <Col xs="9">
              <FormGroup>
                <Label for="exampleText">Napsat vzkaz k balíčku</Label>
                <Input type="textarea" name="text" id="exampleText" rows={10} 
                onChange={(e) => {this.handleOnChange({text: e.target.value})}}
                value={this.state.text}/>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup tag="fieldset">
            <legend>Druh papíru</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="paperType" value="normalPaper" checked={this.state.paperType === 'normalPaper'} 
                onChange={(e) => {this.handleOnChange({paperType: "normalPaper"})}} />{' '}
                Normální papír
            </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="paperType" value="specialPaper" checked={this.state.paperType === 'specialPaper'} 
                onChange={(e) => {this.handleOnChange({paperType: "specialPaper"})}} />{' '}
                Speciální papír
            </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="paperType" value="withoutPaper" checked={this.state.paperType === 'withoutPaper'} 
                onChange={(e) => {this.handleOnChange({paperType: "withoutPaper"})}} />{' '}
                Bez papíru
            </Label>
            </FormGroup>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

const mapSateToProps = state => ({
  cart: state.cart
});

export default connect(mapSateToProps, { updateCart })(CreatePackageMessagePage);