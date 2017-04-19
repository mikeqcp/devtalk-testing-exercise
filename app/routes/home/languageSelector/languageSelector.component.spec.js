import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import React from 'react';
import { spy } from 'sinon';
import LanguageSelector from './languageSelector.component';
import { appLocales } from '../../../i18n';


describe('Team:component', () => {
  const defaultProps = {
    language: 'en',
    setLanguage: () => {},
    router: {
      push: () => {},
      location: {
        pathname: '',
      },
    },
  };

  const component = (props = {}) => (
    <LanguageSelector {...defaultProps} {...props} />
  );

  it('should set initial value on select element', () => {
    const el = shallow(component());
    expect(el.find('select').prop('value')).to.be.equal(defaultProps.language);
  });

  it('should render all locales options', () => {
    const el = shallow(component());
    expect(el.find('option')).to.have.length(appLocales.length);
  });

  it('should change route on selection', () => {
    const pushSpy = spy(defaultProps.router, 'push');
    const el = shallow(component());
    el.find('select').simulate('change', { target: { value: 'pl' } });
    expect(pushSpy.withArgs('/pl').calledOnce).to.be.true;
  });

  it('should change language on selection', () => {
    const selectLanguageSpy = spy(defaultProps, 'setLanguage');
    const el = shallow(component());
    el.find('select').simulate('change', { target: { value: 'pl' } });
    expect(selectLanguageSpy.withArgs('pl').calledOnce).to.be.true;
  });
});
