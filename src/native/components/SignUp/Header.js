import React from 'react';
import PropTypes from 'prop-types';
import { Body, Button, Header, Text, Icon, Left, Right, Title, Subtitle, StyleProvider } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import commonColor from '../../../../native-base-theme/variables/commonColor';
import { Actions } from 'react-native-router-flux';

const Headers = ({ stepNo, content }) => (
    <StyleProvider style={getTheme(commonColor)}>
        <Header hasSubtitle={true} >
            <Left>
                <Button transparent onPress={() => Actions.pop()}>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body style={{ minWidth: 200 }}>
                <Subtitle>Step {stepNo}/4</Subtitle>
                <Title>{content}</Title>
            </Body>
            <Right />
        </Header>
    </StyleProvider>
);

Headers.propTypes = {
    stepNo: PropTypes.number,
    content: PropTypes.string,
};

Headers.defaultProps = {
    stepNo: '',
    content: '',
};

export default Headers;
