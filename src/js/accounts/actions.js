// @flow

import { cache } from 'utils/caching';

import type { ThunkAction } from 'redux-thunk';
import type { User } from 'accounts/reducer';

type LoginAction = { type: 'USER_LOGGED_IN', payload: User };
export type LogoutAction = { type: 'USER_LOGGED_OUT' };
export type TokenInvalidAction = { type: 'USER_TOKEN_INVALIDATED' };
export type UserAction = LoginAction | LogoutAction | TokenInvalidAction;

export const login = (payload: User): LoginAction => {
  if (window.Raven && window.Raven.isSetup()) {
    window.Raven.setUserContext(payload);
  }
  /* istanbul ignore else */
  if (payload) {
    window.socket.subscribe({
      model: 'user',
      id: payload.id,
    });
  }
  return {
    type: 'USER_LOGGED_IN',
    payload,
  };
};

export const doLocalLogout = (): LogoutAction => {
  cache.clear();
  window.socket.reconnect();
  if (window.Raven && window.Raven.isSetup()) {
    window.Raven.setUserContext();
  }
  return {
    type: 'USER_LOGGED_OUT',
  };
};

export const logout = (): ThunkAction => (dispatch, getState, { apiFetch }) =>
  apiFetch(window.api_urls.account_logout(), {
    method: 'POST',
  }).then(() => dispatch(doLocalLogout()));

export const invalidateToken = (): TokenInvalidAction => ({
  type: 'USER_TOKEN_INVALIDATED',
});
