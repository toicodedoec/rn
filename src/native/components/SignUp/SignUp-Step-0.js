import React from 'react';
import PropTypes from 'prop-types';
import { Body, Container, Content, Text, Form, Item, Input, Icon, List, ListItem, Thumbnail, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet } from 'react-native';
import Loading from '../Loading';
import Spacer from '../Spacer';
import Colors from '../../../../native-base-theme/variables/commonColor';
import customStyles from '../../../../native-base-theme/variables/custom';

class SignUpStep0 extends React.Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            fullName: ''
        };
    }

    handleChange = (name, val) => {
        this.setState({
            ...this.state,
            [name]: val,
        });
        // this.props.getCoaches(val);
    }

    onSelectCoach = (coach) => {
        this.props.selectCoach(coach)
            .then(() => Actions.signUpStep1())

    }

    render() {
        const { loading } = this.props;

        let coaches = Object.keys(this.props.coaches).length ? this.props.coaches.data.result : [],
            searchString = this.state.fullName.trim().toLowerCase();
        if (searchString.length > 0) {
            coaches = coaches.filter(c => `${c.first_name} ${c.last_name}`.toLowerCase().match(searchString));
        } else {
            coaches = [];
        }
        // Loading
        if (loading) return <Loading />;

        return (
            <Container style={customStyles.mainBackground}>
                <View style={{ padding: 15, paddingBottom: 0 }}>
                    <Spacer size={100} />
                    <Image
                        source={require('../../../images/me2-logo-white.png')}
                        style={customStyles.mainLogo}
                    />
                    <Spacer size={30} />
                    <Text style={[Styles.title, Styles.title_small]}>Tell us your coach</Text>
                    <Spacer size={20} />
                    <Text style={[Styles.title, { fontWeight: 'normal', fontSize: 18 }]}>Type your coach full name in the box below.</Text>
                    <Spacer size={40} />
                    <Form>
                        <Item regular style={{ backgroundColor: '#fff' }}>
                            <Icon active name='search' />
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder='Full name'
                                value={this.state.fullName}
                                onChangeText={v => this.handleChange('fullName', v)}
                            />
                        </Item>
                    </Form>
                </View>
                <Content padder style={Styles.scrollContainer}>
                    <List dataArray={coaches}
                        renderRow={(i) =>
                            <ListItem style={Styles.coachContainer} onPress={() => this.onSelectCoach(i)}>
                                <Thumbnail square size={40} source={require('../../../images/avt.png')} style={Styles.thumbnail} />
                                <Body>
                                    <Text style={{ color: Colors.inverseTextColor }}>{`${i.first_name} ${i.last_name}`}</Text>
                                </Body>
                            </ListItem>
                        }
                    />

                </Content>
            </Container>
        );
    }
}

export default SignUpStep0;

const Styles = StyleSheet.create({
    title: {
        color: Colors.inverseTextColor,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 28
    },
    title_small: {
        marginTop: 20,
        fontSize: 20
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 20,
        paddingTop: 5
    },
    coachContainer: {
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingBottom: 5,
        marginRight: 15
    },
    thumbnail: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#fff'
    }
})