import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/bottomNavStyles';
import appColors from '../utils/appColors';
import getIcon from '../utils/commonfunctions/getIcon';
import { useNavigation } from '@react-navigation/native';

const BottomNavbar = ({ currentRoute }) => {
	const navigation = useNavigation();
	const menu = [
		{ menuName: 'Home', navName: 'Home', menuIcon: 'ios-home-sharp' },
		{ menuName: 'Favourite', navName: 'FavouriteList', menuIcon: 'ios-heart' },
		{ menuName: 'Payments', navName: 'PaymentHistory', menuIcon: 'ios-wallet' },
		{ menuName: 'Profile', navName: 'Profile', menuIcon: 'person-circle-sharp' }
	];
	return (
		<View style={styles.bottomNavContainer}>
			{menu.map((item, i) => {
				return (
					<TouchableOpacity
						onPress={() => navigation.navigate(item.navName)}
						key={i}
						style={styles.singleMenuStyle}
					>
						{getIcon(
							'ion',
							item.menuIcon,
							null,
							20,
							currentRoute && item.navName == currentRoute ? appColors.primaryColor : appColors.grey
						)}
						<Text style={currentRoute && item.navName == currentRoute && { color: appColors.primaryColor }}>
							{item.menuName}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default BottomNavbar;
