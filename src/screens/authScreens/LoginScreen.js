import React from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import appImages from '../../assets';
import FullSizeBtn from '../../components/FullSizeBtn';
import CustomInput from '../../components/textinput/CustomInput';
import PasswordInput from '../../components/textinput/PasswordInput';
import store from '../../redux/store';
import basicStyles from '../../styles/basicStyles';
import appColors from '../../utils/appColors';
import getIcon from '../../utils/commonfunctions/getIcon';

const LoginScreen = (props) => {
	console.log(store.getState(), 'Store::::::::::::::::::::');
	const selectedRole = store.getState().auth.roleDetails;
	return (
		<View style={{ ...basicStyles.container, alignItems: 'center', justifyContent: 'center' }}>
			<Image style={{ height: 150, width: 150, alignSelf: 'center' }} source={appImages.appImages.LOGO1} />
			<CustomInput helperText="Enter registered phone number" placeHolder="Phone Number" />
			<PasswordInput helperText="Password" placeHolder="Password" />
			<FullSizeBtn
				onPress={() => {
					if (selectedRole == 'lms') {
						props.navigation.navigate('Home');
					} else {
						props.navigation.navigate('Dashboard');
					}
				}}
				btnColor={appColors.primaryColor}
				btnTitle="Login"
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

export default LoginScreen;
