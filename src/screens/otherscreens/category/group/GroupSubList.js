import React, { useState } from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../../assets';
import FullSizeBtn from '../../../../components/FullSizeBtn';
import SearchBar from '../../../../components/SearchBar';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/categoryStyles';
import otherstyles from '../../../../styles/myCoursesStyles';

import appColors from '../../../../utils/appColors';
import getIcon from '../../../../utils/commonfunctions/getIcon';
import { WIDTH } from '../../../../utils/constants';

export const GroupSubList = (props) => {
	const [ confirmationPopup, setConfirationPopup ] = useState(false);
	return (
		<View style={{ ...basicStyles, flex: 0, height: undefined }}>
			<Modal
				onRequestClose={() => setConfirationPopup(false)}
				style={{ alignItems: 'center', justifyContent: 'center' }}
				visible={confirmationPopup}
				transparent
			>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<View
						style={{
							...otherstyles.confimationPopupContainer
						}}
					>
						<View
							style={{
								height: 150,
								backgroundColor: appColors.lightGreen,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							{getIcon('ad', 'checkcircle', null, 30, appColors.white)}
							<Text
								style={{
									color: appColors.white,
									...otherstyles.topSpacing,
									fontWeight: '500',
									fontSize: 18
								}}
							>
								Enroll Details
							</Text>
						</View>
						<View style={{ padding: 10 }}>
							<View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
								<Image style={{ width: 80, height: 80 }} source={appImages.otherImages.TEACHING} />
								<View style={{ flexDirection: 'column', marginLeft: 10 }}>
									<Text style={{ ...otherstyles.courseTitle }}>Chemistry - chapter 01</Text>
									<Text style={{ ...otherstyles.courseDesc, marginTop: 5, borderBottomWidth: 0 }}>
										CBSE
									</Text>
									<Text style={{ ...otherstyles.courseDesc, marginTop: 5, borderBottomWidth: 0 }}>
										Total duration - 160 hour
									</Text>
								</View>
							</View>

							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginLeft: 10,
									marginRight: 10
								}}
							>
								<Text style={styles.onetoOneTitle}>
									Slot Date <Text style={{ fontWeight: 'normal', fontSize: 14 }}> 01-06-2021</Text>
								</Text>
								<Text style={styles.onetoOneTitle}>
									Slot Time <Text style={{ fontWeight: 'normal', fontSize: 14 }}> 01:30 PM</Text>
								</Text>
							</View>
							<View style={styles.slotAvailabilityContainer}>
								<Text style={{ ...styles.onetoOneTitle, fontWeight: '400' }}>
									Slot availability <Text style={{ fontWeight: 'normal', fontSize: 14 }}> 50/40</Text>
								</Text>
								<TouchableOpacity
									style={{
										...styles.bookingBtn,
										backgroundColor: appColors.inkBlue,
										borderColor: appColors.inkBlue,
										width: 125
									}}
									onPress={() => (setConfirationPopup(false), props.navigation.navigate('Home'))}
								>
									<Text style={{ ...styles.bookNowTxt, color: appColors.white }}> Confirm</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
			<View style={{ marginTop: 10 }}>
				<ScrollView>
					{[ 1, 2, 3, 4, 5, 6, 7, 8 ].map((item, i) => {
						return (
							<TouchableOpacity
								key={i}
								style={{
									borderBottomWidth: 1,
									borderBottomColor: appColors.dimGrey,
									paddingBottom: 10
								}}
							>
								<View
									style={{
										...styles.oneToOneCard,
										borderBottomWidth: 0,
										justifyContent: 'space-between'
									}}
								>
									<View style={{ flexDirection: 'row', width: '70%' }}>
										<Image
											style={styles.oneToOneImg}
											resizeMode="stretch"
											source={appImages.otherImages.ONETOONE}
										/>
										<View style={{ marginLeft: 10 }}>
											<Text style={styles.onetoOneTitle}>Form 6 science</Text>
											<Text style={styles.onetoOneDesc}>Form 6 science</Text>
											<Text style={styles.onetoOneDesc}>5 hour duration</Text>
										</View>
									</View>
								</View>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										marginLeft: 10,
										marginRight: 10
									}}
								>
									<Text style={styles.onetoOneTitle}>
										Slot Date{' '}
										<Text style={{ fontWeight: 'normal', fontSize: 14 }}> 01-06-2021</Text>
									</Text>
									<Text style={styles.onetoOneTitle}>
										Slot Time <Text style={{ fontWeight: 'normal', fontSize: 14 }}> 01:30 PM</Text>
									</Text>
								</View>
								<View style={styles.slotAvailabilityContainer}>
									<Text style={{ ...styles.onetoOneTitle, fontWeight: '400' }}>
										Slot availability{' '}
										<Text style={{ fontWeight: 'normal', fontSize: 14 }}> 50/40</Text>
									</Text>
									<TouchableOpacity
										style={{
											...styles.bookingBtn,
											backgroundColor: appColors.inkBlue,
											borderColor: appColors.inkBlue,
											width: 125
										}}
										onPress={() => setConfirationPopup(true)}
									>
										<Text style={{ ...styles.bookNowTxt, color: appColors.white }}>Enroll now</Text>
									</TouchableOpacity>
								</View>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupSubList);
