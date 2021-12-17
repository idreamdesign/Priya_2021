import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import SearchBar from '../../../components/SearchBar';
import appColors from '../../../utils/appColors';
import basicStyles from '../../../styles/basicStyles';
import getIcon from '../../../utils/commonfunctions/getIcon';
import styles from '../../../styles/HomeStyles';
import appImages from '../../../assets';

export const SearchHistory = props => {
  const categories = [
    {catName: 'Fish', catImg: appImages.categoryImages.SEAFOOD},
    {catName: 'Egg', catImg: appImages.categoryImages.EGG},
    {catName: 'Cool drinks', catImg: appImages.categoryImages.COOLDRINK},
  ];
  return (
    <ScrollView
      style={{
        ...basicStyles.container,
        flex: 0,
        height: undefined,
        width: undefined,
      }}>
      <View
        style={{
          paddingBottom: 15,
          borderBottomWidth: 1,
          borderBottomColor: appColors.grey,
        }}>
        <SearchBar
          placeHolder="Search by shopname,item,product..."
          style={{
            marginTop: 10,
            height: 60,
            backgroundColor: 'white',
            width: '103%',
            borderWidth: 1,
            borderColor: appColors.smokyBlack,
          }}
        />
      </View>
      <View
        style={{
          width: '95%',
          marginLeft: '4%',
          marginRight: '4%',
          marginVertical: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: appColors.smokyBlack,
            marginBottom: 10,
          }}>
          Your Recent Searches
        </Text>
        {[1, 2, 3, 4, 5].map((el, i) => {
          return (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: '1.5%',
                borderWidth: 1,
                borderColor: appColors.dimGrey,
                padding: 15,
                width: '98%',
              }}>
              <View
                style={{
                  width: '10%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {getIcon('fa5', 'search', null, 17.5)}
              </View>
              <View style={{width: '90%'}}>
                <Text
                  style={{
                    marginLeft: 10,
                    width: '100%',
                    fontWeight: '400',
                    fontSize: 20,
                  }}>
                  Search item {i + 1}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <View
        style={{
          marginLeft: '4%',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: appColors.smokyBlack,
            marginBottom: 10,
          }}>
          Your Favourites
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item, i) => {
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('ShopsList', {from: 'fav'})
              }
              key={i}
              style={{
                ...styles.nearRestCard,
                marginLeft: 10,
                width: 150,
                marginRight: 5,
                marginLeft: i == 0 ? 15 : 0,
              }}>
              <Image style={styles.nearRestImg} source={item.catImg} />
              <Text style={{...styles.restName, textTransform: 'uppercase'}}>
                {item.catName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory);
