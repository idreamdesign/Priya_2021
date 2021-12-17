import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../assets';
import CourseListLoader from '../../../components/loaders/CourseListLoader';
import NoDataFound from '../../../components/NoDataFound';
import Rating from '../../../components/Rating';
import { getMyFavourites } from '../../../redux/root.actions';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/myCoursesStyles';
import appColors from '../../../utils/appColors';
import getIcon from '../../../utils/commonfunctions/getIcon';

export const FavouriteList = (props) => {
	const [ myFavCourses, setMyFavcourses ] = useState(null);

	useFocusEffect(
		React.useCallback(
			() => {
				getMyFavourites();
			},
			[ props.navigation ]
		)
	);
	const getMyFavourites = async () => {
		props.getMyFavourites(
			null,
			(res) => {
				const response = res.data;
				if (response) {
					setMyFavcourses(response);
					console.log(response, 'setMyFavcourses:::::::::');
				}
			},
			false
		);
	};
	return (
		<ScrollView style={{ ...basicStyles.container, flex: 0, height: undefined }}>
			{myFavCourses ? myFavCourses.length == 0 ? (
				<NoDataFound />
			) : (
				myFavCourses.map((el, i) => {
					return (
						<View key={i} style={styles.courseCard}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<Text style={styles.cardTitle}>{el?.course?.sub_category?.name}</Text>
								{getIcon('mi', 'delete', null, 30, appColors.grey)}
							</View>
							<Text style={styles.cardSubTitle}>{el?.course?.title} - chapter 01</Text>
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
				})
			) : (
				<CourseListLoader style={{ ...styles.courseCard, margin: 10 }} />
			)}
		</ScrollView>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		getMyFavourites: (requestData, onResponse, showSnackBar) => {
			dispatch(getMyFavourites(requestData, onResponse, showSnackBar));
		}
	};
};

export default connect(null, mapDispatchToProps)(FavouriteList);
