import { List, Record } from 'immutable';

export const TeamRecord = new Record({
  name: 'Team name',
  squadMarketValue: '25,000,000 €'
});

export const teams = new List([
  new TeamRecord({
    name: 'Man Utd',
    squadMarketValue: '25,000,001 €'
  }),
  new TeamRecord({
    name: 'AFC Bournemouth',
    squadMarketValue: '49,000,000 €',
  }),
]);
