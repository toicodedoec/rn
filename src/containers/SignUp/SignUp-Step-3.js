import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePhoneNumber, resendVerifyCode, sendVerifiedCode } from '../../actions/member';

const SignUpStep3 = ({
    coach,
    countries,
    Layout,
    user,
    isLoading,
    resendVerifyCode,
    sendVerifiedCode,
    updatePhoneNumber
}) => (
        <Layout
            coach={coach}
            countries={countries}
            loading={isLoading}
            user={user}
            resendVerifyCode={resendVerifyCode}
            sendVerifiedCode={sendVerifiedCode}
            updatePhoneNumber={updatePhoneNumber}
        />
    );

SignUpStep3.propTypes = {
    coach: PropTypes.shape({}).isRequired,
    isLoading: PropTypes.bool.isRequired
}; 

const mapStateToProps = state => ({
    coach: state.coach || {},
    countries: state.country.data || [],
    user: state.member.data || {},
    isLoading: state.status.loading || false,
});

const mapDispatchToProps = {
    updatePhoneNumber: updatePhoneNumber,
    sendVerifiedCode: sendVerifiedCode,
    resendVerifyCode: resendVerifyCode
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStep3);