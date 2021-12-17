import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from '../../styles/myCoursesStyles';

const CourseListLoader = ({ style }) => {
	return (
		<Fragment>
			{[ 1, 2, 3, 4, 5 ].map((el, i) => {
				return (
					<SkeletonPlaceholder key={i}>
						<View style={{ ...style }}>
							{/* <View style={{ height: 120, width: 160, borderRadius: 20 }} />
				<View style={{ height: 30, marginTop: 10, width: 160, borderRadius: 20 }} /> */}
						</View>
					</SkeletonPlaceholder>
				);
			})}
		</Fragment>
	);
};

export default CourseListLoader;
