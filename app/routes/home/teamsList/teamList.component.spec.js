import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import React from 'react';
import { times } from 'lodash';
import { FormattedMessage } from 'react-intl';
import TeamList from './teamsList.component';
import Team from '../team/team.component';

const COUNT = 5;

describe('TeamList:component', () => {
  const items = fromJS(times(COUNT, (i) => ({
    crestUrl: 'http://example.com/logo.png',
    name: 'name' + i,
    squadMarketValue: '25,000,000 €',
  })));
  const el = shallow(<TeamList items={items} />);

  it('should render all items list', () => {
    expect(el.find(Team)).to.have.length(COUNT);
  });

  it('should pass correct props to team item', () => {
    expect(el.find(Team).at(3)).prop('data').to.be.equal(items.get(3));
  });

  it('should display title', () => {
    expect(el.find(FormattedMessage)).to.have.length(1);
  });
});
