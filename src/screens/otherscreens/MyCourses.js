import { useFocusEffect } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import CourseListLoader from '../../components/loaders/CourseListLoader';
import NoDataFound from '../../components/NoDataFound';
import { getMyCourses } from '../../redux/root.actions';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/myCoursesStyles';

export const MyCourses = (props) => {
	const [ myCourses, setMycourses ] = useState(null);
	useFocusEffect(
		React.useCallback(
			() => {
				getMyCourses();
			},
			[ props.navigation ]
		)
	);
	const getMyCourses = async () => {
		props.getMyCourses(
			null,
			(res) => {
				const response = res.data;
				if (response) {
					setMycourses(response);
					console.log(response, 'setMycourses:::::::::');
				}
			},
			false
		);
	};
	return (
		<ScrollView contentContainerStyle={{ ...basicStyles.container, flex: 0, height: undefined }}>
			{myCourses ? myCourses.length == 0 ? (
				<NoDataFound />
			) : (
				Array.from(Array(10).keys()).map((el, i) => {
					return (
						<TouchableOpacity
							onPress={() => props.navigation.navigate('CourseView')}
							key={i}
							style={styles.courseCard}
						>
							<Text style={styles.cardTitle}>Pre Recorded class</Text>
							<Text style={styles.cardSubTitle}>10th maths - chapter 01</Text>
							<View style={styles.classDetailsContainer}>
								<Image style={styles.classImage} source={appImages.otherImages.TEACHING} />
								<View style={styles.classDesc}>
									<Text style={{ fontSize: 15 }}>150 hours duration</Text>
									<Text style={{ marginTop: 5, fontSize: 15 }}>28-05-2021</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				})
			) : (
				<CourseListLoader style={{ ...styles.courseCard, margin: 10 }} />
			)}
		</ScrollView>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		getMyCourses: (requestData, onResponse, showSnackBar) => {
			dispatch(getMyCourses(requestData, onResponse, showSnackBar));
		}
	};
};

export default connect(null, mapDispatchToProps)(MyCourses);
