import React, { Fragment, useState } from 'react';
import { Image, Modal, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../../assets';
import FullSizeBtn from '../../../../components/FullSizeBtn';
import Rating from '../../../../components/Rating';
import RatingProgressBar from '../../../../components/RatingProgressBar';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/myCoursesStyles';
import appColors from '../../../../utils/appColors';
import getIcon from '../../../../utils/commonfunctions/getIcon';
import { HEIGHT, WIDTH } from '../../../../utils/constants';

export const OneToOneView = (props) => {
	const [ unSubscribed, setunSubscribed ] = useState(false);
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
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '30%' }}>
						<View
							style={{
								...styles.confimationPopupContainer
							}}
						>
							<View
								style={{
									height: '50%',

									backgroundColor: appColors.lightGreen,
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								{getIcon('ad', 'checkcircle', null, 30, appColors.white)}
								<Text
									style={{
										color: appColors.white,
										...styles.topSpacing,
										fontWeight: '500',
										fontSize: 18
									}}
								>
									Payment Details
								</Text>
							</View>
							<View style={{ padding: 15 }}>
								<Text style={{ ...styles.courseTitle }}>Chemistry - chapter 01</Text>
								<Text style={{ ...styles.courseDesc, borderBottomWidth: 0 }}>5 hours duration</Text>

								<View style={styles.priceAndBtnContainer}>
									<Text
										style={{
											...styles.topSpacing,
											...styles.courseRupees,
											color: appColors.primaryColor,
											fontSize: 18
										}}
									>
										RM 1500
									</Text>

									<FullSizeBtn
										onPress={() => {
											setConfirationPopup(false);
											props.navigation.navigate('Home');
										}}
										btnColor={unSubscribed ? appColors.inkBlue : appColors.paleGreen}
										btnTitle={'Confirm payment'}
										// btnTitleStyles={{ backgroundColor: appColors.inkBlue, width: '50%' }}
										style={{
											backgroundColor: appColors.inkBlue,
											width: '60%',
											height: 40,
											borderRadius: 40
										}}
									/>
								</View>
							</View>
						</View>
					</View>
				</Modal>
				<View style={{ ...styles.videoContainer, backgroundColor: appColors.white, marginTop: 10 }}>
					<Image
						style={{ height: '100%', width: '95%', borderRadius: 10, alignSelf: 'center' }}
						source={appImages.otherImages.TEACHING}
					/>
				</View>
				<ScrollView contentContainerStyle={styles.courseDetailsContainer}>
					<Text style={{ ...styles.courseTitle, fontSize: 16 }}>Chemistry - CARBON AND ITS COMPONENTS</Text>
					<Text style={{ ...styles.courseDesc, borderBottomWidth: 0 }}>5 hours duration</Text>
					<Text style={{ ...styles.courseTitle, fontSize: 14 }}>Class description</Text>
					<Text style={{ ...styles.courseDesc, borderBottomWidth: 0 }}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
						the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
						of type and scrambled it to make a type specimen book.
					</Text>

					<View
						style={{
							backgroundColor: appColors.white,
							padding: 5,
							paddingTop: 0,
							flexDirection: 'row',
							width: '100%',
							justifyContent: 'space-between',
							alignItems: 'center',
							borderBottomWidth: 1,
							borderColor: appColors.dimGrey,
							paddingBottom: 20
						}}
					>
						<Text
							style={{
								...styles.topSpacing,
								...styles.courseRupees,
								color: appColors.primaryColor,
								fontSize: 18
							}}
						>
							RM 1500
						</Text>

						<FullSizeBtn
							onPress={() => setConfirationPopup(true)}
							btnColor={unSubscribed ? appColors.inkBlue : appColors.paleGreen}
							btnTitle={'Pay Now'}
							// btnTitleStyles={{ backgroundColor: appColors.inkBlue, width: '50%' }}
							style={{
								backgroundColor: appColors.darkGreen,
								width: '55%',
								height: 35,
								borderRadius: 40
							}}
						/>
					</View>

					<Text style={styles.courseTitle}>Reviews</Text>
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
				</ScrollView>
			</Fragment>
		);
	};
	return (
		<View style={basicStyles.container}>
			<Content />
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OneToOneView);
