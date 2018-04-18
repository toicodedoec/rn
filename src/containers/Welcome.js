import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Welcome = ({
  Layout,
  isLoading
}) => (
  <Layout
    loading={isLoading}
  />
);

Welcome.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.status.loading || false,
});

export default connect(mapStateToProps)(Welcome);
