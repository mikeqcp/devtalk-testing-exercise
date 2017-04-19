import { expect } from 'chai';
import { fromJS, List } from 'immutable';
import { selectTeamsList, selectRangeValues, selectArithmeticAverage, filterTeamsListBySquadValue } from '../teams.selectors';
import { TeamRecord } from '../../../fixtures/teams';

describe('teams:selectors', () => {
  const teams = new List([
    new TeamRecord({
      name: 'Man Utd',
      squadMarketValue: '25,000,000 €'
    }),
    new TeamRecord({
      name: 'AFC Bournemouth',
      squadMarketValue: '45,000,000 €',
    }),
  ]);

  const rangeValues = fromJS({
    min: 0,
    max: 999,
  });
  const data = {
    list: teams,
    rangeValues,
    error: null,
  };
  const state = fromJS({
    teams: data,
  });

  describe('selectTeamList', () => {
    it('should select list from sample data', () => {
      expect(selectTeamsList(state)).to.deep.equal(teams);
    });
  });

  describe('selectRangeValues', () => {
    it('should select range from sample data', () => {
      expect(selectRangeValues(state)).to.deep.equal(rangeValues);
    });
  });

  describe('filterTeamsListBySquadValue', () => {
    it('should filter no teams when range is not matching', () => {
      const st = state.setIn(['teams', 'rangeValues'], fromJS({ min: 0, max: 5 }));
      expect(filterTeamsListBySquadValue(st)).to.have.property('size', 0);
    });

    it('should skip some teams when value is bigger than limit', () => {
      const st = state.setIn(['teams', 'rangeValues'], fromJS({ min: 0, max: 30 }));
      expect(filterTeamsListBySquadValue(st)).to.have.property('size', 1);
    });

    it('should skip some teams when value is smaller than limit', () => {
      const st = state.setIn(['teams', 'rangeValues'], fromJS({ min: 30, max: 999 }));
      expect(filterTeamsListBySquadValue(st)).to.have.property('size', 1);
    });

    it('should filter all teams when range is matching them', () => {
      const st = state.setIn(['teams', 'rangeValues'], fromJS({ min: 0, max: 999 }));
      expect(filterTeamsListBySquadValue(st)).to.have.property('size', 2);
    });
  });

  describe('selectArithmeticAverage', () => {
    it('should return arithmentic average from multiple teams', () => {
      expect(selectArithmeticAverage(state)).to.equal(35000000);
    });

    it('should return arithmentic average for one team', () => {
      const list = new List([
        new TeamRecord({
          name: 'Man Utd',
          squadMarketValue: '25,000,000 €'
        })
      ]);
      const st = state.setIn(['teams', 'list'], list);
      expect(selectArithmeticAverage(st)).to.equal(25000000);
    });

    it('should return 0 for no teams', () => {
      const list = new List([]);
      const st = state.setIn(['teams', 'list'], list);
      expect(selectArithmeticAverage(st)).to.equal(0);
    });
  });
});
