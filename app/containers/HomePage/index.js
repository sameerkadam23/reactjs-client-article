/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername, getAllArticles } from './actions';
import { makeSelectUsername, getArticlesSelect } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.getAllArticles();
    /*if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }*/
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
          </CenteredSection>
          <div>
            <button onClick={this.props.fetchArticle}>get all articles</button>
            <h3>Title:</h3><h3>{this.props.data}</h3>
            <h4>Description:</h4>
            <h4>authors:</h4>
            <h4>tags:</h4>
            <h4>Created Date:</h4>
            <h4>last Updated Date:</h4>
          </div>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // onSubmitForm: PropTypes.func,
  // username: PropTypes.string,
  // onChangeUsername: PropTypes.func,
  fetchArticle: PropTypes.func,
  getAllArticles: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getAllArticles: getAllArticles,
    // onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    /*onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },*/
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  // username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  data: getArticlesSelect(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
