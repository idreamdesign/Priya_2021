import React, { useState } from 'react';
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

export const Home = (props) => {
	const [ gradePopup, setGradePopup ] = useState(false);
	const gradeOptions = [ 'Form 1', 'Form 2', 'Form 3' ];
	const [ selectedGrade, setSelectedGrade ] = useState(null);
	React.useEffect(() => {
		let isActive = true;
		BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', backAction);
			isActive = false;
		};
	}, []);
	const backAction = () => {
		Alert.alert('Exit', 'Are you sure you want to exit from the App?', [
			{
				text: 'Cancel',
				onPress: () => null,
				style: 'cancel'
			},
			{ text: 'YES', onPress: () => BackHandler.exitApp() }
		]);
		return true;
	};
	return (
		<View style={basicStyles.container}>
			<GradePopup
				selectedGrade={selectedGrade}
				onSelect={(option) => (setSelectedGrade(option), setGradePopup(false))}
				gradeOptions={gradeOptions}
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
							<Text style={styles.selectGradeTxt}>{selectedGrade ? selectedGrade : 'Select Grade'}</Text>
							{getIcon('ion', 'chevron-down-outline', null, 16)}
						</TouchableOpacity>
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ marginTop: 15 }}
					>
						<TouchableOpacity
							onPress={() => props.navigation.navigate('OneToOne')}
							style={styles.categoryCard}
						>
							<Text style={styles.categoryTitle}>1 to 1 class</Text>
							<Image
								resizeMode="stretch"
								source={appImages.otherImages.ONETOONECLASS}
								style={styles.categoryImg}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => props.navigation.navigate('PreRecordedSubList')}
							style={styles.categoryCard}
						>
							<Text style={styles.categoryTitle}>Pre recorded class</Text>
							<Image
								resizeMode="stretch"
								source={appImages.otherImages.PRERECORDEDCLASS}
								style={styles.categoryImg}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => props.navigation.navigate('GroupClass')}
							style={styles.categoryCard}
						>
							<Text style={styles.categoryTitle}>Group class</Text>
							<Image
								resizeMode="stretch"
								source={appImages.otherImages.GROUPCLASS}
								style={styles.categoryImg}
							/>
						</TouchableOpacity>
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
						<TouchableOpacity
							onPress={() => props.navigation.navigate('TopicView')}
							style={styles.divisionInnerCard}
						>
							<Image resizeMode="stretch" source={appImages.otherImages.ONETOONE} style={styles.topImg} />
							<Text style={styles.divisionSub}>Maths</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => props.navigation.navigate('TopicView')}
							style={styles.divisionInnerCard}
						>
							<Image resizeMode="stretch" source={appImages.otherImages.ONETOONE} style={styles.topImg} />
							<Text style={styles.divisionSub}>Social</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => props.navigation.navigate('TopicView')}
							style={styles.divisionInnerCard}
						>
							<Image resizeMode="stretch" source={appImages.otherImages.ONETOONE} style={styles.topImg} />
							<Text style={styles.divisionSub}>Economy</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => props.navigation.navigate('TopicView')}
							style={styles.divisionInnerCard}
						>
							<Image resizeMode="stretch" source={appImages.otherImages.ONETOONE} style={styles.topImg} />
							<Text style={styles.divisionSub}>English</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => props.navigation.navigate('TopicView')}
							style={styles.divisionInnerCard}
						>
							<Image resizeMode="stretch" source={appImages.otherImages.ONETOONE} style={styles.topImg} />
							<Text style={styles.divisionSub}>History</Text>
						</TouchableOpacity>
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
						<View style={styles.classesCard}>
							<Image
								resizeMode="stretch"
								source={appImages.otherImages.TEACHING}
								style={styles.continueImg}
							/>

							<Text style={styles.subTitle}>English</Text>
							<Text style={styles.divisionSub}>Topic name</Text>
							<Text style={styles.divisionSub}>29-05-20215.37 PM</Text>
						</View>
						<View style={styles.classesCard}>
							<Image
								resizeMode="stretch"
								source={appImages.otherImages.TEACHING}
								style={styles.continueImg}
							/>

							<Text style={styles.subTitle}>Chemistry</Text>
							<Text style={styles.divisionSub}>Topic name</Text>
							<Text style={styles.divisionSub}>29-05-20215.37 PM</Text>
						</View>
						<View style={styles.classesCard}>
							<Image
								resizeMode="stretch"
								source={appImages.otherImages.TEACHING}
								style={styles.continueImg}
							/>

							<Text style={styles.subTitle}>Biology</Text>
							<Text style={styles.divisionSub}>Topic name</Text>
							<Text style={styles.divisionSub}>29-05-20215.37 PM</Text>
						</View>
					</ScrollView>
				</View>
			</ScrollView>
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
