import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Image, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import {
	getCategories,
	getGrades,
	storeCategoryDetails,
	storeGradeDetails,
	storeRoleDetails
} from '../../redux/root.actions';
import store from '../../redux/store';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/roleSelectioStyles';
import { CATEGORYLIST, GRADELIST, ROLESELECTED } from '../../utils/constants';

export const RoleSelectionScreen = (props) => {
	React.useEffect(() => {
		let isActive = true;
		isActive && storeGrades();
		return () => {
			isActive = false;
		};
	}, []);
	const storeGrades = async () => {
		props.getGrades(
			null,
			async (res) => {
				let gradeResponse = res.data;
				gradeResponse.forEach((element) => ((element.label = element.title), (element.value = element.id)));
				store.dispatch(storeGradeDetails(gradeResponse));
				await AsyncStorage.setItem(GRADELIST, JSON.stringify(gradeResponse));
			},
			false
		);
		props.getCategories(
			null,
			async (res) => {
				let categoryResponse = res.data;
				categoryResponse.forEach((element) => ((element.label = element.title), (element.value = element.id)));
				store.dispatch(storeCategoryDetails(categoryResponse));
				await AsyncStorage.setItem(CATEGORYLIST, JSON.stringify(categoryResponse));
			},
			false
		);
	};
	return (
		<View style={{ ...basicStyles.container, alignItems: 'center', justifyContent: 'center' }}>
			<Image source={appImages.appImages.LOGO1} style={styles.logoStyles} />
			<View style={styles.selectionContainer}>
				<View style={styles.roleCard}>
					<Image source={appImages.appImages.LMS} style={styles.roleImg} />
					<TouchableOpacity
						onPress={async () => {
							await AsyncStorage.setItem(ROLESELECTED, 'lms');
							store.dispatch(storeRoleDetails('lms'));
							props.navigation.navigate('LoginScreen', { from: 'lms' });
						}}
						style={styles.roleNameContainer}
					>
						<Text style={styles.roleName}>LMS</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.roleCard}>
					<Image source={appImages.appImages.ECOM} style={styles.roleImg} />
					<TouchableOpacity
						onPress={async () => {
							await AsyncStorage.setItem(ROLESELECTED, 'ecom');
							store.dispatch(storeRoleDetails('ecom'));
							props.navigation.navigate('LoginScreen', { from: 'ecom' });
						}}
						style={styles.roleNameContainer}
					>
						<Text style={styles.roleName}>ECOMMERCE</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGrades: (requestData, onResponse, showSnackBar) => {
			dispatch(getGrades(requestData, onResponse, showSnackBar));
		},
		getCategories: (requestData, onResponse, showSnackBar) => {
			dispatch(getCategories(requestData, onResponse, showSnackBar));
		}
	};
};

export default connect(null, mapDispatchToProps)(RoleSelectionScreen);
