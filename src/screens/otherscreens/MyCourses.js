import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/myCoursesStyles';

export const MyCourses = (props) => {
	return (
		<ScrollView contentContainerStyle={{ ...basicStyles.container, flex: 0, height: undefined }}>
			{Array.from(Array(10).keys()).map((el, i) => {
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
			})}
		</ScrollView>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyCourses);
