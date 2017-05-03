import React, { Component } from 'react';
import { Link } from 'react-router';
import { Row, Col, Button, NavLink, Nav, ButtonGroup } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';


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
    link: "/create-package/message",
  },
  {
    name: localizedTexts.PackageCreationNav.summary,
    link: "/create-package/summary",
  },
];

class PackageOverviewNav extends Component {

  render() {
    var links = [];
    const {categories} = this.props.categories;
    if (categories !== undefined && categories !== null) {
      categories.forEach((category) => {
        category = category.category;
        if (typeof category.mainCategory === 'undefined') {
          links.push({
            name: category.name,
            link: "/create-package?category=" + category.id
          });
        }
      });
    }
    links = links.concat(otherLinks);

    const getCurrentIndex = () => {
      let currentLinkIndex;
      links.forEach((link, i) => {
        if (link.link === this.context.router.getCurrentLocation().pathname) {
          currentLinkIndex = i;
        }
      });
      return currentLinkIndex;
    };

    const backNextButton = (modifyIndex, text) => {
      const currentLinkIndex = getCurrentIndex();
      if (typeof links[currentLinkIndex + modifyIndex] !== 'undefined') {
        return (
          <NavLink tag={Link} to={links[currentLinkIndex + modifyIndex].link}><Button>{text}</Button></NavLink>
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
                  <Button key={i} onClick={() => {this.context.router.push(link.link)}}>{link.name}</Button>
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
  categories: state.categories
});

export default connect(mapSateToProps, { })(PackageOverviewNav);