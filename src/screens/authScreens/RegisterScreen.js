import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import FullSizeBtn from '../../components/FullSizeBtn';
import GradePopup from '../../components/GradePopup';
import CustomInput from '../../components/textinput/CustomInput';
import DropDownInput from '../../components/textinput/DropDownInput';
import PasswordInput from '../../components/textinput/PasswordInput';
import basicStyles from '../../styles/basicStyles';
import appColors from '../../utils/appColors';

export const RegisterScreen = (props) => {
	const [ gradePopup, setGradePopup ] = useState(false);
	const gradeOptions = [ 'Form 1', 'Form 2', 'Form 3' ];
	const [ selectedGrade, setSelectedGrade ] = useState(null);
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
			<CustomInput helperText="Enter your name" placeHolder="Name" />
			<CustomInput helperText="Enter your active e-mail address" placeHolder="E-mail Address" />

			<CustomInput helperText="Enter your active phone number" placeHolder="Phone number" />

			<CustomInput helperText="Enter your name" placeHolder="Name" />
			<GradePopup
				selectedGrade={selectedGrade}
				onSelect={(option) => (setSelectedGrade(option), setGradePopup(false))}
				gradeOptions={gradeOptions}
				visiblity={gradePopup}
				onClose={() => setGradePopup(false)}
			/>
			<TouchableOpacity onPress={() => setGradePopup(true)} style={{ alignSelf: 'center', width: '100%' }}>
				<DropDownInput placeHolder={selectedGrade ? selectedGrade : 'Grade'} inputProps={{ editable: false }} />
			</TouchableOpacity>

			<PasswordInput helperText="Minimum 8 characters" placeHolder="Create Password" />
			<PasswordInput helperText="Same as create password" placeHolder="Cofirm Password" />

			<FullSizeBtn
				onPress={() => console.log('Register')}
				btnColor={appColors.simpleBlue}
				btnTitle="Register"
				style={{ marginTop: 15 }}
			/>
		</ScrollView>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
