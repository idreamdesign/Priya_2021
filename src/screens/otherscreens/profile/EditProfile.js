import React, { Component } from 'react';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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

const EditProfile = () => {
	const [ gender, setGender ] = useState('male');
	const [ gradePopup, setGradePopup ] = useState(false);
	const gradeOptions = [ 'Form 1', 'Form 2', 'Form 3' ];
	const [ selectedGrade, setSelectedGrade ] = useState(null);
	const [ date, setDate ] = useState(new Date());
	const [ open, setOpen ] = useState(false);
	const [ dateSelected, setDateSelected ] = useState(false);
	return (
		<ScrollView
			contentContainerStyle={{
				...basicStyles.container,
				flex: 0,

				height: undefined
			}}
		>
			<GradePopup
				selectedGrade={selectedGrade}
				onSelect={(option) => (setSelectedGrade(option), setGradePopup(false))}
				gradeOptions={gradeOptions}
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
				<CustomInput placeHolder="Name" />
				<CustomInput placeHolder="E-mail Address" />

				<CustomInput placeHolder="Phone number" />
				<TouchableOpacity onPress={() => setGradePopup(true)} style={{ alignSelf: 'center', width: '100%' }}>
					<DropDownInput
						placeHolder={selectedGrade ? selectedGrade : 'Grade'}
						inputProps={{ editable: false }}
					/>
				</TouchableOpacity>
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
				onPress={() => console.log('Register')}
				btnColor={appColors.simpleBlue}
				btnTitle="Update Profile"
				style={{ marginTop: 20 }}
			/>
		</ScrollView>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
