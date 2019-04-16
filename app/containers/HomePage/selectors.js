/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));

const getArticlesSelect = () =>
  createSelector(selectHome, homeState => homeState.get('data'));

export { selectHome, makeSelectUsername, getArticlesSelect };
