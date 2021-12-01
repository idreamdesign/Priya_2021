import React from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from '../../styles/HomeStyles';
const TopicLoader = ({ style }) => {
	return (
		<SkeletonPlaceholder>
			<View style={{ ...style, ...styles.divisionInnerCard }}>
				{/* <View style={{ height: 120, width: 160, borderRadius: 20 }} /> */}
			</View>
		</SkeletonPlaceholder>
	);
};

export default TopicLoader;
