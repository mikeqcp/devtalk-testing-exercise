import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import messages from './home.messages';
import AverageValue from './averageValue/averageValue.component';
import TeamsList from './teamsList/teamsList.component';
import RangeSelectorContainer from './rangeSelector/rangeSelector.component';
import LanguageSelector from './languageSelector/languageSelector.component';


export default class Home extends PureComponent {
  static propTypes = {
    teams: PropTypes.object,
    teamsBySquadValue: PropTypes.object,
    rangeValues: PropTypes.object,
    language: PropTypes.string.isRequired,
    getTeams: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    setRangeValues: PropTypes.func.isRequired,
    arithmeticAverage: PropTypes.number.isRequired,
    router: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.getTeams();
  }

  render() {
    return (
      <div className="home">

        <Helmet
          title="Homepage"
        />

        <div className="home__header">
          <h1 className="home__title">
            <i className="home__title-logo" />
            <FormattedMessage {...messages.welcome} />
          </h1>
        </div>

        <div className="home__sub-header">
          <LanguageSelector
            language={this.props.language}
            setLanguage={this.props.setLanguage}
            router={this.props.router}
          />

          <AverageValue arithmeticAverage={this.props.arithmeticAverage} />
        </div>

        <RangeSelectorContainer
          rangeValues={this.props.rangeValues}
          setRangeValues={this.props.setRangeValues}
        />

        <TeamsList
          items={this.props.teamsBySquadValue}
        />
      </div>
    );
  }
}
