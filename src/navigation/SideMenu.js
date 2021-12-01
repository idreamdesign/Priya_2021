import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import * as RootNavigation from '../utils/RootNavigation';
// import AsyncStorage from '@react-native-community/async-storage';
import Store from '../redux/store';
import { CommonActions } from '@react-navigation/native';
import basicStyles from '../styles/basicStyles';
import appImages from '../assets';
import getIcon from '../utils/commonfunctions/getIcon';
import appColors from '../utils/appColors';
import store from '../redux/store';
import getProfileImage from '../utils/commonfunctions/getPictures';

const SideMenu = (props) => {
	const userDetails = store.getState().auth.userDetails;
	console.log(userDetails);
	const [ details, setDetails ] = useState({});

	useEffect(() => {
		// memberDetails();
	}, []);

	//   const memberDetails = async () => {
	//     const userDetails = JSON.parse(await AsyncStorage.getItem(DECODE));
	//     setDetails(userDetails);
	//   };
	return (
		<ScrollView style={basicStyles.safeAreaView}>
			<View style={basicStyles.bgprofile}>
				<TouchableOpacity
					onPress={() => {
						props.callParentScreenFunction();

						RootNavigation.navigate('Profile');
					}}
				>
					<View style={basicStyles.centeralign}>
						<Image
							style={basicStyles.profileImg}
							source={
								userDetails.avatar ? (
									{ uri: getProfileImage(userDetails.avatar) }
								) : (
									appImages.otherImages.PROFILEPLACEHOLDER
								)
							}
						/>
						<View style={basicStyles.details}>
							<Text style={basicStyles.textheader}>{userDetails.name}</Text>
							<Text style={{ ...basicStyles.studentName, maxWidth: '97%' }}>{userDetails.email}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
			<View style={basicStyles.menuContainer}>
				<View style={{ marginBottom: 20 }}>
					<TouchableOpacity
						style={basicStyles.swithBlock}
						onPress={() => {
							props.callParentScreenFunction();
							RootNavigation.navigate('CategoryList');
						}}
					>
						<View style={{ marginRight: 10 }}>
							{getIcon('ion', 'ios-list-outline', null, 30, appColors.grey)}
						</View>
						<Text style={basicStyles.description}> Category </Text>
					</TouchableOpacity>
				</View>
				<View style={{ marginBottom: 20 }}>
					<TouchableOpacity
						style={basicStyles.swithBlock}
						onPress={() => {
							props.callParentScreenFunction();
							RootNavigation.navigate('MyCourses');
						}}
					>
						<View style={{ marginRight: 10 }}>{getIcon('mc', 'teach', null, 30, appColors.grey)}</View>
						<Text style={basicStyles.description}> My Courses </Text>
					</TouchableOpacity>
				</View>
				{/* <View style={{ marginBottom: 20 }}>
					<TouchableOpacity
						style={basicStyles.swithBlock}
						onPress={() => {
							props.callParentScreenFunction();
							RootNavigation.navigate('TimeTable');
						}}
					>
						<View style={{ marginRight: 10 }}>{getIcon('ad', 'table', null, 25, appColors.grey)}</View>
						<Text style={basicStyles.description}> Time Table </Text>
					</TouchableOpacity>
				</View> */}
				<View style={{ marginBottom: 20 }}>
					<TouchableOpacity
						style={basicStyles.swithBlock}
						onPress={() => {
							props.callParentScreenFunction();

							RootNavigation.navigate('PaymentHistory');
						}}
					>
						<View style={{ marginRight: 10 }}>
							{getIcon('mc', 'credit-card-check-outline', null, 30, appColors.grey)}
						</View>
						<Text style={basicStyles.description}> Payment History </Text>
					</TouchableOpacity>
				</View>
				{/* <View style={{ marginBottom: 20 }}>
					<TouchableOpacity
						style={basicStyles.swithBlock}
						onPress={() => {
							props.callParentScreenFunction();
							// RootNavigation.navigate('PaymentHistory');
						}}
					>
						<View style={{ marginRight: 10 }}>
							{getIcon('ion', 'settings-outline', null, 30, appColors.grey)}
						</View>
						<Text style={basicStyles.description}> Settings </Text>
					</TouchableOpacity>
				</View> */}
				<View style={{ marginBottom: 20 }}>
					<TouchableOpacity
						style={basicStyles.swithBlock}
						onPress={() => {
							props.callParentScreenFunction();

							RootNavigation.navigate('Support');
						}}
					>
						<View style={{ marginRight: 10 }}>
							{getIcon('mc', 'message-processing-outline', null, 30, appColors.grey)}
						</View>
						<Text style={basicStyles.description}> Support </Text>
					</TouchableOpacity>
				</View>
				<View style={{ marginBottom: 20 }}>
					<TouchableOpacity
						style={basicStyles.swithBlock}
						onPress={() => {
							props.callParentScreenFunction();
							RootNavigation.navigate('Feedback');
						}}
					>
						<View style={{ marginRight: 10 }}>{getIcon('mi', 'feedback', null, 30, appColors.grey)}</View>
						<Text style={basicStyles.description}> Feedback </Text>
					</TouchableOpacity>
				</View>
				<View style={{ marginBottom: 20 }}>
					<TouchableOpacity
						style={basicStyles.swithBlock}
						onPress={() => {
							props.callParentScreenFunction();
							RootNavigation.navigate('Profile');
						}}
					>
						<View style={{ marginRight: 10 }}>
							{getIcon('ion', 'person-circle-sharp', null, 30, appColors.grey)}
						</View>
						<Text style={basicStyles.description}> Profile </Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					style={basicStyles.swithBlock}
					onPress={() => (props.callParentScreenFunction(), props.logoutFn())}
				>
					<View style={{ marginRight: 10 }}>{getIcon('mi', 'logout', null, 30, appColors.grey)}</View>
					<Text style={basicStyles.description}> Logout </Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default SideMenu;
