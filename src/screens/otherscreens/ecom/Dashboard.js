import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import appImages from '../../../assets';
import FullSizeBtn from '../../../components/FullSizeBtn';
import SearchBar from '../../../components/SearchBar';
import {getSelectedShop} from '../../../redux/root.actions';
import store from '../../../redux/store';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/HomeStyles';
import appColors from '../../../utils/appColors';
import getIcon from '../../../utils/commonfunctions/getIcon';
import {SHOP_SELECTED} from '../../../utils/constants';
import Geolocation from 'react-native-geolocation-service';
import {useFocusEffect} from '@react-navigation/native';
export const Dashboard = props => {
  const [selectedAddress, setSelectedAddress] = useState(
    store.getState().app.other.selectedAddress,
  );
  useFocusEffect(
    React.useCallback(() => {
      setSelectedAddress(store.getState().app.other.selectedAddress);
    }, [props.navigation]),
  );
  const tabMenus = ['Fastest distance', 'Rating 4.0+', 'Popular', 'Offers'];
  const categories = [
    {catName: 'Chicken', catImg: appImages.categoryImages.CHICKEN},
    {catName: 'Mutton', catImg: appImages.categoryImages.MUTTON},
    {catName: 'Fish', catImg: appImages.categoryImages.SEAFOOD},
    {catName: 'Egg', catImg: appImages.categoryImages.EGG},
    {catName: 'Seafoods', catImg: appImages.categoryImages.GROCERY},
    {catName: 'Cool drinks', catImg: appImages.categoryImages.COOLDRINK},
  ];
  return (
    <View
      style={{
        ...basicStyles.container,
      }}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('MyAddress')}
        style={{
          ...styles.locationContainer,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        {getIcon('et', 'location-pin', null, 25, appColors.white)}
        <Text
          style={styles.locationText}
          numberOfLines={1}
          ellipsizeMode="tail">
          {selectedAddress && selectedAddress.address
            ? selectedAddress.address
            : 'Choose location'}
        </Text>
      </TouchableOpacity>
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeHolder="Search by shopname, item name, product..."
          style={{marginTop: 10, backgroundColor: 'white'}}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 10,
          paddingTop: 0,
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.tabsContainer}>
          {tabMenus.map((tabName, i) => {
            return (
              <View
                key={i}
                style={{
                  ...styles.tabs,
                  width: tabName.length * 10,
                  height: 40,
                  marginLeft: i == 0 ? -15 : 10,
                }}>
                <Text>{tabName}</Text>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ShopsList')}
          style={{
            padding: 10,
            width: '110%',
            marginLeft: -10,
            backgroundColor: appColors.palePink,
          }}>
          <View style={styles.divisionHeader}>
            <Text style={styles.categoryTitle}>Offers for you</Text>
            {getIcon('ion', 'chevron-forward', {marginRight: 10}, 25)}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5].map((item, i) => {
              return (
                <TouchableOpacity
                  onPress={async () => {
                    await AsyncStorage.setItem(
                      SHOP_SELECTED,
                      `Shop ${i + 1} }`,
                    );
                    store.dispatch(getSelectedShop(`Shop ${i + 1}`));

                    props.navigation.navigate('ShopView');
                  }}
                  btnColor={appColors.simpleBlue}
                  btnTitle={'Order Now'}
                  key={i}
                  style={{...styles.offerCard, marginLeft: i == 0 ? 0 : 10}}>
                  <Image
                    style={styles.offerImg}
                    source={appImages.appImages.LOGINBG}
                  />
                  <Text style={styles.offerPercent}>50% Offer</Text>
                  <Text style={styles.restName}>Shop {i + 1}</Text>
                  <Text style={styles.locationTxt}>Location | 11mins</Text>
                  <Text style={styles.availabilityTxt}>
                    <Text style={{color: appColors.primaryColor}}>Opens</Text> :{' '}
                    <Text style={{color: appColors.darkGreen}}>
                      10am to 12pm
                    </Text>
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </TouchableOpacity>
        <Text style={{...styles.offerText, marginTop: 10}}>
          Shops near by you
        </Text>
        <View style={styles.restContainer}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <FlatList
              style={{margin: 5}}
              data={[1, 2, 3, 4, 5, 6]}
              numColumns={2}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('ShopsList')}
                    style={{...styles.nearRestCard, marginLeft: 15}}>
                    <Image
                      style={styles.nearRestImg}
                      source={appImages.otherImages.FOOD}
                    />
                    <Text style={styles.restName}>New Shop</Text>
                    <Text style={styles.locationTxt}>Location</Text>
                    <Text style={styles.availabilityTxt}>11mins</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <FullSizeBtn
            onPress={() => props.navigation.navigate('ShopsList')}
            btnColor={appColors.simpleBlue}
            btnTitle={'See all shops'}
            style={{marginTop: 15}}
          />
        </View>
        <Text style={{...styles.offerText, marginTop: 10}}>
          Popular products
        </Text>
        <View style={styles.restContainer}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <FlatList
              style={{margin: 5}}
              data={categories}
              numColumns={3}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('ShopsList')}
                    style={{
                      ...styles.nearRestCard,
                      width: '30%',
                      marginLeft: 10,
                    }}>
                    <Image style={styles.nearRestImg} source={item.catImg} />
                    <Text
                      style={{...styles.restName, textTransform: 'uppercase'}}>
                      {item.catName}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
