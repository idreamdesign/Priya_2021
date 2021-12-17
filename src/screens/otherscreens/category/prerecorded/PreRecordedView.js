import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/categoryStyles';
import appColors from '../../../../utils/appColors';

export const PreRecordedView = (props) => {
	const colorsArray = [ '#f00c2a', '#f00ce1', '#800bd9', '#d92d0b', '#4c0fd9' ];
	return (
		<View style={basicStyles.container}>
			{colorsArray.map((item, i) => {
				return (
					<TouchableOpacity
						onPress={() => props.navigation.navigate('CourseView')}
						style={styles.preRecordOuterView}
						key={i}
					>
						<View style={{ ...styles.preRecordChapFab, backgroundColor: item }}>
							<Text style={styles.chapterTxt}>#{i + 1}</Text>
						</View>
						<Text style={styles.chapterName}>Chapter name</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PreRecordedView);
