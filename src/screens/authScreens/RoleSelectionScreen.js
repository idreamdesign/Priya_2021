import React from 'react';
import { View, Image, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import { storeRoleDetails } from '../../redux/root.actions';
import store from '../../redux/store';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/roleSelectioStyles';

export const RoleSelectionScreen = (props) => {
	return (
		<View style={{ ...basicStyles.container, alignItems: 'center', justifyContent: 'center' }}>
			<Image source={appImages.appImages.LOGO1} style={styles.logoStyles} />
			<View style={styles.selectionContainer}>
				<View style={styles.roleCard}>
					<Image source={appImages.appImages.LMS} style={styles.roleImg} />
					<TouchableOpacity
						onPress={() => {
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
						onPress={() => {
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoleSelectionScreen);
