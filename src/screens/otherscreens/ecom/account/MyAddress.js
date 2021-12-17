import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/shopStyles';
import homeStyles from '../../../../styles/HomeStyles';

import appColors from '../../../../utils/appColors';
import getIcon from '../../../../utils/commonfunctions/getIcon';
import Location from '../location/Location';
import ModifyAddress from '../ShopProduct/ModifyAddress';
import store from '../../../../redux/store';
import {getSelectedAddressLocation} from '../../../../redux/root.actions';
import {ADDRESS_SELECTED, TOKEN} from '../../../../utils/constants';
import Snackbar from 'react-native-snackbar';

export const MyAddress = props => {
  const myStore = store.getState();
  const selectedAdd = store.getState().app.other.selectedAddress;

  const [addressList, setAddressList] = useState([]);
  const [addInd, setAddInd] = useState(undefined);
  const [activeScreen, setActiveScreen] = useState('Cart');
  const [isEdit, setIsEdit] = useState(false);
  const [addressDet, setAddDet] = useState(false);
  const childRef = useRef();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(
    selectedAdd && selectedAdd.from == 'currentLocation'
      ? selectedAdd.address
      : null,
  );
  const [location, setLocation] = useState(
    selectedAdd && selectedAdd.from == 'currentLocation'
      ? selectedAdd.location
      : null,
  );

  console.log(location, 'locationform storeeeeeeeeeeeeeeeee');

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      getAddress();

      return () => {
        isActive = false;
      };
    }, [address, addInd]),
  );

  const getAddress = async () => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log(!address && !addInd, address, addInd);
            if (!address && addInd == undefined) {
              Snackbar.show({
                text: 'Please choose your delivery location',
                backgroundColor: appColors.red,
                length: Snackbar.LENGTH_SHORT,
              });
            } else {
              Snackbar.show({
                text: 'Location applied successfully!',
                backgroundColor: appColors.darkGreen,
                length: Snackbar.LENGTH_SHORT,
              });
              props.navigation.navigate('Dashboard');
            }
          }}>
          {getIcon(
            'fa',
            'check-circle',
            {marginRight: 10},
            30,
            appColors.white,
          )}
        </TouchableOpacity>
      ),
    });
    const addressLists = await AsyncStorage.getItem('addressList');
    const addressSelected = await AsyncStorage.getItem(ADDRESS_SELECTED);
    if (addressSelected) {
      const selectedAddress = JSON.parse(addressSelected);
      if (selectedAddress.from == 'addressList') {
        setAddInd(selectedAddress.index);
      } else {
        setAddress(selectedAddress.address);
        setLocation(selectedAddress.location);
      }
    }
    console.log(addressLists, 'addressListsaddressLists');
    addressLists && setAddressList(JSON.parse(addressLists));
  };
  const modifyAddress = async addDet => {
    setAddDet(addDet);
    setIsEdit(true);
    setActiveScreen('Modify');
  };
  const saveAddress = async () => {
    const addList = JSON.parse(await AsyncStorage.getItem('addressList'));
    setAddressList(addList);
    setAddInd(undefined);
    setActiveScreen('Delivery');
  };

  React.useEffect(() => {
    let isActive = true;
    console.log('Refresshing', addInd);
    return () => {
      isActive = false;
    };
  }, [addInd, location]);
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 0,
        height: undefined,
        width: undefined,
        backgroundColor: appColors.white,
      }}>
      {activeScreen != 'Modify' && (
        <Location
          addrress={address}
          selectedLocation={location}
          setAddress={async (add, location) => {
            setAddInd(undefined);
            let addressObj = {from: 'currentLocation', address: add, location};
            setAddress(add);
            setLocation(location);
            store.dispatch(getSelectedAddressLocation(addressObj));
            AsyncStorage.setItem(ADDRESS_SELECTED, JSON.stringify(addressObj));
          }}
        />
      )}
      {address && activeScreen != 'Modify' && (
        <TouchableOpacity
          onPress={async () => {
            let addressObj = {from: 'currentLocation', address, location};

            store.dispatch(getSelectedAddressLocation(addressObj));
            AsyncStorage.setItem(ADDRESS_SELECTED, JSON.stringify(addressObj));
            setAddInd(undefined);
          }}
          style={{
            ...homeStyles.locationContainer,
            backgroundColor: appColors.white,
            width: '87%',
            alignSelf: 'center',
            borderWidth: 2,
            borderColor:
              address && addInd == undefined
                ? appColors.primaryColor
                : appColors.dimGrey,
            padding: 15,
            marginBottom: 10,
          }}>
          {getIcon('et', 'location-pin', null, 30, appColors.primaryColor)}
          <Text
            style={{
              ...homeStyles.locationText,
              color: appColors.smokyBlack,
            }}>
            {address}
          </Text>
        </TouchableOpacity>
      )}

      {activeScreen == 'Modify' && (
        <ModifyAddress
          addressDet={addressDet}
          ref={childRef}
          setAddressList={setAddressList}
          toggleScreen={saveAddress}
          loading={loading}
          setLoading={setLoading}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}

      {activeScreen !== 'Modify' && (
        <View style={[styles.viewStyle, {marginVertical: -10}]}>
          <TouchableOpacity
            onPress={() => (setAddDet(null), setActiveScreen('Modify'))}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              borderWidth: 1,
              borderColor: appColors.primaryColor,
              backgroundColor: 'white',
            }}>
            {getIcon(
              'ion',
              'add-circle-outline',
              null,
              20,
              appColors.primaryColor,
            )}

            <Text>&nbsp;&nbsp;Add New Delivery Address</Text>
          </TouchableOpacity>
        </View>
      )}
      {activeScreen != 'Modify' &&
        addressList &&
        addressList.length != 0 &&
        addressList.map((add, index) => {
          return (
            <TouchableOpacity
              onPress={async () => {
                setAddInd(index);
                let addressObj = {
                  from: 'addressList',
                  index,
                  address: add.addressLine1
                    .concat(`, ${add.addressLine2}, `)
                    .concat(`, ${add.city}, `)
                    .concat(add.state.concat(`, ${add.pinCode} .`)),
                };
                store.dispatch(getSelectedAddressLocation(addressObj));
                AsyncStorage.setItem(
                  ADDRESS_SELECTED,
                  JSON.stringify(addressObj),
                );
              }}
              key={index}
              style={[styles.viewStyle, {marginVertical: 0}]}>
              <View
                style={{
                  borderWidth: 3,
                  borderColor:
                    index == addInd ? appColors.primaryColor : '#cccccc',
                  borderRadius: 5,
                  flexDirection: 'column',
                  padding: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                    }}>
                    {getIcon(
                      'fa',
                      add.addressType == 'Work' ? 'briefcase' : 'home',
                      null,
                      20,
                      appColors.primaryColor,
                    )}

                    <Text style={{fontWeight: 'bold'}}>
                      &nbsp;&nbsp;&nbsp;{add.addressType}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      padding: 5,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      onPress={() => modifyAddress(add)}
                      style={{
                        color: appColors.primaryColor,
                        textAlign: 'right',
                      }}>
                      Edit
                    </Text>
                    <TouchableOpacity
                      style={{marginLeft: 20}}
                      onPress={async () => {
                        let newArr = [...addressList];
                        newArr.splice(index, 1);
                        await AsyncStorage.setItem(
                          'addressList',
                          JSON.stringify(newArr),
                        );
                        setAddressList(newArr);
                      }}>
                      {getIcon('mi', 'delete', null, 20, appColors.grey)}
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    padding: 5,
                  }}>
                  <View
                    style={{
                      width: '100%',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 13}}>
                      {add.firstName.concat(` ${add.lastName}` || '')},
                    </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 13, top: 5}}>
                      {add.mobile},
                    </Text>

                    <Text
                      style={{
                        fontSize: 13,
                        marginVertical: 5,
                        top: 5,
                      }}>
                      {add.addressLine1.concat(`, ${add.addressLine2} ,`)}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        marginVertical: 5,
                      }}>
                      {add.city
                        .concat(`, ${add.state}, `)
                        .concat(`${add.pinCode} .`)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 40,
                    borderTopWidth: 1,
                    borderColor: '#cccccc',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      paddingBottom: 10,
                      textAlign: 'center',
                      color: index == addInd ? appColors.primaryColor : 'black',
                    }}>
                    Deliver to this address
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);
