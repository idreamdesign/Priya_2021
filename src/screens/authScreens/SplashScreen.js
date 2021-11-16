import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import {
	getGrades,
	getUserDetails,
	storeCategoryDetails,
	storeGradeDetails,
	storeRoleDetails
} from '../../redux/root.actions';
import store from '../../redux/store';
import basicStyles from '../../styles/basicStyles';
import { CATEGORYLIST, GRADELIST, ROLESELECTED, TOKEN, USER_DETAILS } from '../../utils/constants';

export const SplashScreen = (props) => {
	React.useEffect(() => {
		let isActive = true;
		setTimeout(() => {
			changeScreen();
		}, 1000);
		return () => {
			isActive = false;
		};
	}, []);
	const changeScreen = async () => {
		const token = await AsyncStorage.getItem(TOKEN);
		const selectedRole = await AsyncStorage.getItem(ROLESELECTED);
		const gradeList = await AsyncStorage.getItem(GRADELIST);
		const categoryList = await AsyncStorage.getItem(CATEGORYLIST);
		const userDetails = await AsyncStorage.getItem(USER_DETAILS);
		selectedRole && store.dispatch(storeRoleDetails(selectedRole));
		gradeList && store.dispatch(storeGradeDetails(JSON.parse(gradeList)));
		categoryList && store.dispatch(storeCategoryDetails(JSON.parse(categoryList)));
		userDetails && store.dispatch(getUserDetails(JSON.parse(userDetails)));
		// props.navigation.navigate('RoleSelectionScreen');

		console.log(selectedRole, selectedRole == 'lms', 'selectedRole');
		if (!token || !selectedRole) {
			props.navigation.navigate('RoleSelectionScreen');
		} else if (token) {
			if (selectedRole == 'lms') {
				props.navigation.navigate('Home');
			} else {
				props.navigation.navigate('Dashboard');
			}
		}
	};
	return (
		<View style={{ ...basicStyles.container, alignItems: 'center', justifyContent: 'center' }}>
			<Image style={{ width: 200, height: 200 }} source={appImages.appImages.LOGO1} />
		</View>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGrades: (requestData, onResponse, showSnackBar) => {
			dispatch(getGrades(requestData, onResponse, showSnackBar));
		}
	};
};

export default connect(null, mapDispatchToProps)(SplashScreen);
