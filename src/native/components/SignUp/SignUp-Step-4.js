import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Form, Item, Label, Input, View, Picker, Icon } from 'native-base';
import { StyleSheet, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import Button from '../Button';
import Colors from '../../../../native-base-theme/variables/commonColor';
import Header from './Header';
import Loading from '../Loading';
import Messages from '../Messages';
import Spacer from '../Spacer';
import customStyles from '../../../../native-base-theme/variables/custom';

class SignUpStep4 extends React.Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
    }

    static defaultProps = {
        error: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            gender: 'male',
            pregnant: '',
            weight: '',
            height: '',
            date_of_birth: '',
            goal: '',
            weight_change_goal: '',
            diseases: false,
            disease_list: '',
            errorInputs: {
                weight: false,
                height: false,
                date_of_birth: false,
                goal: false,
                weight_change_goal: false
            }
        };
    }

    handleChange = (name, val) => {
        this.setState({
            ...this.state,
            [name]: val,
        });
    }

    handleSubmit = () => {
        let isInputsValid = this.validateInputFields();

        if (isInputsValid) {
            let data = {
                "fitness_goals_attributes": {
                    "goal": this.state.goal,
                    "weight_change_goal": this.state.weight_change_goal
                },
                "profile_attributes": {
                    "gender": this.state.gender,
                    "date_of_birth": this.state.date_of_birth,
                    "height": this.state.height,
                    "weight": this.state.weight,
                    "flexible_work_hours": null,
                    "pregnant": this.state.pregnant,
                    "diseases": this.state.diseases,
                    "disease_list": this.state.disease_list
                },
                "exercise_schedules_attributes": {
                    "preferred_exercise": null,
                    "experience": null
                }
            };

            this.props.onFormSubmit(this.props.user.id, data, this.props.user.auth_token)
                .then(() => Actions.signUpStep5())
                .catch(e => console.log(`Error: ${e}`));

        }
    }

    validateInputFields = () => {
        let errors = {
            weight: false,
            height: false,
            date_of_birth: false,
            goal: false
        };
        const numberRegEx = /^[0-9]*$/;
        const { weight, height, weight_change_goal, goal } = this.state;

        let keys = Object.keys(this.state).filter(k => this.state[k] === '');
        keys.forEach(key => {
            if (errors[key] !== undefined) errors[key] = true;
        });

        if (!errors.weight) {
            errors.weight = !(numberRegEx.test(weight) && 0 < parseInt(weight) && parseInt(weight) < 1000);
        }

        if (!errors.height) {
            errors.height = !(numberRegEx.test(height) && 0 < parseInt(height) && parseInt(height) < 300);
        }

        if (!errors.goal && (goal == 'Lose weight' || goal == 'Lose weight and tone muscles')) {
            errors.weight_change_goal = !(numberRegEx.test(weight_change_goal) && 0 < parseInt(weight_change_goal) && parseInt(weight_change_goal) < 100)
        }

        this.setState({ errorInputs: errors });
        return Object.keys(errors).filter(k => errors[k] == true).length == 0;
    }

    render() {
        const { loading, error } = this.props;

        const maxDate = moment().format('YYYY-MM-DD');

        const goals = [
            'Gain weight',
            'Lose weight',
            'Lose weight and tone muscles',
            'Maintain weight and Other'
        ];

        // Loading
        if (loading) return <Loading />;

        return (
            <Container style={customStyles.mainBackground}>
                <Header content='About you' stepNo={4} />
                <ScrollView
                    style={{ padding: 20 }}
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        if (this.state.diseases) this.scrollView.scrollToEnd({ animated: true });
                    }} >

                    {error && <Messages message={error} />}

                    <Form>
                        <Item stackedLabel style={[customStyles.inputContainer, { flexDirection: 'row' }]}>
                            <Label style={[customStyles.inputTitle, { flex: 1 }]}>Gender</Label>
                            <Text
                                style={[Styles.singleChoice, { color: this.state.gender == 'male' ? Colors.brandPrimary : Colors.inverseTextColor }]}
                                onPress={() => this.handleChange('gender', 'male')}
                            >Male</Text>
                            <Text
                                style={[Styles.singleChoice, { color: this.state.gender == 'female' ? Colors.brandPrimary : Colors.inverseTextColor }]}
                                onPress={() => this.handleChange('gender', 'female')}
                            >Female </Text>
                        </Item>

                        <Item stackedLabel style={[customStyles.inputContainer, { flexDirection: 'row', display: this.state.gender == 'female' ? 'flex' : 'none' }]}>
                            <Label style={[customStyles.inputTitle, { flex: 1 }]}>Are you pregnant?</Label>
                            <Text
                                style={[Styles.singleChoice, { color: this.state.pregnant === true ? Colors.brandPrimary : Colors.inverseTextColor }]}
                                onPress={() => this.handleChange('pregnant', true)}
                            >Yes </Text>
                            <Text
                                style={[Styles.singleChoice, { color: this.state.pregnant === false ? Colors.brandPrimary : Colors.inverseTextColor }]}
                                onPress={() => this.handleChange('pregnant', false)}
                            >No </Text>
                        </Item>
                        <Item stackedLabel style={customStyles.inputContainer}>
                            <Label style={customStyles.inputTitle}>Date of birth</Label>
                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.date_of_birth}
                                mode="date"
                                placeholder="Select date"
                                format="YYYY-MM-DD"
                                maxDate={maxDate}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                style={[customStyles.input, { width: '100%' }]}
                                customStyles={{
                                    dateIcon: { display: 'none' },
                                    dateInput: { borderWidth: 0, alignItems: 'flex-start' }
                                }}
                                onDateChange={(date) => { this.setState({ date_of_birth: date }) }}
                            />
                            <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.date_of_birth ? 'flex' : 'none' }]}>Please enter this field</Text>
                        </Item>

                        <Item stackedLabel style={customStyles.inputContainer}>
                            <Label style={customStyles.inputTitle}>Weight (in kg)</Label>
                            <Input
                                onChangeText={v => this.handleChange('weight', v)}
                                style={customStyles.input}
                                keyboardType="numeric"
                                placeholder="60"
                                placeholderTextColor="#ddd"
                            />
                            <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.weight ? 'flex' : 'none' }]}>This field requires a value range between 0 and 1000</Text>
                        </Item>

                        <Item stackedLabel style={customStyles.inputContainer}>
                            <Label style={customStyles.inputTitle}>Height (in cm)</Label>
                            <Input
                                keyboardType="numeric"
                                onChangeText={v => this.handleChange('height', v)}
                                style={customStyles.input}
                                placeholder="189"
                                placeholderTextColor="#ddd"
                            />
                            <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.height ? 'flex' : 'none' }]}>This field requires a value range between 0 and 300</Text>
                        </Item>

                        <Item stackedLabel style={customStyles.inputContainer}>
                            <Label style={customStyles.inputTitle}>What is your goal?</Label>
                            <View style={{ width: '100%' }}>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Please select"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    style={{ width: '100%', backgroundColor: '#fff', marginTop: 10, height: 50 }}
                                    selectedValue={this.state.goal}
                                    onValueChange={(value) => this.setState({ goal: value })}
                                >
                                    {goals.map(g => <Item label={g} value={g} key={g} />)}

                                </Picker>
                            </View>
                            <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.goal ? 'flex' : 'none' }]}>Please enter this field</Text>
                        </Item>

                        <Item stackedLabel style={[customStyles.inputContainer, { display: this.state.goal == 'Lose weight' || this.state.goal == 'Lose weight and tone muscles' ? 'flex' : 'none' }]}>
                            <Label style={customStyles.inputTitle}>How much weight are you looking to lose?</Label>
                            <Input
                                onChangeText={v => this.handleChange('weight_change_goal', v)}
                                style={customStyles.input}
                                keyboardType="numeric"
                            />
                            <Text style={[customStyles.inputErrorMsg, { display: this.state.errorInputs.weight_change_goal ? 'flex' : 'none' }]}>This field requires a value range between 1 and 100</Text>
                        </Item>

                        <Item stackedLabel style={customStyles.inputContainer}>
                            <Label style={[customStyles.inputTitle, { flex: 1 }]}>Do you have any diseases or conditions that could affect your diet or exercise?</Label>
                            <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                                <Text
                                    style={[Styles.singleChoice, { color: this.state.diseases == true ? Colors.brandPrimary : Colors.inverseTextColor }]}
                                    onPress={() => this.handleChange('diseases', true)}
                                >Yes</Text>
                                <Text
                                    style={[Styles.singleChoice, { color: this.state.diseases == false ? Colors.brandPrimary : Colors.inverseTextColor }]}
                                    onPress={() => this.handleChange('diseases', false)}
                                >No </Text>
                            </View>
                        </Item>

                        <Item stackedLabel style={[customStyles.inputContainer, { display: this.state.diseases ? 'flex' : 'none' }]}>
                            <Label style={customStyles.inputTitle}>Enter your conditions:</Label>
                            <Input
                                onChangeText={v => this.handleChange('disease_list', v)}
                                style={[customStyles.input, { height: 100 }]}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </Item>
                    </Form>
                    <Spacer size={20} />
                </ScrollView >
                <View style={Styles.bottom}>
                    <Button onPress={this.handleSubmit} content="Let's do this!" />
                </View>
            </Container >
        );
    }
}

export default SignUpStep4;

const Styles = StyleSheet.create({
    bottom: {
        marginBottom: 30,
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15
    },
    singleChoice: {
        width: 70,
        fontSize: 14,
        marginTop: 10
    }
})
