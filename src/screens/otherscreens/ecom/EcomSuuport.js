import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import appImages from '../../../assets';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/HomeStyles';
import rolestyles from '../../../styles/roleSelectioStyles';
import appColors from '../../../utils/appColors';
import getIcon from '../../../utils/commonfunctions/getIcon';

const EcomSupport = () => {
  return (
    <View style={{...basicStyles.container, ...basicStyles.centerContainer}}>
      <Image source={appImages.appImages.LOGO1} style={rolestyles.logoStyles} />

      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: appColors.smokyBlack,
          }}>
          Contact us:{' '}
        </Text>

        <TouchableOpacity
          onPress={() => {
            const scheme = Platform.select({
              ios: 'maps:0,0?q=',
              android: 'geo:0,0?q=',
            });
            const latLng = `${5.69921},${101.84224}`;
            const label = 'Custom Label';
            const url = Platform.select({
              ios: `${scheme}${label}@${latLng}`,
              android: `${scheme}${latLng}(${label})`,
            });
            Linking.openURL(url);
          }}
          style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
          {getIcon(
            'ion',
            'md-location-sharp',
            null,
            25,
            appColors.primaryColor,
          )}
          <Text
            style={{marginLeft: 10, fontSize: 18, color: appColors.smokyBlack}}>
            Jeli, Kelantan , Malaysia
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${6012}${3456789}`);
          }}
          style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
          {getIcon('ion', 'ios-call', null, 25, appColors.primaryColor)}

          <Text
            style={{
              marginLeft: 10,
              fontSize: 18,
              color: appColors.smokyBlack,
            }}>
            +6012-3456789
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('mailto:support@djeli.com');
          }}
          style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
          {getIcon('ion', 'ios-mail', null, 25, appColors.primaryColor)}

          <Text
            style={{
              marginLeft: 10,
              fontSize: 18,
              color: appColors.smokyBlack,
            }}>
            support@djeli.com
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EcomSupport);
