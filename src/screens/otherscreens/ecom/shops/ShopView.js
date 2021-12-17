import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import appImages from '../../../../assets';
import Rating from '../../../../components/Rating';
import store from '../../../../redux/store';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/shopStyles';
import appColors from '../../../../utils/appColors';
import getIcon from '../../../../utils/commonfunctions/getIcon';
import {getCartCount} from '../../../../redux/root.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ShopView = props => {
  const shopDetail = store.getState().app.other.selectedShop;
  const [qty, setQty] = useState(1);
  const [shoppingItems, setShoppingItems] = useState([
    {
      name: 'Item 1',
      qty: 0,
      amount: 100,
      unit: 'per kg',
      desc: 'Fresh item',
    },
    {
      name: 'Item 2',
      qty: 0,
      amount: 200,
      unit: 'per kg',
      desc: 'Fresh item',
    },
    {
      name: 'Item 3',
      qty: 0,
      amount: 300,
      unit: 'per kg',
      desc: 'New arrival',
    },
    {
      name: 'Item 4',
      qty: 0,
      amount: 400,
      unit: 'per kg',
      desc: 'Fresh item',
    },
  ]);

  React.useEffect(() => {
    let isActive = true;
    props.navigation.setOptions({headerTitle: shopDetail});
    return () => {
      isActive = false;
    };
  }, []);
  console.log(shopDetail);
  return (
    <View style={basicStyles.container}>
      <View style={styles.shopDetailsContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 0,
            height: undefined,
            width: undefined,
          }}>
          <Image
            style={styles.shopImage}
            source={appImages.appImages.LOGINBG}
          />
          <Text style={styles.shopTitle}>{shopDetail}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: -5,
              marginTop: 5,
            }}>
            {getIcon('et', 'location-pin', null, 25, appColors.grey)}

            <Text style={styles.locationTxt}>XXStreet,YY Nagar,123456. </Text>
          </View>

          <View style={styles.rateDisOffCardContainer}>
            <View style={styles.rateDisOffCard}>
              {getIcon('ion', 'ios-time-sharp', null, 22, appColors.grey)}
              <Text
                style={{
                  ...styles.locationTxtSmall,
                  color: appColors.primaryColor,
                }}>
                12mins
              </Text>
            </View>
            <View style={styles.rateDisOffCard}>
              {getIcon('mi', 'local-offer', null, 22, appColors.grey)}
              <Text
                style={{
                  ...styles.locationTxtSmall,
                  color: appColors.primaryColor,
                }}>
                50%
              </Text>
            </View>
            <View style={styles.rateDisOffCard}>
              {getIcon('ion', 'star', null, 22, appColors.grey)}
              <Rating
                rating={4}
                iconSize={20}
                iconColor={appColors.primaryColor}
              />
            </View>
          </View>

          {shoppingItems.map((el, i) => {
            return (
              <View
                style={{...styles.itemCard, marginTop: i == 0 ? 15 : 5}}
                key={i}>
                <View style={{width: '48%'}}>
                  <Image
                    style={styles.itemImg}
                    source={appImages.otherImages.FOOD}
                  />
                </View>
                <View style={{width: '1%'}} />
                <View style={{width: '48%'}}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.itemTitle}>{el.name}</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.itemName}>{el.desc}</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.itemName}>
                      {el.amount} ({el.unit})
                    </Text>
                  </View>
                  <View
                    style={{...styles.detailsContainer, alignItems: 'center'}}>
                    <Text style={styles.itemTitle}>Qty </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          if (shoppingItems[i].qty !== 0) {
                            let newArray = [...shoppingItems];
                            newArray[i].qty = shoppingItems[i].qty - 1;
                            console.log(newArray, 'New Array');
                            setShoppingItems(newArray);
                          }
                        }}>
                        {getIcon(
                          'ion',
                          'remove-circle',
                          null,
                          25,
                          appColors.red,
                        )}
                      </TouchableOpacity>
                      <Text style={{fontSize: 25, color: appColors.dimBlack}}>
                        {' '}
                        {el.qty}{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={async () => {
                          let newArray = [...shoppingItems];
                          newArray[i].qty = shoppingItems[i].qty + 1;
                          setShoppingItems(newArray);
                          // JSON.parse(await AsyncStorage.getItem(CART_COUNT));

                          // store.dispatch(
                          //   getCartCount(store.app.other.cartCount + 1),
                          // );
                        }}>
                        {getIcon(
                          'ion',
                          'add-circle',
                          null,
                          25,
                          appColors.darkGreen,
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShopView);
