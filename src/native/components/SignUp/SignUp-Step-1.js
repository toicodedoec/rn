import React from 'react';
import PropTypes from 'prop-types';
import { Body, Container, Content, Footer, Text, Icon, View, Card, CardItem, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, ScrollView, WebView } from 'react-native';
import Button from '../Button';
import Header from './Header';
import Loading from '../Loading';
import Spacer from '../Spacer';
import customStyles from '../../../../native-base-theme/variables/custom';

class SignUpStep1 extends React.Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired
    }

    handleSubmit = () => {
        Actions.signUpStep2();
    }

    render() {
        const { loading, coach } = this.props;

        // Loading
        if (loading) return <Loading />;

        const strength = coach.skills ? coach.skills : [];

        const qualifications = coach.qualifications ?
            <WebView
                style={{ width: '100%', backgroundColor: '#fff', height: 60 }}
                iscalesPageToFit={false}
                source={{ html: coach.qualifications }} /> : null;

        const bio = coach.bio ?
            <WebView
                style={{ width: '100%', backgroundColor: '#fff', maxHeight: 100, minHeight: 60 }}
                iscalesPageToFit={false}
                source={{ html: coach.bio }} /> : null;

        return (
            <Container style={customStyles.mainBackground}>
                <Header content='Confirm your Coach' stepNo={1} />
                <Content padder>
                    <Card>
                        <CardItem bordered>
                            <Body style={Styles.cardItemBody}>
                                <View style={Styles.coachInfo}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`${coach.first_name} ${coach.last_name}`}</Text>
                                    <Spacer size={8} />
                                    {/* <Text style={{ color: 'red', fontSize: 13 }}>98% Match</Text> */}
                                    <Spacer size={8} />
                                    <Text style={{ fontSize: 13 }}>{coach.billing_street}y</Text>
                                </View>
                                <Image
                                    style={{ width: 120, height: 120, borderWidth: 1, borderColor: '#ddd' }}
                                    source={require('../../../images/avt.png')}
                                />
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body style={{ paddingTop: 15, paddingBottom: 5, paddingLeft: 10, overflow: 'hidden' }}>
                                <Text style={{ fontWeight: 'bold' }}><Icon name='md-walk' style={{ fontSize: 18 }} /> &nbsp;Specialties</Text>
                                <ScrollView style={{ maxHeight: 115, minHeight: 10, width: '100%', marginTop: 5 }}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                        {strength.map((s, idx) =>
                                            <Badge style={[Styles.badgeStyle, { backgroundColor: 'black' }]} key={idx}>
                                                <Text style={{ color: 'white' }}>{s}</Text>
                                            </Badge>
                                        )}
                                    </View>
                                </ScrollView>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body style={{ paddingTop: 15, paddingLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}><Icon name='md-school' style={{ fontSize: 18 }} />&nbsp;Qualifications</Text>
                                <View style={{ height: 60, backgroundColor: '#fff', width: '100%', marginTop: 5 }}>
                                    {qualifications}
                                </View>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body style={{ paddingTop: 15, paddingLeft: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}><Icon name='md-school' style={{ fontSize: 18 }} />&nbsp;About {coach.first_name}</Text>
                                <View style={{ maxHeight: 100, backgroundColor: '#fff', width: '100%', marginTop: 5, minHeight: 60 }}>
                                    {bio}
                                </View>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>
                <View style={Styles.bottom}>
                    <Button onPress={this.handleSubmit} content="Next Step" width={200} />
                    <Text style={Styles.bottomText} onPress={() => Actions.pop()}>That's not my coach, go back</Text>
                </View>
            </Container>
        );
    }
}

export default SignUpStep1;

const Styles = StyleSheet.create({
    bottom: {
        marginBottom: 30,
        alignItems: 'center',
        marginTop: 15
    },
    bottomText: {
        marginTop: 20,
        fontSize: 12,
        color: '#fff',
        textAlign: 'center'
    },
    cardItemBody: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 10
    },
    coachInfo: {
        alignSelf: 'flex-start',
        flex: 1,
        marginTop: 15
    },
    coachTitle: {
        fontSize: 18
    },
    badgeStyle: {
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    }

})