import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { spy } from 'sinon';
import InputRange from 'react-input-range';
import { RangeSelector } from './rangeSelector.component';


describe('RangeSelector: Component', () => {
  const defaultProps = {
    rangeValues: fromJS({
      min: 0,
      max: 600,
    }),
    setRangeValues: () => {},
    intl: {},
  };

  const component = (props) => (
    <RangeSelector {...defaultProps} {...props} />
  );

  it('should render InputRange component', () => {
    const el = shallow(component({}));
    expect(el.find(InputRange)).to.have.length(1);
  });

  it('should set props on InputRange element', () => {
    const el = shallow(component({}));
    const setProps = el.find(InputRange).props();

    expect(setProps.minValue).to.equal(0);
    expect(setProps.maxValue).to.equal(600);
    expect(setProps.value).to.deep.equal({ min: 0, max: 600 });
  });

  it('should call setRangeValues on input range change', () => {
    const setRangeSpy = spy(defaultProps, 'setRangeValues');
    const el = shallow(component({}));
    el.find(InputRange).prop('onChange')('range');
    expect(setRangeSpy.withArgs('range').calledOnce).to.be.true;
  });
});
