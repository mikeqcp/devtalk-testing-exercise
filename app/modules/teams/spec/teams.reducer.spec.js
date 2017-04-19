import { expect } from 'chai';
import { fromJS } from 'immutable';
import { teamsActionsTypes as Types } from '../teams.actions';
import reducer from '../teams.reducer';
import { teams } from '../../../fixtures/teams';

describe('teams:reducer', () => {
  const state = fromJS({
    list: [],
    rangeValues: {
      min: 0,
      max: 600,
    },
    error: null,
  });

  it('should return state on unknown action', () => {
    expect(reducer(state, { type: 'unknown-action' })).to.be.equal(state);
  });

  describe('Teams success', () => {
    it('should return state after success', () => {
      const expectedState = state.set('list', teams);
      const res = reducer(state, { type: Types.GET_TEAMS_SUCCESS, payload: { teams } });

      expect(res.equals(expectedState)).to.be.equal(true);
    });
  });

  describe('Range success', () => {
    const values = fromJS({ min: 100, max: 700 });
    const expectedState = state.set('rangeValues', values);
    const res = reducer(state, { type: Types.SET_RANGE_VALUES, values });

    expect(res.equals(expectedState)).to.be.equal(true);
  });

  describe('Failure', () => {
    it('should set error value', () => {
      const error = 'ERROR_MESSAGE';
      const expectedState = state.set('error', error);
      const res = reducer(state, { type: Types.GET_TEAMS_ERORR, payload: { error } });

      expect(res.equals(expectedState)).to.be.equal(true);
    });
  });
});
