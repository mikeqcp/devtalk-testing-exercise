import { createSelector } from 'reselect';
import { toNumber, round } from 'lodash';

const MULTIPLIER = 1000000;

const selectTeamsDomain = state => state.get('teams');

export const selectTeamsList = createSelector(
  selectTeamsDomain, state => state.get('list')
);

export const selectRangeValues = createSelector(
  selectTeamsDomain, state => state.get('rangeValues')
);

export const filterTeamsListBySquadValue = createSelector(
  selectTeamsList,
  selectRangeValues,
  (teams, rangeValues) => teams.filter((team) => {
    const squadMarket = toNumber(team.get('squadMarketValue').replace(' €', '').replace(/,/g, ''));

    return squadMarket > rangeValues.min() * MULTIPLIER && squadMarket < rangeValues.max() * MULTIPLIER;
  })
);

export const selectArithmeticAverage = createSelector(
  filterTeamsListBySquadValue,
  teams => {
    const sum = teams.reduce((prevVal, element) => {
      const squadMarket = toNumber(element.get('squadMarketValue').replace(/[( €),]/g, ''));
      return prevVal + squadMarket;
    }, 0);

    return round(sum / Math.max(1, teams.size));
  }
);
