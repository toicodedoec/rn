import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createUser } from '../../actions/member';
import { getCountries, getTimezone } from '../../actions/country';

const SignUpStep2 = ({
  countries,
  coach,
  Layout,
  getCountries,
  getTimezone,
  onFormSubmit,
  isLoading,
  infoMessage,
  errorMessage,
  successMessage,
  timezone
}) => (
    <Layout
      coach={coach}
      countries={countries}
      getCountries={getCountries}
      getTimezone={getTimezone}
      loading={isLoading}
      info={infoMessage}
      error={errorMessage}
      onFormSubmit={onFormSubmit}
      timezone={timezone}
    />
  );

SignUpStep2.propTypes = {
  Layout: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  infoMessage: PropTypes.string,
  errorMessage: PropTypes.string
};

SignUpStep2.defaultProps = {
  infoMessage: null,
  errorMessage: null
};

const mapStateToProps = state => ({
  coach: state.coach.coach,
  countries: state.country.data || [],
  timezone: state.country.timezone || [],
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null
});

const mapDispatchToProps = {
  onFormSubmit: createUser,
  getCountries: getCountries,
  getTimezone: getTimezone
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStep2);
