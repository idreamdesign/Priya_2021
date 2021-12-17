import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
<<<<<<< HEAD
import { View, Image, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import {
	getCategories,
	getGrades,
	storeCategoryDetails,
	storeGradeDetails,
	storeRoleDetails
=======
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import appImages from '../../assets';
import {
  getCategories,
  getGrades,
  storeCategoryDetails,
  storeGradeDetails,
  storeRoleDetails,
>>>>>>> master
} from '../../redux/root.actions';
import store from '../../redux/store';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/roleSelectioStyles';
<<<<<<< HEAD
import { CATEGORYLIST, GRADELIST, ROLESELECTED } from '../../utils/constants';

export const RoleSelectionScreen = (props) => {
	React.useEffect(() => {
		let isActive = true;
		isActive && storeGrades();
		return () => {
			isActive = false;
		};
	}, []);
	const storeGrades = async () => {
		props.getGrades(
			null,
			async (res) => {
				let gradeResponse = res.data;
				gradeResponse.forEach((element) => ((element.label = element.title), (element.value = element.id)));
				store.dispatch(storeGradeDetails(gradeResponse));
				await AsyncStorage.setItem(GRADELIST, JSON.stringify(gradeResponse));
			},
			false
		);
		props.getCategories(
			null,
			async (res) => {
				let categoryResponse = res.data;
				categoryResponse.forEach((element) => ((element.label = element.title), (element.value = element.id)));
				store.dispatch(storeCategoryDetails(categoryResponse));
				await AsyncStorage.setItem(CATEGORYLIST, JSON.stringify(categoryResponse));
			},
			false
		);
	};
	return (
		<View style={{ ...basicStyles.container, alignItems: 'center', justifyContent: 'center' }}>
			<Image source={appImages.appImages.LOGO1} style={styles.logoStyles} />
			<View style={styles.selectionContainer}>
				<View style={styles.roleCard}>
					<Image source={appImages.appImages.LMS} style={styles.roleImg} />
					<TouchableOpacity
						onPress={async () => {
							await AsyncStorage.setItem(ROLESELECTED, 'lms');
							store.dispatch(storeRoleDetails('lms'));
							props.navigation.navigate('LoginScreen', { from: 'lms' });
						}}
						style={styles.roleNameContainer}
					>
						<Text style={styles.roleName}>LMS</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.roleCard}>
					<Image source={appImages.appImages.ECOM} style={styles.roleImg} />
					<TouchableOpacity
						onPress={async () => {
							await AsyncStorage.setItem(ROLESELECTED, 'ecom');
							store.dispatch(storeRoleDetails('ecom'));
							props.navigation.navigate('LoginScreen', { from: 'ecom' });
						}}
						style={styles.roleNameContainer}
					>
						<Text style={styles.roleName}>ECOMMERCE</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGrades: (requestData, onResponse, showSnackBar) => {
			dispatch(getGrades(requestData, onResponse, showSnackBar));
		},
		getCategories: (requestData, onResponse, showSnackBar) => {
			dispatch(getCategories(requestData, onResponse, showSnackBar));
		}
	};
=======
import appColors from '../../utils/appColors';
import {CATEGORYLIST, GRADELIST, ROLESELECTED} from '../../utils/constants';

export const RoleSelectionScreen = props => {
  React.useEffect(() => {
    let isActive = true;
    isActive && storeGrades();
    return () => {
      isActive = false;
    };
  }, []);
  const storeGrades = async () => {
    props.getGrades(
      null,
      async res => {
        let gradeResponse = res.data;
        gradeResponse.forEach(
          element => (
            (element.label = element.title), (element.value = element.id)
          ),
        );
        store.dispatch(storeGradeDetails(gradeResponse));
        await AsyncStorage.setItem(GRADELIST, JSON.stringify(gradeResponse));
      },
      false,
    );
    props.getCategories(
      null,
      async res => {
        let categoryResponse = res.data;
        categoryResponse.forEach(
          element => (
            (element.label = element.title), (element.value = element.id)
          ),
        );
        store.dispatch(storeCategoryDetails(categoryResponse));
        await AsyncStorage.setItem(
          CATEGORYLIST,
          JSON.stringify(categoryResponse),
        );
      },
      false,
    );
  };
  return (
    <View
      style={{
        ...basicStyles.container,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: appColors.palePurple,
      }}>
      <Image source={appImages.appImages.LOGO1} style={styles.logoStyles} />
      <View style={styles.selectionContainer}>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.setItem(ROLESELECTED, 'lms');
            store.dispatch(storeRoleDetails('lms'));
            props.navigation.navigate('LoginScreen', {from: 'lms'});
          }}
          style={{...styles.roleCard, backgroundColor: appColors.lmsRoleCard}}>
          <View style={styles.roleNameContainer}>
            <Text style={styles.roleName}>LMS</Text>
            <Text style={styles.roleDesc}>Online Educaton</Text>
          </View>
          <Image source={appImages.appImages.LMS} style={styles.roleImg} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.setItem(ROLESELECTED, 'ecom');
            store.dispatch(storeRoleDetails('ecom'));
            props.navigation.navigate('LoginScreen', {from: 'ecom'});
          }}
          style={{
            ...styles.roleCard,
            marginTop: 20,
            backgroundColor: appColors.ecomRoleCard,
          }}>
          <Image source={appImages.appImages.ECOM} style={styles.roleImg} />
          <View
            style={{
              ...styles.roleNameContainer,
              paddingLeft: 0,
              paddingRight: 15,
              alignItems: 'flex-end',
            }}>
            <Text style={{...styles.roleName, color: appColors.smokyBlack}}>
              Ecommerce
            </Text>
            <Text style={{...styles.roleDesc, color: appColors.smokyBlack}}>
              Online Shopping
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getGrades: (requestData, onResponse, showSnackBar) => {
      dispatch(getGrades(requestData, onResponse, showSnackBar));
    },
    getCategories: (requestData, onResponse, showSnackBar) => {
      dispatch(getCategories(requestData, onResponse, showSnackBar));
    },
  };
>>>>>>> master
};

export default connect(null, mapDispatchToProps)(RoleSelectionScreen);
