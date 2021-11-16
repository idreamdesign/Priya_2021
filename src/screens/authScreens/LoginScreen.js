import React, { useState } from 'react';
import { Image, TouchableOpacity, ActivityIndicator, Text, View } from 'react-native';
import appImages from '../../assets';
import FullSizeBtn from '../../components/FullSizeBtn';
import CustomInput from '../../components/textinput/CustomInput';
import PasswordInput from '../../components/textinput/PasswordInput';
import store from '../../redux/store';
import basicStyles from '../../styles/basicStyles';
import appColors from '../../utils/appColors';
import getIcon from '../../utils/commonfunctions/getIcon';
import _ from 'lodash';
import Snackbar from 'react-native-snackbar';
import { numberRegEx, TOKEN, USER_DETAILS } from '../../utils/constants';
import { formErrorValue, getTrimValueLength } from '../../utils/commonfunctions/validations';
import { connect } from 'react-redux';
import { getUserData, getUserDetails, login } from '../../redux/root.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'jwt-decode';
export const LoginScreen = (props) => {
	const selectedRole = store.getState().auth.roleDetails;

	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ pass, setPass ] = useState('');
	const [ validationErrors, setValidationErrors ] = useState({
		mobile: false,
		pass: false
	});

	const [ loading, setLoading ] = useState(false);

	const handleLogin = () => {
		let formData = validateFields();
		console.log(formData, 'Data:::');

		if (formData) {
			setLoading(true);

			props.login(
				formData,
				(res) => {
					const response = res.data;
					if (response) {
						AsyncStorage.setItem(TOKEN, JSON.stringify(response.access_token));
						props.getUserData(
							null,
							(res) => {
								const response = res.data;
								if (response) {
									console.log(response);
									AsyncStorage.setItem(USER_DETAILS, JSON.stringify(response));
									store.dispatch(getUserDetails(response));
									props.navigation.navigate('Home');
								}
							},
							false
						);
						setLoading(false);
						props.navigation.navigate('Home');
					}
				},
				true
			);
		}
	};
	const validateFields = () => {
		let formData = new FormData();
		let errors = { ...validationErrors };
		if (_.isEmpty(phoneNumber)) {
			errors.mobile = 'Enter phone number';
			formData = undefined;
		} else if (!_.isEmpty(phoneNumber) && !numberRegEx.test(phoneNumber)) {
			errors.mobile = 'Enter valid phone number';
			formData = undefined;
		} else {
			formData.append('phone', phoneNumber);
		}
		if (_.isEmpty(pass)) {
			errors.pass = 'Enter password';
			formData = undefined;
		} else if (!_.isEmpty(pass) && getTrimValueLength(pass) < 8) {
			errors.pass = 'Enter valid password';
			formData = undefined;
		} else {
			formData.append('password', pass);
		}
		setValidationErrors(errors);
		return formData;
	};
	return (
		<View style={{ ...basicStyles.container, alignItems: 'center', justifyContent: 'center' }}>
			<Image style={{ height: 150, width: 150, alignSelf: 'center' }} source={appImages.appImages.LOGO1} />
			<CustomInput
				otherInputProps={{ maxLength: 10 }}
				initialValue={phoneNumber}
				onChange={(text) => (setValidationErrors({ mobile: false }), setPhoneNumber(text))}
				helperText="Enter registered phone number"
				placeHolder="Phone Number"
			/>
			{validationErrors.mobile && formErrorValue(validationErrors.mobile)}
			<PasswordInput
				initialValue={pass}
				onChange={(text) => (setValidationErrors({ pass: false }), setPass(text))}
				helperText="Minimum 8 characters"
				placeHolder="Password"
			/>
			{validationErrors.pass && formErrorValue(validationErrors.pass)}

			<FullSizeBtn
				onPress={() => {
					if (selectedRole == 'lms') {
						handleLogin();
					} else {
						props.navigation.navigate('Dashboard');
					}
				}}
				btnColor={appColors.primaryColor}
				btnTitle={loading ? <ActivityIndicator size={'small'} color={appColors.white} /> : 'Login'}
				style={{ marginTop: 15 }}
			/>

			<FullSizeBtn
				onPress={() => props.navigation.navigate('RegisterScreen')}
				btnColor={appColors.simpleBlue}
				btnTitle="Register"
				style={{ marginTop: 15 }}
			/>
			<TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}>
				<Text style={{ color: appColors.grey, marginTop: 15 }}>
					Forgot Password? <Text style={{ color: appColors.primaryColor }}> Reset Password</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (requestData, onResponse, showSnackBar) => {
			dispatch(login(requestData, onResponse, showSnackBar));
		},
		getUserData: (requestData, onResponse, showSnackBar) => {
			dispatch(getUserData(requestData, onResponse, showSnackBar));
		}
	};
};

export default connect(null, mapDispatchToProps)(LoginScreen);
