import React, { Fragment, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Alert, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import Rating from '../../components/Rating';
import SearchBar from '../../components/SearchBar';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/HomeStyles';
import appColors from '../../utils/appColors';
import getIcon from '../../utils/commonfunctions/getIcon';
import GradePopup from '../../components/GradePopup';
import store from '../../redux/store';
import { getTopics, getUpcomingCourses } from '../../redux/root.actions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ClassLoader from '../../components/loaders/ClassLoader';
import { NODATAFOUND } from '../../utils/constants';
import getPictures from '../../utils/commonfunctions/getPictures';
import NoDataFound from '../../components/NoDataFound';
import TopicLoader from '../../components/loaders/TopicLoader';

export const Home = (props) => {
	const categories = store.getState().auth.categoryDetails;
	const [ gradePopup, setGradePopup ] = useState(false);
	const [ selectedGrade, setSelectedGrade ] = useState(null);
	const [ selectedGradeLabel, setSelectedGradeLabel ] = useState(null);
	const [ upcomingClasses, setUpcomingClasses ] = useState(null);
	const [ topics, setTopics ] = useState(null);

	React.useEffect(() => {
		let isActive = true;
		// BackHandler.addEventListener('hardwareBackPress', backAction);
		isActive && getUpcomingCourses();
		return () => {
			// BackHandler.removeEventListener('hardwareBackPress', backAction);
			isActive = false;
		};
	}, []);
	const [ onErr, setOnErr ] = useState(false);
	const getUpcomingCourses = async () => {
		props.getUpcomingCourses(
			null,
			(res) => {
				const response = res.data;
				if (response) {
					setUpcomingClasses(response);
					console.log(response, 'Upcoming:::::::::');
				}
			},
			false
		);
		props.getTopics(
			null,
			(res) => {
				const response = res.data;
				if (response) {
					setTopics(response);
					console.log(response, 'topics:::::::::');
				}
			},
			false
		);
	};
	// const backAction = () => {
	// 	Alert.alert('Exit', 'Are you sure you want to exit from the App?', [
	// 		{
	// 			text: 'Cancel',
	// 			onPress: () => null,
	// 			style: 'cancel'
	// 		},
	// 		{ text: 'YES', onPress: () => BackHandler.exitApp() }
	// 	]);
	// 	return true;
	// };
	return (
		<View style={basicStyles.container}>
			{/* <SkeletonContent containerStyle={{ flex: 1, width: 300 }} isLoading={false}>
				<View style={{ height: 200, backgroundColor: 'yellow' }} />
			</SkeletonContent> */}

			<GradePopup
				onSelect={(option, label) => (
					setSelectedGrade(option), setSelectedGradeLabel(label), setGradePopup(false)
				)}
				visiblity={gradePopup}
				onClose={() => setGradePopup(false)}
			/>
			<View style={styles.searchBarContainer}>
				<SearchBar placeHolder="Search Course" style={{ marginTop: 10, backgroundColor: 'white' }} />
			</View>

			<ScrollView>
				<View style={{ padding: 10 }}>
					<View style={styles.categoryHeading}>
						<Text style={styles.categoryTitle}>Categories</Text>
						<TouchableOpacity style={styles.selectGrade} onPress={() => setGradePopup(true)}>
							<Text style={styles.selectGradeTxt}>
								{selectedGrade ? selectedGradeLabel : 'Select Grade'}
							</Text>
							{getIcon('ion', 'chevron-down-outline', null, 16)}
						</TouchableOpacity>
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ marginTop: 15 }}
					>
						{categories.map((cat, i) => {
							console.log(cat);
							return (
								<TouchableOpacity
									key={i}
									onPress={() => props.navigation.navigate('OneToOne')}
									style={styles.categoryCard}
								>
									<Text style={styles.categoryTitle}>{cat.name}</Text>
									<Image
										onError={() => {
											console.log(i, 'Err in this image::::::');
											setOnErr(true);
										}}
										resizeMode="stretch"
										source={
											cat.thumbnail ? (
												{ uri: getPictures(cat.thumbnail) }
											) : (
												appImages.otherImages.ONETOONECLASS
											)
										}
										style={styles.categoryImg}
									/>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>
				<View style={styles.divisionalCard}>
					<View style={styles.divisionHeader}>
						<Text style={styles.categoryTitle}>Topics</Text>
						{getIcon('ion', 'chevron-forward', null, 25)}
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ marginTop: 15 }}
					>
						{topics ? topics.length != 0 ? (
							topics.map((top, i) => {
								return (
									<TouchableOpacity
										key={i}
										onPress={() => props.navigation.navigate('TopicView')}
										style={styles.divisionInnerCard}
									>
										<Image
											resizeMode="stretch"
											source={
												top.thumbnail ? { uri: top.thumbnail } : appImages.otherImages.ONETOONE
											}
											style={styles.topImg}
										/>
										<Text style={styles.divisionSub}>{top.title}</Text>
									</TouchableOpacity>
								);
							})
						) : (
							<NoDataFound />
						) : (
							[ 1, 2, 3, 4, 5 ].map((el, i) => {
								return (
									<Fragment key={i}>
										<TopicLoader style={{ left: 10 }} />
									</Fragment>
								);
							})
						)}
					</ScrollView>
				</View>
				<View style={{ ...styles.divisionalCard, height: 250, backgroundColor: appColors.white }}>
					<View style={styles.divisionHeader}>
						<Text style={styles.categoryTitle}>Continue Watching</Text>
						{getIcon('ion', 'chevron-forward', null, 25)}
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ marginTop: 15 }}
					>
						<View style={styles.classesCard}>
							<Image
								resizeMode="stretch"
								source={appImages.otherImages.TEACHING}
								style={styles.continueImg}
							/>

							<Text style={styles.subTitle}>Chemistry</Text>
							<Text style={styles.divisionSub}>Topic name</Text>

							<Rating rating={4} iconSize={20} style={{ marginTop: 5 }} />
						</View>
						<View style={styles.classesCard}>
							<Image
								resizeMode="stretch"
								source={appImages.otherImages.TEACHING}
								style={styles.continueImg}
							/>

							<Text style={styles.subTitle}>Biology</Text>
							<Text style={styles.divisionSub}>Topic name</Text>
							<Rating rating={3.5} iconSize={20} style={{ marginTop: 5 }} />
						</View>

						<View style={styles.classesCard}>
							<Image
								resizeMode="stretch"
								source={appImages.otherImages.TEACHING}
								style={styles.continueImg}
							/>

							<Text style={styles.subTitle}>English</Text>
							<Text style={styles.divisionSub}>Topic name</Text>
							<Rating rating={4.5} iconSize={20} style={{ marginTop: 5 }} />
						</View>
					</ScrollView>
				</View>
				<View
					style={{
						...styles.divisionalCard,
						height: 250,
						backgroundColor: appColors.paleBlue,
						marginTop: -5
					}}
				>
					<View style={styles.divisionHeader}>
						<Text style={styles.categoryTitle}>Upcoming Class</Text>
						{getIcon('ion', 'chevron-forward', null, 25)}
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ marginTop: 15 }}
					>
						{upcomingClasses ? upcomingClasses.length != 0 ? (
							upcomingClasses.map((course, i) => {
								return (
									<View style={styles.classesCard} key={i}>
										<Image
											resizeMode="stretch"
											source={
												course.thumbnail ? (
													{ uri: getPictures(course.thumbnail) }
												) : (
													appImages.otherImages.TEACHING
												)
											}
											style={styles.continueImg}
										/>

										<Text style={styles.subTitle}>{course.title}</Text>
										<Text style={styles.divisionSub}>{course.slug}</Text>
										<Text style={styles.divisionSub}>{course.publishedDateTime}</Text>
									</View>
								);
							})
						) : (
							<NoDataFound />
						) : (
							[ 1, 2, 3, 4 ].map((el, i) => {
								return (
									<Fragment key={i}>
										<ClassLoader style={i > 0 && { marginLeft: 10 }} />
									</Fragment>
								);
							})
						)}
					</ScrollView>
				</View>
			</ScrollView>
		</View>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUpcomingCourses: (requestData, onResponse, showSnackBar) => {
			dispatch(getUpcomingCourses(requestData, onResponse, showSnackBar));
		},
		getTopics: (requestData, onResponse, showSnackBar) => {
			dispatch(getTopics(requestData, onResponse, showSnackBar));
		}
	};
};

export default connect(null, mapDispatchToProps)(Home);
