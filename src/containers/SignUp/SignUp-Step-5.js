import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SignUpStep5 = ({
  Layout,
  isLoading
}) => (
  <Layout
    loading={isLoading}
  />
);

SignUpStep5.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.status.loading || false,
});

export default connect(mapStateToProps)(SignUpStep5);
