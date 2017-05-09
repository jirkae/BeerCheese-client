import React, { Component } from 'react';
import { Link } from 'react-router';
import { Row, Col, Button, NavLink, Nav, ButtonGroup } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';
import { PACKAGE_CATEGORY_PATH } from '../../util/util';


const otherLinks = [
  /*  {
      name: localizedTexts.PackageCreationNav.beer,
      link: "/create-package",
    },
    {
      name: localizedTexts.PackageCreationNav.supplements,
      link: "/create-package/supplement",
    },
    {
      name: localizedTexts.PackageCreationNav.packages,
      link: "/create-package/package",
    },*/
  {
    name: localizedTexts.PackageCreationNav.message,
    link: "/message",
    validation: (cart, currentPackage) => {
      let isValidate = false;
      cart.packages.forEach((_package) => {
        if (_package === currentPackage) {
          _package.items.forEach((item) => {
            if (item.category === PACKAGE_CATEGORY_PATH) {
              isValidate = true;
            }
          });
        }
      });
      return isValidate;
    },
    validationMsg: 'vyberte balení'
  },
  {
    name: localizedTexts.PackageCreationNav.summary,
    link: "/summary",
    validation: (cart) => {return true;}
  },
];

class PackageOverviewNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentLinkIndex: 0,
      links: otherLinks
    }
  }

  componentDidMount() {
    this.updateCurrentLinkIndex();
  }

  componentWillReceiveProps(props, newProps) {
    this.updateLinks(props);
  }

  doRedirect(link) {
    const urlParts = this.context.router.getCurrentLocation().pathname.split('/');
    if (link.validation(this.props.cart, this.props.currentPackage)) {
      this.context.router.push('/' + urlParts[1] + (typeof urlParts[2] !== 'undefined' && parseInt(urlParts[2],10) >= 0 ? '/'+urlParts[2] : '') + link.link);
      this.updateCurrentLinkIndex();
    } else {
      alert(link.validationMsg);
    }
  }

  updateCurrentLinkIndex() {
    const urlParts = this.context.router.getCurrentLocation().pathname.split('/');
    this.state.links.every((link, i) => {
      if ('/' + urlParts[1] + (typeof urlParts[2] !== 'undefined' && parseInt(urlParts[2],10) >= 0 ? '/'+urlParts[2] : '') + link.link === this.context.router.getCurrentLocation().pathname + this.context.router.getCurrentLocation().search) {
        this.setState({ currentLinkIndex: i });
        return false;
      }
      return true;
    });
  }

  updateLinks(props) {
    const { categories } = props.categories;
    let links = [];
    if (categories !== undefined && categories !== null) {
      categories.forEach((category) => {
        category = category.category;
        if (typeof category.mainCategory === 'undefined') {
          let link = {
            name: category.name,
            link: "?category=" + category.id,
          };
          if (links.length === 0) {
            link.validation = (cart) => {return true;};
          } else {
            link.validation = (cart) => {
              let isValidate = false;
              cart.packages.forEach((_package) => {
                if (_package === props.currentPackage) {
                  isValidate = _package.items.length > 0;
                }
              });
              return isValidate;
            };
            link.validationMsg = 'Vyberte alespoň 1 pivo';
          }
          links.push(link);
        }
      });
    }
    links = links.concat(otherLinks);
    this.setState({ links: links });
    setTimeout(() => {
      this.updateCurrentLinkIndex();
    }, 50);
  }

  render() {
    const { currentLinkIndex, links } = this.state;

    const backNextButton = (modifyIndex, text) => {
      if (typeof links[currentLinkIndex + modifyIndex] !== 'undefined') {
        return (
          <NavLink tag={Link}
            onClick={() => { this.doRedirect(links[currentLinkIndex + modifyIndex]) }}><Button>{text}</Button></NavLink>
        );
      } else {
        return null;
      }
    }

    return (
      <Row style={{ "marginTop": '30px', "marginBottom": '30px' }}>
        <Col xl="2" lg="2" md="2" sm="2" xs="3">
          {backNextButton(-1, localizedTexts.PackageOverviewNav.back)}
        </Col>
        <Col xl="8" lg="8" md="8" sm="8" xs="6">
          <Nav>
            <ButtonGroup className="mr-auto ml-auto">
              {links.map((link, i) => {
                return (
                  <Button key={i} onClick={() => { this.doRedirect(link); }} color={i === this.state.currentLinkIndex ? 'info' : 'secondary'}>{link.name}</Button>
                );
              })}
            </ButtonGroup>
          </Nav>
        </Col>
        <Col xl="2" lg="2" md="2" sm="2" xs="3" className="text-right">
          {backNextButton(1, localizedTexts.PackageOverviewNav.next)}
        </Col>
      </Row>
    );
  }
};

PackageOverviewNav.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object
}

const mapSateToProps = state => ({
  categories: state.categories,
  cart: state.cart
});

export default connect(mapSateToProps, {})(PackageOverviewNav);