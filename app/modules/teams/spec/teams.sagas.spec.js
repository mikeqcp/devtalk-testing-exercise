import { call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { expect } from 'chai';
import teamsSaga, { fetchTeamsSaga, getTeamsSaga } from '../teams.sagas';
import { teamsActions, teamsActionsTypes } from '../teams.actions';
import envConfig from '../../../environment/base';
import request from '../../../utils/request';


describe('teams:sagas', () => {
  describe('fetchTeamsSaga', () => {
    describe('correct fetch flow', () => {
      const saga = fetchTeamsSaga();
      const opts = {
        method: 'GET',
        headers: {
          'X-Auth-Token': envConfig.api.key,
        },
      };

      it('should request correct url', () => {
        const expectedResult = call(
          request,
          `${envConfig.api.baseUrl}${envConfig.api.urls.teams}`,
          opts
        );
        expect(saga.next().value).to.deep.equal(expectedResult);
      });

      it('should dispatch teamsSuccess action', () => {
        const data = { foo: 'bar' };
        const expectedResult = put(teamsActions.getTeamsSuccess(data));
        expect(saga.next(data).value).to.deep.equal(expectedResult);
        expect(saga.next().done).to.be.true;
      });
    });

    it('should dispatch teamsError on failure', () => {
      const saga = getTeamsSaga();
      const err = { error: 'error' };
      const expectedResult = put(teamsActions.getTeamsError(err));
      saga.next();
      expect(saga.throw(err).value).to.deep.equal(expectedResult);
      expect(saga.next().done).to.be.true;
    });
  });

  describe('getTeamsSaga', () => {
    it('should dispatch fetch', () => {
      const saga = getTeamsSaga();
      const expectedResult = call(takeLatest, teamsActionsTypes.GET_TEAMS, fetchTeamsSaga);
      expect(saga.next().value).to.deep.equal(expectedResult);
      expect(saga.next().done).to.be.true;
    });

    it('should dispatch teamsError on failure', () => {
      const saga = getTeamsSaga();
      saga.next();
      const err = { error: 'error' };
      const expectedResult = put(teamsActions.getTeamsError(err));
      expect(saga.throw(err).value).to.deep.equal(expectedResult);
      expect(saga.next().done).to.be.true;
    });
  });

  describe('teamsSaga', () => {
    it('should return forked getTeamsSaga', () => {
      const saga = teamsSaga();
      expect(saga.next().value).to.deep.equal([fork(getTeamsSaga)]);
      expect(saga.next().done).to.be.true;
    });
  });
});
