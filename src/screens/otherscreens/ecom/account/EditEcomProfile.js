import React, {Component, useState} from 'react';

import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import FullSizeBtn from '../../../../components/FullSizeBtn';
import CustomInput from '../../../../components/textinput/CustomInput';
import DropDownInput from '../../../../components/textinput/DropDownInput';
import basicStyles from '../../../../styles/basicStyles';
import moment from 'moment';
import store from '../../../../redux/store';
import {
  formErrorValue,
  getTrimValueLength,
} from '../../../../utils/commonfunctions/validations';
import {
  getUserData,
  getUserDetails,
  updateProfile,
} from '../../../../redux/root.actions';
import Snackbar from 'react-native-snackbar';
import {
  emailRegEx,
  numberRegEx,
  USER_DETAILS,
} from '../../../../utils/constants';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appColors from '../../../../utils/appColors';
const EditEcomProfile = props => {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    city: undefined,
    pincode: '',
  });
  //updateProfile form validationErrors

  const [validationErrors, setValidationErrors] = useState({
    name: false,
    email: false,
    phone: false,
    city: false,
    pincode: false,
  });
  const handleUpdate = () => {
    const formData = validateFields();

    console.log(formData, 'FormData;::::::::::');
    if (formData) {
      // setLoading(true);
      // props.updateProfile(
      // 	formData,
      // 	(res) => {
      // 		props.getUserData(
      // 			null,
      // 			(res) => {
      // 				const response = res.data;
      // 				if (response) {
      // 					console.log(response);
      // 					AsyncStorage.setItem(USER_DETAILS, JSON.stringify(response));
      // 					store.dispatch(getUserDetails(response));
      // 					+props.navigation.navigate('Profile');
      // 				}
      // 			},
      // 			false
      // 		);
      // 	},
      // 	true
      // );
    } else {
      Snackbar.show({
        text: 'Please check the details provided!',
        backgroundColor: 'red',
        length: Snackbar.LENGTH_SHORT,
      });
    }
  };
  const validateFields = () => {
    let formData = new FormData();
    let errors = {...validationErrors};
    if (_.isEmpty(details.phone)) {
      errors.phone = 'Enter phone number';
      formData = undefined;
    } else if (!_.isEmpty(details.phone) && !numberRegEx.test(details.phone)) {
      errors.phone = 'Enter valid phone number';
      formData = undefined;
    } else {
      formData && formData.append('phone', details.phone);
    }
    if (_.isEmpty(details.email)) {
      errors.email = 'Enter email';
      formData = undefined;
    } else if (!_.isEmpty(details.email) && !emailRegEx.test(details.email)) {
      errors.email = 'Enter valid email';
      formData = undefined;
    } else {
      formData && formData.append('email', details.email);
    }
    if (_.isEmpty(details.name)) {
      errors.name = 'Enter name';
      formData = undefined;
    } else if (
      !_.isEmpty(details.name) &&
      getTrimValueLength(details.name) < 3
    ) {
      errors.name = 'Enter valid name';
      formData = undefined;
    } else {
      formData && formData.append('name', details.name);
    }

    if (!_.isNumber(selectedGrade)) {
      errors.grade = 'Select grade';
      formData = undefined;
    } else {
      formData && formData.append('grade', selectedGrade);
    }

    dateSelected && formData && formData.append('dob', selectedGrade);

    setValidationErrors(errors);
    return formData;
  };
  return (
    <ScrollView
      contentContainerStyle={{
        ...basicStyles.container,
        flex: 0,

        height: undefined,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomInput
          initialValue={details.name}
          onChange={text => (
            setValidationErrors({...validationErrors, name: false}),
            setDetails({...details, name: text})
          )}
          helperText={
            getTrimValueLength(details.name) == 0 && 'Enter your name'
          }
          placeHolder="Name"
        />
        {validationErrors.name && formErrorValue(validationErrors.name)}
        <CustomInput
          initialValue={details.email}
          onChange={text => (
            setValidationErrors({...validationErrors, email: false}),
            setDetails({...details, email: text})
          )}
          helperText={
            getTrimValueLength(details.email) == 0 &&
            'Enter your active e-mail address'
          }
          placeHolder="E-mail Address"
        />
        {validationErrors.email && formErrorValue(validationErrors.email)}

        <CustomInput
          otherInputProps={{maxLength: 10}}
          initialValue={details.phone}
          onChange={text => (
            setValidationErrors({...validationErrors, phone: false}),
            setDetails({...details, phone: text})
          )}
          helperText={
            getTrimValueLength(details.phone) == 0 &&
            'Enter your active phone number'
          }
          placeHolder="Phone number"
        />
        {validationErrors.phone && formErrorValue(validationErrors.phone)}
      </View>
      <TouchableOpacity
        // onPress={
        //     () => setGradePopup(true)}
        style={{alignSelf: 'center', width: '100%'}}>
        <DropDownInput
          // placeHolder={details.grade ? selectedGradeLabel : 'City'}
          placeHolder={'Select City'}
          inputProps={{editable: false}}
        />
      </TouchableOpacity>
      <CustomInput
        // onChange={(text) => ( // initialValue={details.name}
        // 	setValidationErrors({ ...validationErrors, name: false }), setDetails({ ...details, name: text })
        // )}
        // helperText="Enter your pincode"
        placeHolder="Pincode"
      />
      <FullSizeBtn
        onPress={() => {
          Snackbar.show({
            text: 'Profile updated successfully',
            backgroundColor: appColors.lightGreen,
            textColor: appColors.white,
          });
          props.navigation.navigate('AccountDetails');
        }}
        btnColor={appColors.simpleBlue}
        btnTitle={'Update Profile'}
        style={{marginTop: 20}}
      />
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(null, mapDispatchToProps)(EditEcomProfile);
