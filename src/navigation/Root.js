import React, { Fragment, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/authScreens/SplashScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';
import Home from '../screens/otherscreens/Home';
import appColors from '../utils/appColors';
import getIcon from '../utils/commonfunctions/getIcon';
import MyCourses from '../screens/otherscreens/MyCourses';
import TimeTable from '../screens/otherscreens/TimeTable.';
import PaymentHistory from '../screens/otherscreens/PaymentHistory';
import CategoryList from '../screens/otherscreens/category/CategoryList';
import FavouriteList from '../screens/otherscreens/favourite/FavouriteList';
import Wallet from '../screens/otherscreens/wallet/Wallet';
import Profile from '../screens/otherscreens/profile/Profile';
import SideMenu from './SideMenu';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import basicStyles from '../styles/basicStyles';
import RegisterScreen from '../screens/authScreens/RegisterScreen';
import ForgotOrChangePassword from '../screens/authScreens/ForgotOrChangePassword';
import EditProfile from '../screens/otherscreens/profile/EditProfile';
import Notifications from '../screens/otherscreens/Notifications';
import CourseView from '../screens/otherscreens/CourseView';
import OneToOne from '../screens/otherscreens/category/onetoone/OneToOne';
import PreRecorded from '../screens/otherscreens/category/prerecorded/PreRecorded';
import GroupClass from '../screens/otherscreens/category/group/GroupClass';
import OneToOneSubList from '../screens/otherscreens/category/onetoone/OneToOneSubList';
import OneToOneView from '../screens/otherscreens/category/onetoone/OneToOneView';
import PreRecordedSubList from '../screens/otherscreens/category/prerecorded/PreRecordedSubList';
import PreRecordedView from '../screens/otherscreens/category/prerecorded/PreRecordedView';
import GroupSubList from '../screens/otherscreens/category/group/GroupSubList';
import TopicView from '../screens/otherscreens/TopicView';
import RoleSelectionScreen from '../screens/authScreens/RoleSelectionScreen';
import Dashboard from '../screens/otherscreens/ecom/Dashboard';
const Stack = createStackNavigator();

const RootNavigation = (props) => {
	const [ isModalVisible, setisModalVisible ] = useState(false);
	const [ logoutPopUp, setLogoutPopUp ] = useState(false);

	const toggleSideMenu = () => {
		setisModalVisible(!isModalVisible);
	};

	const navigation = useNavigation();
	const LogoutPopUp = () => {
		return (
			<Modal
				onRequestClose={() => setLogoutPopUp(false)}
				style={{ alignItems: 'center', justifyContent: 'center' }}
				visible={logoutPopUp}
				transparent
			>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '30%' }}>
					<View style={{ backgroundColor: appColors.white, width: '90%', padding: 15 }}>
						<Text style={{ fontSize: 21, fontWeight: '400', color: appColors.smokyBlack }}>Log out</Text>
						<Text style={{ fontSize: 17, fontWeight: '400', marginTop: 15 }}>
							Are you sure want to LogOut this application ?
						</Text>
						<Text
							style={{
								color: appColors.primaryColor,
								textTransform: 'uppercase',
								fontSize: 17,
								marginLeft: '60%'
							}}
						>
							<Text onPress={() => setLogoutPopUp(false)} style={{ width: '30%' }}>
								NO
							</Text>
							<Text onPress={() => (setLogoutPopUp(false), navigation.navigate('LoginScreen'))}>
								&nbsp; &nbsp; &nbsp; &nbsp;Yes
							</Text>
						</Text>
					</View>
				</View>
			</Modal>
		);
	};

	const ModalDrawer = () => {
		return (
			<Modal
				isVisible={isModalVisible}
				onBackdropPress={toggleSideMenu}
				onBackButtonPress={toggleSideMenu}
				onSwipeComplete={toggleSideMenu}
				animationIn="slideInLeft"
				animationOut="slideOutLeft"
				swipeDirection="left"
				useNativeDriver
				hideModalContentWhileAnimating
				propagateSwipe
				style={basicStyles.sideMenuStyle}
			>
				<SideMenu
					callParentScreenFunction={() => setisModalVisible(false)}
					logoutFn={() => setLogoutPopUp(true)}
				/>
			</Modal>
		);
	};
	const HeaderLeft = ({ back }) => {
		return (
			<TouchableOpacity
				style={{ padding: 15 }}
				onPress={() => {
					back ? navigation.goBack() : setisModalVisible(true);
				}}
			>
				{getIcon('ion', back ? 'arrow-back' : 'menu', { color: 'white' }, 30)}
			</TouchableOpacity>
		);
	};

	//ECOMMERCE HEADER
	const HeaderLeftEcom = ({ back }) => {
		return (
			<TouchableOpacity
				style={{ padding: 15, flexDirection: 'row' }}
				onPress={() => {
					back ? navigation.goBack() : setisModalVisible(true);
				}}
			>
				{getIcon('ion', back ? 'arrow-back' : 'menu', { color: 'white' }, 30)}
			</TouchableOpacity>
		);
	};
	const HeaderRight = ({ wishList }) => {
		return (
			<TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ padding: 15 }}>
				{getIcon('ion', wishList ? 'heart-outline' : 'notifications', { color: 'white' }, 25)}
			</TouchableOpacity>
		);
	};
	return (
		<Fragment>
			<Stack.Navigator initialRouteName="SplashScreen">
				<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
				<Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
				<Stack.Screen
					name="RoleSelectionScreen"
					component={RoleSelectionScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="RegisterScreen"
					component={RegisterScreen}
					options={{
						headerShown: true,
						headerTitle: 'Registration',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },

						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="ForgotPassword"
					component={ForgotOrChangePassword}
					options={{
						headerShown: true,
						headerTitle: 'Forgot Password',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="ChangePassword"
					component={ForgotOrChangePassword}
					initialParams={{ from: 'changePassword' }}
					options={{
						headerShown: true,
						headerTitle: 'Change Password',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },

						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{
						headerShown: true,
						headerTitle: 'E-Learning D-Jeli',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft />,
						headerRight: () => <HeaderRight />
					}}
				/>
				<Stack.Screen
					name="MyCourses"
					component={MyCourses}
					options={{
						headerShown: true,
						headerTitle: 'My Courses',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="TimeTable"
					component={TimeTable}
					options={{
						headerShown: true,
						headerTitle: 'Time Table',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="PaymentHistory"
					component={PaymentHistory}
					options={{
						headerShown: true,
						headerTitle: 'Payment History',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="CategoryList"
					component={CategoryList}
					options={{
						headerShown: true,
						headerTitle: 'CategoryList',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="OneToOne"
					component={OneToOne}
					options={{
						headerShown: true,
						headerTitle: '1 to 1 Class',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>

				<Stack.Screen
					name="OneToOneSubList"
					component={OneToOneSubList}
					options={{
						headerShown: true,
						headerTitle: 'Form 6 Science',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="OneToOneView"
					component={OneToOneView}
					options={{
						headerShown: true,
						headerTitle: '1 to 1 Class',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>

				<Stack.Screen
					name="PreRecorded"
					component={PreRecorded}
					options={{
						headerShown: true,
						headerTitle: 'Pre recorded Classe',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="PreRecordedSubList"
					component={PreRecordedSubList}
					options={{
						headerShown: true,
						headerTitle: 'Pre Recorded Class',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="PreRecordedView"
					component={PreRecordedView}
					options={{
						headerShown: true,
						headerTitle: 'Pre recorded Class',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="GroupClass"
					component={GroupClass}
					options={{
						headerShown: true,
						headerTitle: 'Group Class',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="GroupSubList"
					component={GroupSubList}
					options={{
						headerShown: true,
						headerTitle: 'Group Class',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="FavouriteList"
					component={FavouriteList}
					options={{
						headerShown: true,
						headerTitle: 'My favourite',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft />,
						headerRight: () => <HeaderRight />
					}}
				/>
				<Stack.Screen
					name="Wallet"
					component={Wallet}
					options={{
						headerShown: true,
						headerTitle: 'Wallet',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft />,
						headerRight: () => <HeaderRight />
					}}
				/>
				<Stack.Screen
					name="Profile"
					component={Profile}
					options={{
						headerShown: true,
						headerTitle: 'Profile',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft />,
						headerRight: () => <HeaderRight />
					}}
				/>
				<Stack.Screen
					name="EditProfile"
					component={EditProfile}
					options={{
						headerShown: true,
						headerTitle: 'Edit Profile',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="Notifications"
					component={Notifications}
					options={{
						headerShown: true,
						headerTitle: 'Notifications',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="CourseView"
					component={CourseView}
					options={{
						headerShown: true,
						headerTitle: '',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerRight: () => <HeaderRight wishList />,
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				<Stack.Screen
					name="TopicView"
					component={TopicView}
					options={{
						headerShown: true,
						headerTitle: 'Sub Topic',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeft back />
					}}
				/>
				{/* //ECOMMERCE SCREENS */}
				<Stack.Screen
					name="Dashboard"
					component={Dashboard}
					options={{
						headerShown: true,
						headerTitle: 'Eat for your taste',
						headerTitleStyle: { color: appColors.white },
						headerStyle: { backgroundColor: appColors.primaryColor },
						headerLeft: () => <HeaderLeftEcom />,
						headerRight: () => <HeaderRight />
					}}
				/>
			</Stack.Navigator>
			{isModalVisible && <ModalDrawer />}
			{logoutPopUp && <LogoutPopUp />}
		</Fragment>
	);
};

export default RootNavigation;
