/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import {
  reposLoaded,
  repoLoadingError,
  getAllArticlesResponse,
} from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import { GET_ARTICLES } from './constants';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* getArticlesData() {
  // const getArticlesApiURL = 'http://localhost:8080/getAllArticles';
  const getArticlesApiURL = 'http://localhost:8000/articles/';
  try {
    // do api call
    const data = yield call(request, getArticlesApiURL);
    yield put(getAllArticlesResponse(data));
  } catch (err) {
    console.log(err);
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
  yield takeLatest(GET_ARTICLES, getArticlesData);
}
