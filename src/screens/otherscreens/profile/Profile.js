import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../assets';
import store from '../../../redux/store';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/profileStyles';
import getIcon from '../../../utils/commonfunctions/getIcon';
import getProfileImage from '../../../utils/commonfunctions/getPictures';

export const Profile = (props) => {
	const initialUserDetails = store.getState().auth.userDetails;
	const [ userDetails, setUserDetails ] = useState(initialUserDetails);
	useFocusEffect(
		React.useCallback(
			() => {
				const initialUserDetails = store.getState().auth.userDetails;
				setUserDetails(initialUserDetails);
			},
			[ props.navigation ]
		)
	);
	const [ imagePopup, setImagePopup ] = useState(false);
	return (
		<View style={basicStyles.container}>
			{/* <Modal
			onRequestClose={onClose}
			style={{ alignItems: 'center', justifyContent: 'center' }}
			visible={visiblity}
			transparent
		>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View
					style={{
						backgroundColor: appColors.white,
						borderWidth: 1,
						borderColor: appColors.primaryColor,
						padding: 10,
						width: '60%'
					}}
				>
					<Text style={{ fontSize: 15, fontWeight: '500', marginBottom: 10 }}>Grade List</Text>
					{gradeOptions &&
						gradeOptions.map((option, index) => {
							return (
								<Fragment key={index}>
									<RadioButton
										label={option.label}
										style={{
											marginTop: 10,
											borderBottomWidth: 1,
											borderBottomColor: appColors.dimGrey,
											paddingBottom: 20
										}}
										checked={selectedGrade && selectedGrade == option.value}
										onChange={() => (
											setSelectedGrade(option.value), onSelect(option.value, option.label)
										)}
									/>
								</Fragment>
							);
						})}
				</View>
			</View>
		</Modal> */}
			<View style={styles.imageContainer}>
				<View>
					<Image
						style={styles.profileImg}
						source={
							userDetails.avatar ? (
								{ uri: getProfileImage(userDetails.avatar) }
							) : (
								appImages.otherImages.PROFILEPLACEHOLDER
							)
						}
					/>
					<View style={styles.camerafab}>{getIcon('ion', 'camera', null, 25, 'white')}</View>
				</View>
				<View>
					<TouchableOpacity
						onPress={() => props.navigation.navigate('EditProfile')}
						style={{ flexDirection: 'row', marginRight: 40 }}
					>
						{getIcon('mi', 'mode-edit', null, 25)}
						<Text style={{ marginLeft: 10, fontSize: 16, fontWeight: '400' }}>Edit Profile</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.changePswdBtn}
						onPress={() => props.navigation.navigate('ChangePassword')}
					>
						<Text style={{ fontSize: 14, color: 'white', fontWeight: '500' }}>Change password</Text>
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView contentContainerStyle={{ flex: 0, height: undefined }}>
				<View style={{ ...styles.detailsContainer }}>
					<Text style={styles.detailTitle}>Student Name</Text>
					<Text style={styles.detailValue}>{userDetails.name || '-'}</Text>
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.detailTitle}>E-mail address</Text>
					<Text style={styles.detailValue}>{userDetails.email || '-'}</Text>
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.detailTitle}>Phone Number</Text>
					<Text style={styles.detailValue}>{userDetails.phone || '-'}</Text>
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.detailTitle}>Grade</Text>
					<Text style={styles.detailValue}>{userDetails.grade_detail.title || '-'}</Text>
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.detailTitle}>Date of Birth</Text>
					<Text style={styles.detailValue}>{userDetails.dob || '-'}</Text>
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.detailTitle}>Gender</Text>
					<Text style={styles.detailValue}>{userDetails.gender || '-'}</Text>
				</View>
			</ScrollView>
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
