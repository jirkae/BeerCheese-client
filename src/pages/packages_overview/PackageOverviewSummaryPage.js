import React from 'react';
import { Row, Col } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';

const packageOverviewSummaryPage = (props) => (

      <Row>
        <Col xs={6}>
          <h4>{localizedTexts.PackageOverview.summary.personal}</h4>
          Karel Novák<br />
          Korunní 127<br />
          125 44<br />
          karel@email.cz<br /><br />
          <h4>{localizedTexts.PackageOverview.summary.delivery}</h4>
          PPL<br /><br />
          <h4>{localizedTexts.PackageOverview.summary.payment}</h4>
          Dobírka
        </Col>
        <Col xs={6}>
          <h4>{localizedTexts.PackageOverview.summary.packages}</h4>
          Balíček 1<br />
          Balíček 2<br />
        </Col>
      </Row>
);

export default packageOverviewSummaryPage;
