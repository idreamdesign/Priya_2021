import React, {useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import getIcon from '../../../utils/commonfunctions/getIcon';
import appImages from '../../../assets';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/ecomAccount';
import shopStyles from '../../../styles/shopStyles';
import appColors from '../../../utils/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EcomAccount = props => {
  const [logoutPopUp, setLogoutPopUp] = useState(false);
  const LogoutPopUp = () => {
    return (
      <Modal
        onRequestClose={() => setLogoutPopUp(false)}
        style={{alignItems: 'center', justifyContent: 'center'}}
        visible={logoutPopUp}
        transparent>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '30%',
          }}>
          <View
            style={{
              backgroundColor: appColors.white,
              width: '90%',
              padding: 15,
              borderWidth: 0.19,
            }}>
            <Text
              style={{
                fontSize: 21,
                fontWeight: '400',
                color: appColors.smokyBlack,
              }}>
              Log out
            </Text>
            <Text style={{fontSize: 17, fontWeight: '400', marginTop: 15}}>
              Are you sure want to Log out from Djeli-Ecommerce application ?
            </Text>
            <Text
              style={{
                color: appColors.primaryColor,
                textTransform: 'uppercase',
                fontSize: 17,
                marginLeft: '60%',
                marginTop: 10,
              }}>
              <Text
                onPress={() => setLogoutPopUp(false)}
                style={{width: '30%'}}>
                NO
              </Text>
              <Text
                onPress={async () => {
                  const keys = await AsyncStorage.getAllKeys();
                  console.log('async keys:::>', keys);
                  if (keys.length >= 0) {
                    await AsyncStorage.multiRemove(keys);
                    setLogoutPopUp(false);
                    props.navigation.navigate('RoleSelectionScreen');
                  }
                }}>
                &nbsp; &nbsp; &nbsp; &nbsp;Yes
              </Text>
            </Text>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View style={basicStyles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AccountDetails')}
        style={styles.accountMenus}>
        <View>
          <Text style={styles.menuTitle}>My Account</Text>
          <Text style={styles.menuDesc}>Profile,change password</Text>
        </View>
        {getIcon('ion', 'chevron-forward', {marginRight: 10}, 25)}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('My Orders')}
        style={styles.accountMenus}>
        <View>
          <Text style={styles.menuTitle}>My Address</Text>
          <Text style={styles.menuDesc}>Modify address,add new address</Text>
        </View>
        {getIcon('ion', 'chevron-forward', {marginRight: 10}, 25)}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('ShopsList', {from: 'fav'})}
        style={styles.accountMenus}>
        <View>
          <Text style={styles.menuTitle}>My Favourites</Text>
          <Text style={styles.menuDesc}>Favourite products and shops</Text>
        </View>
        {getIcon('ion', 'chevron-forward', {marginRight: 10}, 25)}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('HelpAndSupport')}
        style={styles.accountMenus}>
        <View>
          <Text style={styles.menuTitle}>Support</Text>
          <Text style={styles.menuDesc}>Need help and queries</Text>
        </View>
        {getIcon('ion', 'chevron-forward', {marginRight: 10}, 25)}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('My Orders')}
        style={styles.accountMenus}>
        <View>
          <Text style={styles.menuTitle}>Your orders</Text>
          <Text style={styles.menuDesc}>Your orders and details</Text>
        </View>
        {getIcon('ion', 'chevron-forward', {marginRight: 10}, 25)}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setLogoutPopUp(true);
        }}
        style={styles.accountMenus}>
        <View>
          <Text style={styles.menuTitle}>Logout</Text>
          <Text style={styles.menuDesc}>Logout from online shopping</Text>
        </View>
        {getIcon('ad', 'logout', {marginRight: 12}, 22)}
      </TouchableOpacity>
      {logoutPopUp && <LogoutPopUp />}
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EcomAccount);
