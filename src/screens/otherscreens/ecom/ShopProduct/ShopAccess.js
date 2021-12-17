import React, {useCallback, useState, useEffect} from 'react';
import {Image} from 'react-native';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import _ from 'lodash';

import MyHeader from '../../common/MyHeader';
import {appImages} from '../../config';
import {Theme_Light_Green} from '../../styles/colors';
import {WINDOW_WIDTH} from '../../styles/mixins';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native';
// import FilterScreen from "./Filter";
import {ecommerce} from '../../api/Ecommerce.service';
import {useFocusEffect} from '@react-navigation/core';
import Snackbar from 'react-native-snackbar';
import {loadingUri, spinnerUri} from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopAccess = props => {
  const [activeScreen, setActiveScreen] = useState('List');
  const [clear, setClear] = useState(false);

  const [accessList, setAccessList] = useState(null);
  const [filterList, setFilterList] = useState(null);
  const [shopList, setShopList] = useState(null);
  const [wishList, setWishList] = useState([]);
  const [wishListPair, setWishListPair] = useState([]);
  const [termIds, setTermIds] = useState([]);
  const [sizeIds, setSizeIds] = useState([]);
  const [colorIds, setColorIds] = useState([]);

  const [userId, setUserId] = useState(null);
  const [selections, setSelections] = useState([]);

  const applyFilter = async () => {
    setActiveScreen('List');
    setAccessList(null);
    const response = await ecommerce.applyFilter(
      3,
      sizeIds.length == 0 ? '' : sizeIds,
      colorIds.length == 0 ? '' : colorIds,
      termIds.length == 0 ? '' : termIds,
      _.isUndefined(sortInd)
        ? ''
        : sortInd == 1
        ? 'lowtohigh'
        : sortInd == 2
        ? 'hightolow'
        : sortInd == 5
        ? 'newestfirst'
        : '',
    );
    _.isNull(response.responseContent)
      ? setAccessList([])
      : setAccessList(response.responseContent.content);
  };

  const addWishlist = async variantId => {
    Snackbar.show({
      text: 'Processing...',
      backgroundColor: Theme_Light_Green,
      length: Snackbar.LENGTH_INDEFINITE,
    });
    let user = await AsyncStorage.getItem('user_details');
    user = JSON.parse(user);
    if (wishList.includes(variantId)) {
      const wid = wishListPair.find(e => e.variantId == variantId);
      console.log(wid);
      const response = await ecommerce.deleteWhisList(wid.whislistId);
      if (response.errorCode == 200) {
        getWishList();
        Snackbar.show({
          text: 'Product removed from your wishlist',
          backgroundColor: 'red',
          length: Snackbar.LENGTH_SHORT,
        });
      }
    } else {
      const body = {
        user: {
          id: user.id,
        },
        variant: {
          id: variantId,
        },
      };
      const res = await ecommerce.postWishList(body);
      if (res.errorCode == 200) {
        getWishList();
        Snackbar.show({
          text: 'Your product is saved to Wishlist',
          backgroundColor: Theme_Light_Green,
          length: Snackbar.LENGTH_SHORT,
        });
      }
    }
  };
  const getWishList = async () => {
    let user = await AsyncStorage.getItem('user_details');
    user = JSON.parse(user);
    const res = await ecommerce.getUserWishList(user.id);
    const result = res.responseContent || [];
    const whislist = await result.map(obj => obj.variant.id);
    const whislistnew = await result.map(obj => {
      let temp = {
        whislistId: obj.id,
        variantId: obj.variant.id,
      };
      return temp;
    });
    setWishListPair(whislistnew);
    setWishList(whislist);
    console.log(whislist, '=====))((((');
    console.log(whislistnew, '==========================');
  };
  useEffect(() => {
    let isActive = true;
    isActive && getCartList();
    getWishList();
    return () => {
      isActive = false;
    };
  }, []);

  const getCartList = async () => {
    let shoppingList = JSON.parse(await AsyncStorage.getItem('cartList'));

    shoppingList.forEach(element => {
      element.img = element.variant.image1;
      element.title = element.variant.product.productName;
      element.qty = element.variant.quantity;
      element.amount = Number(element.variant.price);
      element.estimated = 1200;
      element.type = null;
    });
    setShopList(shoppingList);
  };
  const fetchAccessList = async () => {
    setAccessList(null);

    const user = JSON.parse(await AsyncStorage.getItem('user_details'));
    setUserId(user.id);
    const response = await ecommerce.getProductsById(3);
    const res = await ecommerce.getFilters(3);
    setFilterList(res.responseContent);
    getWishList();
    !response &&
      (setAccessList([]),
      Snackbar.show({
        text:
          'Network error!Please check you internet connection and try again later',
        backgroundColor: 'red',
        length: Snackbar.LENGTH_SHORT,
      }));
    if (!_.isEmpty(response.responseContent)) {
      if (response.responseContent) {
        setAccessList(response.responseContent);
      } else {
        setAccessList([]);
      }
    } else {
      Snackbar.show({
        duration: Snackbar.LENGTH_SHORT,
        text: 'Network unavailable.Please check your internet connection',
      });
    }
  };

  //SortByCard
  const [sortbyVisibile, setSortByVisible] = useState(false);
  const [sortInd, setSortInd] = useState(undefined);

  useFocusEffect(
    useCallback(() => {
      let isFocus = true;

      fetchAccessList();

      return () => {
        isFocus = false;
      };
    }, []),
  );

  const goBack = () => {
    if (activeScreen == 'Filter') {
      setActiveScreen('List');
    } else {
      props.navigation.goBack();
    }
  };

  const shopHeader = () => {
    let name = '';
    switch (props.route.params.type) {
      case 'access':
        name = 'accessories';
        break;
      default:
        name = '';
        break;
    }
    return (
      <MyHeader
        {...props}
        shopList={shopList}
        name={name}
        type={props.route.params.type}
        navigation={props.navigation}
        goBack={goBack}
      />
    );
  };

  const ModalCard = () => {
    const [sortIndex, setSortIndex] = useState(sortInd);
    const sortOptions = [
      'Most Relevant',
      'Price { low > high }',
      'Price { high < low }',
      'Rating',
      'Newest First',
    ];

    return (
      <Modal
        visible={sortbyVisibile}
        transparent={true}
        animationType={'slide'}>
        <View
          style={{
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 25,
            paddingVertical: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => (
                setSortByVisible(false),
                setSortInd(sortIndex),
                fetchAccessList()
              )}>
              <Text style={{fontSize: 16}}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Sort by</Text>
            <TouchableOpacity
              onPress={() => (
                setSortByVisible(false), setSortInd(sortIndex), applyFilter()
              )}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: Theme_Light_Green,
                }}>
                APPLY
              </Text>
            </TouchableOpacity>
          </View>
          {sortOptions.map((item, index) => (
            <TouchableOpacity onPress={() => setSortIndex(index)} key={index}>
              <Text
                style={{
                  padding: 10,
                  color: index == sortIndex ? Theme_Light_Green : 'black',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    );
  };

  const Rating = ({rating}) => {
    let full = Number(rating.split('.')[0]);
    let half =
      Number(rating.split('.')[1]) == 0 || _.isNaN(Number(rating.split('.')[1]))
        ? false
        : true;
    let empty = Math.floor(5 - Number(rating));

    return (
      <View style={{flex: 1, flexDirection: 'row', bottom: 10}}>
        {full != 0 &&
          full <= 5 &&
          Math.sign(full) != -1 &&
          [...Array(full)].map((elementInArray, index) => (
            <MIcon
              key={index}
              name={'star'}
              color={'#FFC107'}
              size={25}
              style={{top: 2}}
            />
          ))}
        {full <= 5 && empty <= 5 && half && (
          <Image
            resizeMode={'contain'}
            source={appImages.HStar}
            style={{
              top: 2,
              height: 24,
              width: 23,
            }}
          />
        )}
        {full == 0 &&
          [...Array(5)].map((emp, index) => (
            <MIcon
              name={'star-outline'}
              key={index}
              color={'#8f8f8b'}
              size={25}
              style={{top: 2}}
            />
          ))}
        {empty != 0 &&
          empty < 5 &&
          Math.sign(empty) != -1 &&
          [...Array(empty)].map((emp, index) => (
            <MIcon
              name={'star-outline'}
              key={index}
              color={'#8f8f8b'}
              size={25}
              style={{top: 2}}
            />
          ))}
      </View>
    );
  };

  const CycleCard = ({item}) => {
    return (
      <View
        style={{
          width: WINDOW_WIDTH / 2.1,
          marginVertical: 10,
          marginLeft: 10,
        }}>
        <TouchableOpacity
          style={styles.cycleCard1}
          onPress={() =>
            props.navigation.navigate('ViewAccess', {
              type: props.route.params.type,
              accessData: item,
              userId: userId,
            })
          }>
          <TouchableOpacity onPress={() => addWishlist(item.id)}>
            <FIcon
              name={wishList.includes(item.id) ? 'heart' : 'heart-o'}
              color={Theme_Light_Green}
              size={20}
              style={styles.likeIcon}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              padding: 5,
            }}>
            <Image
              loadingIndicatorSource={{uri: spinnerUri}}
              source={{uri: item.image1}}
              resizeMode={'contain'}
              style={{
                width: 150,
                height: 100,
                alignSelf: 'center',
              }}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: 14,
                marginTop: 15,
              }}>
              {item.variantName}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: WINDOW_WIDTH / 2,
                paddingVertical: 5,
              }}>
              <View style={{width: '53%'}}>
                <Text
                  style={{
                    fontSize: 12,
                    alignSelf: 'flex-start',
                    fontWeight: '900',
                  }}>
                  Rs. {item.price}
                </Text>
              </View>
              {item.discountInPercentage && (
                <View
                  style={{
                    width: 60,
                    height: 18,
                    backgroundColor: `#97ea5a`,
                    right: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                    }}>
                    {item.discountInPercentage} Offer
                  </Text>
                </View>
              )}
            </View>
            <Rating
              rating={item.averageRating ? String(item.averageRating) : '0.0'}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {activeScreen == 'List' ? (
        shopHeader()
      ) : (
        <MyHeader
          name={'Filter'}
          {...props}
          filter={true}
          clearAll={() => {
            setSelections([]);
            fetchAccessList();
          }}
          navigation={props.navigation}
          type={props.route.params.type}
          goBack={goBack}
        />
      )}
      {activeScreen !== 'Filter' && (
        <React.Fragment>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              style={styles.sortbtn}
              onPress={() => setSortByVisible(true)}>
              <FIcon name={'sort'} color={'white'} size={25} />
              <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                &nbsp; Sort By
              </Text>
              <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!Boolean(filterList)}
              style={styles.filterbtn}
              onPress={() => setActiveScreen('Filter')}>
              <MIcon
                name={'filter'}
                color={'white'}
                size={25}
                style={{top: 2}}
              />
              <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                &nbsp; Filter
              </Text>
            </TouchableOpacity>
          </View>
          {Boolean(accessList) == false && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50%',
              }}>
              <Image
                resizeMode={'contain'}
                style={{height: 100, width: 100}}
                source={{
                  uri: loadingUri,
                }}
              />
            </View>
          )}
          {Boolean(accessList) && accessList.length != 0 ? (
            <FlatList
              data={accessList}
              renderItem={CycleCard}
              keyExtractor={(_, i) => i.toString()}
              numColumns={2}
              // onEndReached={updateList}
              // onEndReachedThreshold={0.1}
              // ListFooterComponent={FooterLoader}
            />
          ) : (
            Boolean(accessList) && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '50%',
                }}>
                <Text style={{fontSize: 20}}>No data found</Text>
              </View>
            )
          )}

          <ModalCard />

          {sortbyVisibile ? (
            <View
              style={{
                backgroundColor: '#000',
                opacity: 0.5,
                flex: 1,
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}></View>
          ) : null}
        </React.Fragment>
      )}
      {/*{activeScreen == "Filter" && (
        <React.Fragment>
          <FilterScreen
            type={props.route.params.type}
            filterList={filterList}
            selections={selections}
            setSelections={setSelections}
            toggleScreen={() => setActiveScreen("List")}
            clear={clear}
            termIds={termIds}
            colorIds={colorIds}
            setTermIds={setTermIds}
            setSizeIds={setSizeIds}
            setColorIds={setColorIds}
            sizeIds={sizeIds}
          />
          <View style={{ width: "100%", flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setActiveScreen("List")}
              style={{
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: Theme_Light_Green,
                height: 50,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: Theme_Light_Green,
                  fontSize: 14,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selections.length !== 0
                  ? applyFilter()
                  : setActiveScreen("List");
              }}
              style={{
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Theme_Light_Green,
                height: 50,
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 14 }}
              >
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      )}*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sortbtn: {
    flexDirection: 'row',
    width: WINDOW_WIDTH / 2,
    backgroundColor: Theme_Light_Green,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterbtn: {
    flexDirection: 'row',
    width: WINDOW_WIDTH / 2,
    backgroundColor: Theme_Light_Green,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 2,
  },
  cardContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  cycleCard: {
    height: 230,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#B5afa5',
  },
  cycleCard1: {
    height: 230,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#B5afa5',
  },
  likeIcon: {
    textAlign: 'right',
    paddingRight: 15,
    paddingTop: 10,
  },
});
export default ShopAccess;
