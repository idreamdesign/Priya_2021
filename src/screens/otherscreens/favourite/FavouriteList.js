import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../assets';
import Rating from '../../../components/Rating';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/myCoursesStyles';
import appColors from '../../../utils/appColors';
import getIcon from '../../../utils/commonfunctions/getIcon';

export const FavouriteList = (props) => {
	return (
		<ScrollView style={{ ...basicStyles.container, flex: 0, height: undefined }}>
			{Array.from(Array(10).keys()).map((el, i) => {
				return (
					<View key={i} style={styles.courseCard}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text style={styles.cardTitle}>Pre Recorded class</Text>
							{getIcon('mi', 'delete', null, 30, appColors.grey)}
						</View>
						<Text style={styles.cardSubTitle}>10th maths - chapter 01</Text>
						<View style={styles.classDetailsContainer}>
							<Image style={styles.classImage} source={appImages.otherImages.TEACHING} />
							<View style={styles.classDesc}>
								<Text style={{ fontSize: 15 }}>150 hours duration</Text>
								<Text style={{ marginTop: 5, fontSize: 15 }}>28-05-2021</Text>
								<Rating rating={4.5} iconSize={20} style={{ marginTop: 5 }} />
							</View>
						</View>
					</View>
				);
			})}
		</ScrollView>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteList);
