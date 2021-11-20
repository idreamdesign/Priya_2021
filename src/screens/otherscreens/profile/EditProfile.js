import React, { Component } from 'react';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import FullSizeBtn from '../../../components/FullSizeBtn';
import GradePopup from '../../../components/GradePopup';
import RadioButton from '../../../components/RadioButton';
import CustomInput from '../../../components/textinput/CustomInput';
import DropDownInput from '../../../components/textinput/DropDownInput';
import basicStyles from '../../../styles/basicStyles';
import appColors from '../../../utils/appColors';
import moment from 'moment';
import store from '../../../redux/store';
import { formErrorValue, getTrimValueLength } from '../../../utils/commonfunctions/validations';
import { getUserData, getUserDetails, updateProfile } from '../../../redux/root.actions';
import Snackbar from 'react-native-snackbar';
import { emailRegEx, numberRegEx, USER_DETAILS } from '../../../utils/constants';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditProfile = (props) => {
	const initialUserDetails = store.getState().auth.userDetails;
	const [ userDetails, setUserDetails ] = useState(initialUserDetails);
	const [ loading, setLoading ] = useState(false);
	const [ gender, setGender ] = useState('male');
	const [ gradePopup, setGradePopup ] = useState(false);
	const [ selectedGrade, setSelectedGrade ] = useState(userDetails.grade_detail.id);
	const [ selectedGradeLabel, setSelectedGradeLabel ] = useState(userDetails.grade_detail.title);
	const [ date, setDate ] = useState(new Date());
	const [ open, setOpen ] = useState(false);
	const [ dateSelected, setDateSelected ] = useState(false);
	const [ details, setDetails ] = useState({
		name: userDetails.name,
		email: userDetails.email,
		phone: userDetails.phone,
		gender: userDetails.gender
	});
	//updateProfile form validationErrors

	const [ validationErrors, setValidationErrors ] = useState({
		name: false,
		email: false,
		phone: false,
		grade: false,
		gender: false
	});
	const handleUpdate = () => {
		const formData = validateFields();

		console.log(formData, 'FormData;::::::::::');
		if (formData) {
			setLoading(true);

			props.updateProfile(
				formData,
				(res) => {
					props.getUserData(
						null,
						(res) => {
							const response = res.data;
							if (response) {
								console.log(response);
								AsyncStorage.setItem(USER_DETAILS, JSON.stringify(response));
								store.dispatch(getUserDetails(response));
								+props.navigation.navigate('Profile');
							}
						},
						false
					);
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

		if (!_.isNumber(selectedGrade)) {
			errors.grade = 'Select grade';
			formData = undefined;
		} else {
			formData && formData.append('grade', selectedGrade);
		}

		dateSelected && formData && formData.append('dob', selectedGrade);

		setValidationErrors(errors);
		return formData;
	};
	return (
		<ScrollView
			contentContainerStyle={{
				...basicStyles.container,
				flex: 0,

				height: undefined
			}}
		>
			<GradePopup
				onSelect={(option, label) => (
					setValidationErrors({ ...validationErrors, grade: false }),
					setSelectedGrade(option),
					setSelectedGradeLabel(label),
					setGradePopup(false)
				)}
				visiblity={gradePopup}
				onClose={() => setGradePopup(false)}
			/>

			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<DatePicker
					modal
					open={open}
					date={date}
					onConfirm={(date) => {
						setOpen(false);
						setDate(date);
						setDateSelected(true);
					}}
					onCancel={() => {
						setOpen(false);
					}}
					mode="date"
				/>
				<CustomInput
					initialValue={details.name}
					onChange={(text) => (
						setValidationErrors({ ...validationErrors, name: false }),
						setDetails({ ...details, name: text })
					)}
					helperText={getTrimValueLength(details.name) == 0 && 'Enter your name'}
					placeHolder="Name"
				/>
				{validationErrors.name && formErrorValue(validationErrors.name)}
				<CustomInput
					initialValue={details.email}
					onChange={(text) => (
						setValidationErrors({ ...validationErrors, email: false }),
						setDetails({ ...details, email: text })
					)}
					helperText={getTrimValueLength(details.email) == 0 && 'Enter your active e-mail address'}
					placeHolder="E-mail Address"
				/>
				{validationErrors.email && formErrorValue(validationErrors.email)}

				<CustomInput
					otherInputProps={{ maxLength: 10 }}
					initialValue={details.phone}
					onChange={(text) => (
						setValidationErrors({ ...validationErrors, phone: false }),
						setDetails({ ...details, phone: text })
					)}
					helperText={getTrimValueLength(details.phone) == 0 && 'Enter your active phone number'}
					placeHolder="Phone number"
				/>
				{validationErrors.phone && formErrorValue(validationErrors.phone)}
				<TouchableOpacity onPress={() => setGradePopup(true)} style={{ alignSelf: 'center', width: '100%' }}>
					<DropDownInput
						placeHolder={selectedGrade ? selectedGradeLabel : 'Grade'}
						inputProps={{ editable: false }}
					/>
				</TouchableOpacity>
				{validationErrors.grade && formErrorValue(validationErrors.grade)}

				<TouchableOpacity onPress={() => setOpen(true)} style={{ alignSelf: 'center', width: '100%' }}>
					<DropDownInput
						placeHolder={dateSelected ? String(moment(date).format('DD-MM-YYYY')) : 'Date of Birth'}
						inputProps={{ editable: false }}
					/>
				</TouchableOpacity>
			</View>
			<View style={{ marginTop: 15, left: '5%' }}>
				<Text style={{ color: appColors.primaryColor, fontSize: 14, fontWeight: '600' }}>Gender</Text>

				<View style={{ marginTop: 15, flexDirection: 'row' }}>
					<RadioButton label="Male" checked={gender == 'male'} onChange={() => setGender('male')} />
					<RadioButton
						label="Female"
						checked={gender == 'female'}
						onChange={() => setGender('female')}
						style={{ marginLeft: 10 }}
					/>
				</View>
			</View>
			<FullSizeBtn
				onPress={() => handleUpdate()}
				btnColor={appColors.simpleBlue}
				btnTitle={loading ? <ActivityIndicator size={'small'} color={appColors.white} /> : 'Update Profile'}
				style={{ marginTop: 20 }}
			/>
		</ScrollView>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateProfile: (requestData, onResponse, showSnackBar) => {
			dispatch(updateProfile(requestData, onResponse, showSnackBar));
		},
		getUserData: (requestData, onResponse, showSnackBar) => {
			dispatch(getUserData(requestData, onResponse, showSnackBar));
		}
	};
};

export default connect(null, mapDispatchToProps)(EditProfile);
