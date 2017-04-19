import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import AverageValue from './averageValue.component';

describe('AverageValue:component', () => {
  const arithmeticAverage = 123.001;

  it('should render average value', () => {
    const el = shallow(<AverageValue arithmeticAverage={arithmeticAverage} />);
    expect(el.find(FormattedMessage)).to.have.length(1);
  });

  it('should pass correct values to message', () => {
    const el = shallow(<AverageValue arithmeticAverage={arithmeticAverage} />);
    expect(el.find(FormattedMessage).prop('values')).to.deep.equal({ value: arithmeticAverage });
  });
});
