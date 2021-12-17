import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Image} from 'react-native';
import {connect} from 'react-redux';
import appImages from '../../assets';
import {
  getCartCount,
  getGrades,
  getNotificationCount,
  getSelectedAddressLocation,
  getUserDetails,
  storeCategoryDetails,
  storeGradeDetails,
  storeRoleDetails,
} from '../../redux/root.actions';
import store from '../../redux/store';
import basicStyles from '../../styles/basicStyles';
import {
  ADDRESS_SELECTED,
  CART_COUNT,
  CATEGORYLIST,
  GRADELIST,
  NOTIFICATION_COUNT,
  ROLESELECTED,
  TOKEN,
  USER_DETAILS,
} from '../../utils/constants';

export const SplashScreen = props => {
  React.useEffect(() => {
    let isActive = true;
    setTimeout(() => {
      changeScreen();
    }, 1000);
    return () => {
      isActive = false;
    };
  }, []);
  const changeScreen = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    const selectedRole = await AsyncStorage.getItem(ROLESELECTED);
    const gradeList = await AsyncStorage.getItem(GRADELIST);
    const categoryList = await AsyncStorage.getItem(CATEGORYLIST);
    const userDetails = await AsyncStorage.getItem(USER_DETAILS);
    const notificationCount = await AsyncStorage.getItem(NOTIFICATION_COUNT);
    const cartCount = await AsyncStorage.getItem(CART_COUNT);

    selectedRole && store.dispatch(storeRoleDetails(selectedRole));
    gradeList && store.dispatch(storeGradeDetails(JSON.parse(gradeList)));
    categoryList &&
      store.dispatch(storeCategoryDetails(JSON.parse(categoryList)));
    userDetails && store.dispatch(getUserDetails(JSON.parse(userDetails)));
    // props.navigation.navigate('RoleSelectionScreen');
    const addressSelected = await AsyncStorage.getItem(ADDRESS_SELECTED);
    addressSelected &&
      store.dispatch(getSelectedAddressLocation(JSON.parse(addressSelected)));
    console.log(selectedRole, selectedRole == 'lms', 'selectedRole');
    notificationCount &&
      store.dispatch(getNotificationCount(JSON.parse(notificationCount)));
    !notificationCount && store.dispatch(getNotificationCount(0));
    cartCount && store.dispatch(getCartCount(JSON.parse(cartCount)));
    !cartCount && store.dispatch(getCartCount(0));
    if (!cartCount) {
      await AsyncStorage.setItem(CART_COUNT, JSON.stringify(0));
    }
    if (!token || !selectedRole) {
      props.navigation.navigate('RoleSelectionScreen');
    } else if (token) {
      if (selectedRole == 'lms') {
        props.navigation.navigate('Home');
      } else {
        props.navigation.navigate('Dashboard');
      }
    }
  };
  return (
    <View
      style={{
        ...basicStyles.container,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{width: 200, height: 200}}
        source={appImages.appImages.LOGO1}
      />
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getGrades: (requestData, onResponse, showSnackBar) => {
      dispatch(getGrades(requestData, onResponse, showSnackBar));
    },
  };
};

export default connect(null, mapDispatchToProps)(SplashScreen);
