import React from 'react';
import {Image, View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import appImages from '../../../../assets';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/shopStyles';
import homeStyles from '../../../../styles/HomeStyles';
import getIcon from '../../../../utils/commonfunctions/getIcon';
import appColors from '../../../../utils/appColors';
import Rating from '../../../../components/Rating';
import FullSizeBtn from '../../../../components/FullSizeBtn';
import {getSelectedShop} from '../../../../redux/actions/appActions/other.actions';
import store from '../../../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SHOP_SELECTED} from '../../../../utils/constants';

export const ShopsList = props => {
  const isFav = props.route.params && props.route.params.from == 'fav';
  React.useEffect(() => {
    let isActive = true;
    isActive &&
      isFav &&
      props.navigation.setOptions({
        headerTitle: 'My favourites',
      });
    return () => {
      isActive = false;
    };
  }, []);
  return (
    <View style={basicStyles.container}>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          return (
            <View style={styles.shopCard}>
              <Image
                style={styles.shopImage}
                source={appImages.appImages.LOGINBG}
              />
              <View style={{...homeStyles.divisionHeader, marginVertical: 10}}>
                <Text
                  style={{
                    ...homeStyles.categoryTitle,
                    color: appColors.dimBlack,
                  }}>
                  Shop Name
                </Text>
                <Rating rating={4} iconSize={20} />
              </View>
              <View style={{...homeStyles.divisionHeader, marginVertical: 0}}>
                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {getIcon('et', 'location-pin', null, 25, appColors.grey)}

                    <Text style={styles.locationTxt}>
                      XXStreet,YY Nagar,123456.{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      left: 3,
                      marginTop: 8,
                    }}>
                    {getIcon('ion', 'ios-time-sharp', null, 22, appColors.grey)}

                    <Text style={{fontSize: 15}}>12 mins </Text>
                  </View>
                </View>
                <View style={styles.offerCard}>
                  {getIcon('mi', 'local-offer', null, 25, appColors.white)}

                  <Text
                    style={{
                      ...homeStyles.offerPercent,
                      color: appColors.white,
                    }}>
                    50% Offer
                  </Text>
                </View>
              </View>
              <FullSizeBtn
                onPress={async () => {
                  await AsyncStorage.setItem(
                    SHOP_SELECTED,
                    `Shop ${index + 1} }`,
                  );
                  store.dispatch(getSelectedShop(`Shop ${index + 1}`));

                  props.navigation.navigate('ShopView');
                }}
                btnColor={appColors.simpleBlue}
                btnTitle={'Order Now'}
                style={{width: '100%', marginTop: 10}}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShopsList);
