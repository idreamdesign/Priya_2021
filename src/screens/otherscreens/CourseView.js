import React, { Fragment, useState } from 'react';
import { Image, Modal, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import FullSizeBtn from '../../components/FullSizeBtn';
import Rating from '../../components/Rating';
import RatingProgressBar from '../../components/RatingProgressBar';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/myCoursesStyles';
import appColors from '../../utils/appColors';
import getIcon from '../../utils/commonfunctions/getIcon';
import { HEIGHT, WIDTH } from '../../utils/constants';

export const CourseView = (props) => {
	const [ unSubscribed, setunSubscribed ] = useState(true);
	const [ confirmationPopup, setConfirationPopup ] = useState(false);
	const Content = () => {
		return (
			<Fragment>
				<Modal
					onRequestClose={() => setConfirationPopup(false)}
					style={{ alignItems: 'center', justifyContent: 'center' }}
					visible={confirmationPopup}
					transparent
				>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ ...styles.confimationPopupContainer, padding: 10 }}>
							<Text style={{ color: appColors.primaryColor, fontWeight: '500', fontSize: 18 }}>
								Pre recorded class
							</Text>
							<View style={{ marginTop: '25%' }}>
								<Text style={{ fontWeight: '400', fontSize: 15 }}>Total course amount :</Text>
							</View>
							<View style={styles.courseAmnt}>
								<Text style={{ color: appColors.darkGreen, fontSize: 18, fontWeight: '600' }}>RM</Text>
							</View>
							<FullSizeBtn
								onPress={() => unSubscribed && (setConfirationPopup(false), setunSubscribed(false))}
								btnColor={appColors.inkBlue}
								btnTitle={'Confirm Now'}
								style={{ borderRadius: 0, width: '100%', marginTop: 30 }}
							/>
						</View>
					</View>
				</Modal>
				<View style={styles.videoContainer}>
					<Text>Vdo</Text>
				</View>
				<ScrollView contentContainerStyle={styles.courseDetailsContainer}>
					<Text style={styles.courseTitle}>Maths chap 01</Text>
					<Text style={styles.courseDesc}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
						the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
						of type and scrambled it to make a type specimen book.
					</Text>
					<Rating rating={3.5} iconSize={15} style={{ marginTop: 5 }} />
					<Text style={styles.topSpacing}>41 students enrolled</Text>
					<Text style={styles.topSpacing}>Created by admi</Text>
					<Text style={styles.topSpacing}>Last update Mon,20-Jul-2020</Text>

					<View style={{ backgroundColor: appColors.white, padding: 5, paddingTop: 0 }}>
						<Text
							style={{
								...styles.topSpacing,
								...styles.courseRupees,
								fontSize: unSubscribed ? 18 : 16,
								fontWeight: unSubscribed ? '900' : 'normal',
								color: unSubscribed ? appColors.primaryColor : appColors.orange
							}}
						>
							RM 1500
						</Text>

						<FullSizeBtn
							onPress={() => unSubscribed && setConfirationPopup(true)}
							btnColor={unSubscribed ? appColors.inkBlue : appColors.paleGreen}
							btnTitle={unSubscribed ? 'Pay Now' : 'Already subscribed'}
							btnTitleStyles={
								unSubscribed ? (
									{}
								) : (
									{
										textTransform: 'capitalize',
										color: appColors.darkGreen,
										fontWeight: 'normal'
									}
								)
							}
							style={
								unSubscribed ? (
									{ borderRadius: 30, ...styles.topSpacing, width: '100%' }
								) : (
									{ borderRadius: 0, width: '100%', ...styles.topSpacing }
								)
							}
						/>
					</View>
					<Text style={styles.courseTitle}>Curriculum for this course</Text>
					{[ 1, 2, 3, 4, 5 ].map((item, i) => {
						return (
							<View style={styles.curriculumCard} key={i}>
								<Image style={styles.curriculumImg} source={appImages.otherImages.TEACHING} />
								<View style={{ marginLeft: 10 }}>
									<Text style={styles.curriculumTitle}>title</Text>
									<Text style={styles.curriculumDesc}>title</Text>
								</View>
							</View>
						);
					})}
					<Text style={styles.courseTitle}>Student Reviews</Text>
					<View style={{ flexDirection: 'row', width: '100%' }}>
						<View sty={{ width: '40%' }}>
							<View style={{ ...styles.topSpacing, flexDirection: 'row' }}>
								<Text style={{ ...styles.starText, width: '25%' }}>5 stars</Text>
								<View>
									<RatingProgressBar progressLevel={100} widthHeight={{ width: 150, height: 20 }} />
								</View>
							</View>

							<View style={{ ...styles.topSpacing, flexDirection: 'row' }}>
								<Text style={{ ...styles.starText, width: '25%' }}>4 stars</Text>
								<View>
									<RatingProgressBar progressLevel={100} widthHeight={{ width: 150, height: 20 }} />
								</View>
							</View>
							<View style={{ ...styles.topSpacing, flexDirection: 'row' }}>
								<Text style={{ ...styles.starText, width: '25%' }}>3 stars</Text>
								<View>
									<RatingProgressBar progressLevel={100} widthHeight={{ width: 150, height: 20 }} />
								</View>
							</View>
							<View style={{ ...styles.topSpacing, flexDirection: 'row' }}>
								<Text style={{ ...styles.starText, width: '25%' }}>2 stars</Text>
								<View>
									<RatingProgressBar progressLevel={100} widthHeight={{ width: 150, height: 20 }} />
								</View>
							</View>
							<View style={{ ...styles.topSpacing, flexDirection: 'row' }}>
								<Text style={{ ...styles.starText, width: '25%' }}>1 star</Text>
								<View>
									<RatingProgressBar progressLevel={100} widthHeight={{ width: 150, height: 20 }} />
								</View>
							</View>
						</View>
						<View style={styles.overallRatingBox}>
							<Text style={styles.overallRating}>4.0</Text>
							<Rating rating={4} iconSize={20} style={{ marginTop: 5 }} />
							<Text style={styles.noOfReviews}>( 10 Reviews )</Text>
						</View>
					</View>
					{[ 1, 2, 3, 4, 5 ].map((item, i) => {
						return (
							<View style={{ ...styles.curriculumCard, flexDirection: 'column' }} key={i}>
								<View style={{ flexDirection: 'row' }}>
									<View style={styles.starNosContainer}>
										<Text style={styles.noOfStars}>
											5{getIcon('ion', 'star', null, 15, appColors.white)}
										</Text>
									</View>
									<Text style={{ ...styles.curriculumTitle, marginLeft: 10 }}>title</Text>
								</View>
								<View style={{ marginLeft: -10, marginTop: 5 }}>
									<Text style={{ ...styles.curriculumTitle, fontWeight: 'normal' }}>title</Text>
									<Text style={styles.curriculumDesc}>title</Text>
								</View>
							</View>
						);
					})}
				</ScrollView>
			</Fragment>
		);
	};
	return (
		<View
			style={
				unSubscribed ? (
					{
						flex: 1,
						left: 0,
						top: 0,
						opacity: 0.5,
						backgroundColor: appColors.grey,
						width: WIDTH,
						height: HEIGHT
					}
				) : (
					basicStyles.container
				)
			}
		>
			<Content />
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CourseView);
