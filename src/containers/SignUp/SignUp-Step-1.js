import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SignUpStep1 = ({
    coach,
    Layout,
    isLoading
}) => (
        <Layout
            coach={coach}
            loading={isLoading}
        />
    );

SignUpStep1.propTypes = {
    coach: PropTypes.shape({}).isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    coach: state.coach.coach || {},
    isLoading: state.status.loading || false,
});

export default connect(mapStateToProps)(SignUpStep1);