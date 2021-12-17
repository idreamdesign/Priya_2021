import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import appColors from '../utils/appColors';
import { HEIGHT } from '../utils/constants';

const Loader = () => {
	return (
		<View
			style={{
				flex: 1,
				width: '100%',
				height: HEIGHT,
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<ActivityIndicator size={'large'} color={appColors.primaryColor} style={{ alignSelf: 'center' }} />
		</View>
	);
};

export default Loader;
