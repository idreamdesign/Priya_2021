import React from 'react';
import { View, Text } from 'react-native';
import appColors from '../utils/appColors';
import { HEIGHT } from '../utils/constants';

const NoDataFound = () => {
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
			<Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'center', color: appColors.primaryColor }}>
				No data found
			</Text>
		</View>
	);
};

export default NoDataFound;
