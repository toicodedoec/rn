import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveUserInfo } from '../../actions/member';

const SignUpStep4 = ({
  Layout,
  onFormSubmit,
  user,
  isLoading,
  infoMessage,
  errorMessage,
  successMessage,
}) => (
  <Layout
    user={user}
    loading={isLoading}
    info={infoMessage}
    error={errorMessage}
    onFormSubmit={onFormSubmit}
  />
);

SignUpStep4.propTypes = {
  Layout: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  infoMessage: PropTypes.string,
  errorMessage: PropTypes.string
};

SignUpStep4.defaultProps = {
  infoMessage: null,
  errorMessage: null
};

const mapStateToProps = state => ({
  user: state.member.data || {},
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null
});

const mapDispatchToProps = {
  onFormSubmit: saveUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStep4);
