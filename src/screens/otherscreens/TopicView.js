import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/categoryStyles';
import SearchBar from '../../components/SearchBar';
import appColors from '../../utils/appColors';

export const TopicView = (props) => {
	const colorsArray = [ '#f00c2a', '#f00ce1', '#800bd9', '#d92d0b', '#4c0fd9' ];
	return (
		<View style={basicStyles.container}>
			<SearchBar
				placeHolder="Seach subject or class"
				style={{ height: 50, marginTop: 10, borderColor: appColors.placeHolderGrey }}
			/>
			{colorsArray.map((item, i) => {
				return (
					<TouchableOpacity
						key={i}
						// onPress={() => props.navigation.navigate('CourseView')}
						style={{ ...styles.preRecordOuterView, paddingBottom: 10 }}
					>
						<View style={{ ...styles.preRecordChapFab, borderRadius: 0, backgroundColor: item }}>
							<Text style={styles.chapterTxt}>#{i + 1}</Text>
						</View>
						<View>
							<Text style={styles.chapterName}>Chapter name</Text>
							<Text style={{ ...styles.chapterName, fontSize: 13, marginTop: 5, fontWeight: 'normal' }}>
								Chapter name
							</Text>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TopicView);
