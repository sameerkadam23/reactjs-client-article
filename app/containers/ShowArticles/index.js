import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAllArticles } from '../App/actions';
import { getArticlesSelect } from '../App/selectors';
import saga from '../HomePage/saga';
import injectSaga from '../../utils/injectSaga';

export class ShowArticles extends React.PureComponent {
  componentDidMount() {
    this.props.getAllArticles();
  }

  render() {
    return <div>{this.displayArticle(this.props.data)}</div>;
  }

  displayArticle(data) {
    let article = '';
    if (data != null) {
      article = (
        <ul>
          {this.props.data.map(item => (
            <li key={item.id}>
              <h4>{item.title}</h4>
              <h5>{item.description}</h5>
              <h6>
                Authors: {item.author}
                &nbsp;&nbsp;&nbsp;&nbsp; Tags: {item.tags}
                &nbsp;&nbsp;&nbsp;&nbsp; Created Date: {item.created_at}
                &nbsp;&nbsp;&nbsp;&nbsp; Last Updated Date: {item.updated_at}
              </h6>
            </li>
          ))}
        </ul>
      );
    }
    return article;
  }
}

ShowArticles.propTypes = {
  getAllArticles: PropTypes.func,
  data: PropTypes.array,
};

export function mapDispatchToProps(dispatch) {
  return {
    getAllArticles: () => dispatch(getAllArticles()),
  };
}

const mapStateToProps = createStructuredSelector({
  data: getArticlesSelect(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  // withReducer,
  withSaga,
  withConnect,
)(ShowArticles);
