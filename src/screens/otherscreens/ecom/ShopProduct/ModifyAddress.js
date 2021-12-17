import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {ActivityIndicator, TextInput} from 'react-native';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import Snackbar from 'react-native-snackbar';
import appColors from '../../../../utils/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FullSizeBtn from '../../../../components/FullSizeBtn';
import {formErrorValue} from '../../../../utils/commonfunctions/validations';

const initialValidationErrors = {
  fname: false,
  mobile: false,
  addressLine2: false,
  addressLine1: false,
  state: false,
  city: false,
  pincode: false,
};
// setActiveScreen("Delivery")
const ModifyAddress = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);

  const data = props.addressDet;
  useImperativeHandle(ref, () => ({
    handleAddressSubmit() {
      handleSubmit();
    },
  }));
  const [validationError, setValidationError] = useState({
    ...initialValidationErrors,
  });
  const [resState, setresState] = useState(data ? data.addressType : 'Home');
  const [fName, setfName] = useState(data ? data.firstName : null);
  const [lName, setlName] = useState(data ? data.lastName : null);
  const [mobile, setMobile] = useState(data ? data.mobile : null);
  const [pincode, setPincode] = useState(data ? data.pinCode : null);
  const [addressLine1, setAddressLine1] = useState(
    data ? data.addressLine1 : null,
  );
  const [addressLine2, setAddressLine2] = useState(
    data ? data.addressLine2 : null,
  );
  const [city, setCity] = useState(data ? data.city : null);
  const [state, setState] = useState(data ? data.state : null);

  const handleSubmit = async () => {
    let wholeData = validateFields();
    if (wholeData) {
      setLoading(true);
      const addList = await AsyncStorage.getItem('addressList');
      let newArray = [];
      if (addList) {
        newArray = [...JSON.parse(addList)];
        newArray.push(wholeData);
        await AsyncStorage.setItem('addressList', JSON.stringify(newArray));
        setTimeout(() => {
          props.toggleScreen();
          props.setLoading(false);
          setLoading(false);
        }, 500);
      } else {
        newArray = [wholeData];
        await AsyncStorage.setItem('addressList', JSON.stringify(newArray));

        setTimeout(() => {
          props.toggleScreen();
          props.setLoading(false);
          setLoading(false);
        }, 500);
      }
    }

    // const user = JSON.parse(await AsyncStorage.getItem(''));
    // wholeData.user = {
    //   id: user.id,
    // };
    // if (data) {
    //   wholeData.id = data.id;
    // }
    // if (wholeData != undefined) {
    //   props.setLoading(true);
    //   console.log(wholeData);

    //   const response = data
    //     ? await ecommerce.updateAddress(wholeData)
    //     : await ecommerce.modifyAddress(wholeData);

    //   if (response.errorCode == 200) {
    //     Snackbar.show({
    //       text: `Address ${data ? 'updated' : 'registered'} successfully`,
    //       duration: Snackbar.LENGTH_SHORT,
    //       backgroundColor: appColors.primaryColor,
    //     });
    //     await ecommerce.getUserAddressList(user.id);
    //     setTimeout(() => {
    //       props.toggleScreen();
    //       props.setLoading(false);
    //     }, 500);
    //   }
    // }
  };

  const validateFields = () => {
    let data = {};
    let error = validationError;
    let mobreg = /^[0-9]{10}$/;

    if (_.isEmpty(fName)) {
      error.fname = 'Please enter name';
      data = {};
    } else {
      data.firstName = fName;
      data.lastName = lName;
    }
    if (_.isEmpty(mobile)) {
      error.mobile = 'Please enter mobile number';
      data = {};
    } else if (!mobreg.test(mobile)) {
      error.mobile = 'Please enter valid mobile number';
      data = {};
    } else {
      data.mobile = mobile;
    }
    if (_.isEmpty(pincode)) {
      error.pincode = 'Please enter pincode';
      data = {};
    } else if (pincode.length != 6) {
      error.pincode = 'Please enter valid pincode';
      data = {};
    } else {
      data.pinCode = pincode;
    }

    if (_.isEmpty(addressLine1)) {
      error.addressLine1 = 'Please enter address line1';
      data = {};
    } else {
      data.addressLine1 = addressLine1;
    }
    if (_.isEmpty(addressLine2)) {
      error.addressLine2 = 'Please enter addressLine2';
      data = {};
    } else {
      data.addressLine2 = addressLine2;
    }

    if (_.isEmpty(state)) {
      error.state = 'Please choose state';
      data = {};
    } else {
      data.state = state;
    }
    if (_.isEmpty(city)) {
      error.city = 'Please choose city';
      data = {};
    } else {
      data.city = city;
    }
    data.addressType = resState;

    console.log({...validationError, ...error});
    setValidationError({...validationError, ...error});
    if (Object.values(validationError).every(v => v === false)) {
      return data;
    } else {
      return undefined;
    }
  };

  return (
    <View>
      <View
        style={{
          marginRight: 20,
          marginVertical: 10,
          marginLeft: 15,
          padding: 10,
          marginBottom: 10,
        }}>
        <Text style={{fontWeight: 'bold'}}>Contact Details</Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInput
            value={fName}
            placeholder={'First Name'}
            style={{
              width: '45%',
              borderBottomWidth: 1,
              borderBottomColor: '#9e9e9e',
            }}
            onChangeText={text => {
              setfName(text);
              setValidationError({
                ...validationError,
                fname: _.isEmpty(text) ? 'Please enter name' : false,
              });
            }}
          />

          <View style={{width: '5%'}} />
          <TextInput
            value={lName}
            placeholder={'Last Name'}
            style={{
              width: '45%',
              borderBottomWidth: 1,
              borderBottomColor: '#9e9e9e',
              right: '5%',
            }}
            onChangeText={text => {
              setlName(text);
            }}
          />
        </View>
        {validationError.fname && (
          <Text style={{color: 'red'}}>{validationError.fname}</Text>
        )}
        <TextInput
          keyboardType={'number-pad'}
          value={mobile}
          placeholder={'Mobile Number'}
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#9e9e9e',
          }}
          onChangeText={text => {
            let reg = /^[0-9]{10}$/;
            setMobile(text);
            setValidationError({
              ...validationError,
              mobile: _.isEmpty(text) ? 'Please enter mobile number' : false,
            });
            if (reg.test(text) === false) {
              setValidationError({
                ...validationError,
                mobile: 'Please enter valid mobile number',
              });
            } else {
              setValidationError({
                ...validationError,
                mobile: false,
              });
            }
          }}
        />
        {validationError.mobile && (
          <Text style={{color: 'red'}}>{validationError.mobile}</Text>
        )}
        <Text style={{fontWeight: 'bold', marginVertical: 20}}>Address</Text>

        <TextInput
          value={addressLine1}
          placeholder={'Address Line1'}
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#9e9e9e',
          }}
          onChangeText={text => {
            setAddressLine1(text);
            setValidationError({
              ...validationError,
              addressLine1: _.isEmpty(text)
                ? 'Please enter address line1'
                : false,
            });
          }}
        />

        {validationError.addressLine1 &&
          formErrorValue(validationError.addressLine1, {marginLeft: 0})}
        <TextInput
          value={addressLine2}
          placeholder={'Address Line2'}
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#9e9e9e',
          }}
          onChangeText={text => {
            setAddressLine2(text);
            setValidationError({
              ...validationError,
              addressLine2: _.isEmpty(text)
                ? 'Please enter addressLine2'
                : false,
            });
          }}
        />
        {validationError.addressLine2 &&
          formErrorValue(validationError.addressLine2, {marginLeft: 0})}

        <TextInput
          value={city}
          placeholder={'City'}
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#9e9e9e',
          }}
          onChangeText={text => {
            setCity(text);
            setValidationError({
              ...validationError,
              city: _.isEmpty(text) ? 'Please enter city' : false,
            });
          }}
        />
        {validationError.city &&
          formErrorValue(validationError.city, {marginLeft: 0})}
        <TextInput
          value={state}
          placeholder={'State'}
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#9e9e9e',
          }}
          onChangeText={text => {
            setState(text);
            setValidationError({
              ...validationError,
              state: _.isEmpty(text) ? 'Please enter state' : false,
            });
          }}
        />
        {validationError.state &&
          formErrorValue(validationError.state, {marginLeft: 0})}
        <TextInput
          keyboardType={'number-pad'}
          value={pincode}
          maxLength={6}
          placeholder={'Pincode'}
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#9e9e9e',
          }}
          onChangeText={text => {
            setPincode(text);
            setValidationError({
              ...validationError,
              pincode: _.isEmpty(text) ? 'Please enter pincode' : false,
            });
          }}
        />
        {validationError.pincode &&
          formErrorValue(validationError.pincode, {marginLeft: 0})}

        <Text style={{fontWeight: 'bold', marginVertical: 20}}>Save as</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => setresState('Home')}
            style={{
              width: '30%',
              height: 30,
              borderRadius: 5,
              backgroundColor:
                resState == 'Home' ? appColors.primaryColor : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderWidth: resState == 'Home' ? 0 : 0.5,
            }}>
            <FIcon
              name={'home'}
              color={resState == 'Home' ? 'white' : '#9e9e9e'}
              size={20}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: resState == 'Home' ? 'white' : '#9e9e9e',
              }}>
              &nbsp;&nbsp;Home
            </Text>
          </TouchableOpacity>
          <View style={{width: '10%'}} />
          <TouchableOpacity
            onPress={() => setresState('Work')}
            style={{
              width: '30%',
              height: 30,
              borderRadius: 5,
              backgroundColor:
                resState == 'Work' ? appColors.primaryColor : 'transparent',
              borderWidth: resState == 'Work' ? 0 : 0.5,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <FIcon
              name={'briefcase'}
              size={20}
              color={resState == 'Work' ? 'white' : '#9e9e9e'}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                color: resState == 'Work' ? 'white' : '#9e9e9e',
              }}>
              &nbsp;&nbsp;Work
            </Text>
          </TouchableOpacity>
        </View>
        <FullSizeBtn
          onPress={handleSubmit}
          btnColor={appColors.simpleBlue}
          btnTitle={
            loading ? (
              <ActivityIndicator size={'small'} color={appColors.white} />
            ) : (
              'Save Address'
            )
          }
          style={{marginTop: 35}}
        />
      </View>
    </View>
  );
});

export default ModifyAddress;
