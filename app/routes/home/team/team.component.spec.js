import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import React from 'react';
import Team from './team.component';

describe('Team:component', () => {
  const props = fromJS({
    crestUrl: 'http://example.com/logo.png',
    name: 'Example team name',
    squadMarketValue: '25,000,000 €',
  });
  const el = shallow(<Team data={props} />);

  it('should render team logo', () => {
    const expectedUrl = `url(${props.get('crestUrl')})`;
    expect(el.find('.team-logo')).to.have.style('background-image').equal(expectedUrl);
  });

  it('should render team name', () => {
    expect(el.find('.team-name').text()).to.contain(props.get('name'));
  });

  it('should render team value', () => {
    expect(el.find('.team-value').text()).to.contain(props.get('squadMarketValue'));
  });
});
