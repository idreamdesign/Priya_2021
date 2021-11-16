import React, { useState } from 'react';
import { ActivityIndicator, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import FullSizeBtn from '../../components/FullSizeBtn';
import GradePopup from '../../components/GradePopup';
import CustomInput from '../../components/textinput/CustomInput';
import DropDownInput from '../../components/textinput/DropDownInput';
import PasswordInput from '../../components/textinput/PasswordInput';
import basicStyles from '../../styles/basicStyles';
import appColors from '../../utils/appColors';
import _ from 'lodash';
import { emailRegEx, numberRegEx } from '../../utils/constants';
import { formErrorValue, getTrimValueLength } from '../../utils/commonfunctions/validations';
import { register } from '../../redux/root.actions';
import Snackbar from 'react-native-snackbar';

export const RegisterScreen = (props) => {
	const [ gradePopup, setGradePopup ] = useState(false);
	const gradeOptions = [ 'Form 1', 'Form 2', 'Form 3' ];
	const [ selectedGradeLabel, setSelectedGradeLabel ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	//register form details
	const [ details, setDetails ] = useState({
		name: undefined,
		email: undefined,
		phone: undefined,
		grade: undefined,
		pass: undefined,
		confirmPass: undefined
	});
	//register form validationErrors

	const [ validationErrors, setValidationErrors ] = useState({
		name: false,
		email: false,
		phone: false,
		grade: false,
		pass: false,
		confirmPass: false
	});
	const handleRegister = () => {
		const formData = validateFields();

		console.log(formData, 'FormData;::::::::::');
		if (formData) {
			setLoading(true);

			props.register(
				formData,
				(res) => {
					console.log(res);
					// const response = res.data;
					// console.log(response);
				},
				true
			);
		} else {
			Snackbar.show({
				text: 'Please check the details provided!',
				backgroundColor: 'red',
				length: Snackbar.LENGTH_SHORT
			});
		}
	};
	const validateFields = () => {
		let formData = new FormData();
		let errors = { ...validationErrors };
		if (_.isEmpty(details.phone)) {
			errors.phone = 'Enter phone number';
			formData = undefined;
		} else if (!_.isEmpty(details.phone) && !numberRegEx.test(details.phone)) {
			errors.phone = 'Enter valid phone number';
			formData = undefined;
		} else {
			formData && formData.append('phone', details.phone);
		}
		if (_.isEmpty(details.email)) {
			errors.email = 'Enter email';
			formData = undefined;
		} else if (!_.isEmpty(details.email) && !emailRegEx.test(details.email)) {
			errors.email = 'Enter valid email';
			formData = undefined;
		} else {
			formData && formData.append('email', details.email);
		}
		if (_.isEmpty(details.name)) {
			errors.name = 'Enter name';
			formData = undefined;
		} else if (!_.isEmpty(details.name) && getTrimValueLength(details.name) < 3) {
			errors.pass = 'Enter valid name';
			formData = undefined;
		} else {
			formData && formData.append('name', details.name);
		}
		if (_.isEmpty(details.pass)) {
			errors.pass = 'Enter password';
			formData = undefined;
		} else if (!_.isEmpty(details.pass) && getTrimValueLength(details.pass) < 8) {
			errors.pass = 'Enter valid password';
			formData = undefined;
		} else {
			formData && formData.append('password', details.pass);
		}
		if (_.isEmpty(details.confirmPass)) {
			errors.confirmPass = 'Enter confirmation password';
			formData = undefined;
		} else if (details.pass !== details.confirmPass) {
			errors.confirmPass = 'Password Mismatch';
			formData = undefined;
		} else {
			formData && formData.append('password_confirmation', details.pass);
		}
		if (!_.isNumber(details.grade)) {
			errors.grade = 'Select grade';
			formData = undefined;
		} else {
			formData && formData.append('grade', details.grade);
		}
		setValidationErrors(errors);
		return formData;
	};

	return (
		<ScrollView
			contentContainerStyle={{
				...basicStyles.container,
				height: undefined,
				flex: 0,
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<Image style={{ height: 100, width: 100 }} source={appImages.appImages.LOGO1} />
			<Text style={{ fontSize: 20, fontWeight: '600', marginTop: 5, color: appColors.smokyBlack }}>Welcome</Text>
			<Text style={{ fontSize: 16, color: appColors.grey, marginTop: 5 }}>
				Complete registration to start learning
			</Text>
			<CustomInput
				initialValue={details.name}
				onChange={(text) => (
					setValidationErrors({ ...validationErrors, name: false }), setDetails({ ...details, name: text })
				)}
				helperText="Enter your name"
				placeHolder="Name"
			/>
			{validationErrors.name && formErrorValue(validationErrors.name)}

			<CustomInput
				initialValue={details.email}
				onChange={(text) => (
					setValidationErrors({ ...validationErrors, email: false }), setDetails({ ...details, email: text })
				)}
				helperText="Enter your active e-mail address"
				placeHolder="E-mail Address"
			/>
			{validationErrors.email && formErrorValue(validationErrors.email)}

			<CustomInput
				otherInputProps={{ maxLength: 10 }}
				initialValue={details.phone}
				onChange={(text) => (
					setValidationErrors({ ...validationErrors, phone: false }), setDetails({ ...details, phone: text })
				)}
				helperText="Enter your active phone number"
				placeHolder="Phone number"
			/>
			{validationErrors.phone && formErrorValue(validationErrors.phone)}
			{/* Grade Selection Popuup with input */}
			<GradePopup
				onSelect={(option, label) => (
					setValidationErrors({ ...validationErrors, grade: false }),
					setDetails({ ...details, grade: option }),
					setSelectedGradeLabel(label),
					setGradePopup(false)
				)}
				gradeOptions={gradeOptions}
				visiblity={gradePopup}
				onClose={() => setGradePopup(false)}
			/>

			<TouchableOpacity onPress={() => setGradePopup(true)} style={{ alignSelf: 'center', width: '100%' }}>
				<DropDownInput
					placeHolder={details.grade ? selectedGradeLabel : 'Grade'}
					inputProps={{ editable: false }}
				/>
			</TouchableOpacity>
			{validationErrors.grade && formErrorValue(validationErrors.grade)}
			{/* Grade Selection Popuup with input ends*/}
			<PasswordInput
				initialValue={details.pass}
				onChange={(text) => (
					setValidationErrors({ ...validationErrors, pass: false }), setDetails({ ...details, pass: text })
				)}
				helperText="Minimum 8 characters"
				placeHolder="Create Password"
			/>
			{validationErrors.pass && formErrorValue(validationErrors.pass)}

			<PasswordInput
				initialValue={details.confirmPass}
				onChange={(text) => (
					setValidationErrors({ ...validationErrors, confirmPass: false }),
					setDetails({ ...details, confirmPass: text })
				)}
				helperText="Same as create password"
				placeHolder="Cofirm Password"
			/>
			{validationErrors.confirmPass && formErrorValue(validationErrors.confirmPass)}

			<FullSizeBtn
				onPress={() => handleRegister()}
				btnColor={appColors.simpleBlue}
				btnTitle={loading ? <ActivityIndicator size={'small'} color={appColors.white} /> : 'Register'}
				style={{ marginTop: 15 }}
			/>
		</ScrollView>
	);
};
const mapDispatchToProps = (dispatch) => {
	return {
		register: (requestData, onResponse, showSnackBar) => {
			dispatch(register(requestData, onResponse, showSnackBar));
		}
	};
};

export default connect(null, mapDispatchToProps)(RegisterScreen);
