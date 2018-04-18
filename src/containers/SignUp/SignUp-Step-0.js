import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCoaches, selectCoach } from '../../actions/coach';

const SignUpStep0 = ({
    coaches,
    getCoaches,
    Layout,
    isLoading,
    selectCoach
}) => (
        <Layout
            coaches={coaches}
            loading={isLoading}
            getCoaches={getCoaches}
            selectCoach={selectCoach}
        />
    );

SignUpStep0.propTypes = {
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    coaches: state.coach.coaches || [],
    isLoading: state.status.loading || false,
});


const mapDispatchToProps = {
    getCoaches: getCoaches,
    selectCoach: selectCoach
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpStep0);
