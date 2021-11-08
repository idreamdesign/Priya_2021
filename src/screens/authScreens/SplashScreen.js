import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import basicStyles from '../../styles/basicStyles';

export const SplashScreen = (props) => {
	React.useEffect(() => {
		let isActive = true;
		setTimeout(() => {
			props.navigation.navigate('RoleSelectionScreen');
		}, 1000);
		return () => {
			isActive = false;
		};
	}, []);
	return (
		<View style={{ ...basicStyles.container, alignItems: 'center', justifyContent: 'center' }}>
			<Image style={{ width: 200, height: 200 }} source={appImages.appImages.LOGO1} />
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
