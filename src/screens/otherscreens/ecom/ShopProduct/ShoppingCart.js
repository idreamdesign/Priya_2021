import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ImageBackground,
  TextInput,
  Image,
} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import RazorpayCheckout from 'react-native-razorpay';
import _ from 'lodash';
// import {Products} from '../../components/Explore/Products';
import {useFocusEffect} from '@react-navigation/native';
import ModifyAddress from './ModifyAddress';
import {OrdersTracking} from './OrderTracking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {WIDTH} from '../../../../utils/constants';
import appColors from '../../../../utils/appColors';
import appImages from '../../../../assets';
import RadioButton from '../../../../components/RadioButton';
import styles from '../../../../styles/shopStyles';

const initialValidationErrors = {
  address: false,
};

const ShoppingCart = props => {
  // const shoppingData = props.route.params.data;

  //validations

  const [validationErrors, setValidationErrors] = useState({
    ...initialValidationErrors,
  });
  const [addressList, setAddressList] = useState([]);
  const [addInd, setAddInd] = useState(undefined);
  const childRef = useRef();
  const type = 'AddCart';
  const [myData, setData] = useState([
    {
      img: appImages.categoryImages.EGG,
      title: 'Eggs',
      shop: 'New lucky shop',
      qty: 5,
      amount: Number(5),
      estimated: 0,
      about: 'Fresh egg',
    },
  ]);

  const [activeScreen, setActiveScreen] = useState('Cart');
  const [compScreens, setCompScreens] = useState(['Cart']);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [addressDet, setAddDet] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [earnPoints, setEarnPoints] = useState(null);
  const [earnedBadgeStatus, setEarnedBadgeStatus] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState(null);
  const [badgeImageLoading, setBadgeImageLoading] = useState(false);
  React.useEffect(() => {
    let isActive = true;
    console.log(activeScreen, 'activeScreenactiveScreen');
    activeScreen == 'TrackOrder' &&
      props.navigation.setOptions({headerTitle: 'Track Your Order'});
    return () => {
      isActive = false;
    };
  }, [activeScreen]);
  const saveAddress = async () => {
    const addList = JSON.parse(await AsyncStorage.getItem('addressList'));
    setAddressList(addList);
    setAddInd(undefined);
    setActiveScreen('Delivery');
  };
  const modifyAddress = async addDet => {
    setAddDet(addDet);
    setIsEdit(true);
    setActiveScreen('Modify');
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      getAddress();
      setCompScreens(['Cart']);
      setActiveScreen('Cart');
      return () => {
        isActive = false;
      };
    }, []),
  );
  const getAddress = async () => {
    const addressLists = await AsyncStorage.getItem('addressList');
    addressLists && setAddressList(JSON.parse(addressLists));
  };
  const [dispayVouchers, setDisplayVouchers] = useState(false);
  const VoucherScreen = () => {
    return (
      <View>
        <View style={[styles.voucherView, {marginVertical: 0}]}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                backgroundColor: '#d9d9d9',
                marginVertical: '10%',
                marginBottom: 10,
              }}>
              <TextInput
                placeholder={'Enter voucher here'}
                style={{
                  width: '80%',
                  padding: 10,
                }}
              />
              <TouchableOpacity
                style={{padding: 10}}
                onPress={() => setActiveScreen('Cart')}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: appColors.primaryColor,
                    textAlign: 'center',
                  }}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{width: '80%'}}>
                By applying voucher code you agree to our{' '}
                <Text
                  style={{
                    color: appColors.primaryColor,
                    fontWeight: 'bold',
                  }}>
                  Terms & Conditions
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.voucherView, {marginVertical: 0}]}>
          <Text
            style={{
              fontWeight: 'bold',
              color: appColors.primaryColor,
              fontSize: 20,
              textAlign: 'center',
            }}>
            Your vouchers
          </Text>
          {!dispayVouchers ? (
            <TouchableOpacity
              onPress={() => setDisplayVouchers(true)}
              style={{
                marginVertical: 20,
                alignSelf: 'center',
                transform: [{rotate: '160deg'}],
              }}
              activeOpacity={0.5}>
              <MIcon name={'ticket-percent'} color={'#D9e2d9'} size={150} />
            </TouchableOpacity>
          ) : (
            <View>
              <View
                style={{
                  width: '100%',
                  marginVertical: 20,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '30%',
                    borderRadius: 10,
                    height: (25 / 100) * WIDTH,
                    backgroundColor: appColors.primaryColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/**   <Image
                    loadingIndicatorSource={{uri: spinnerUri}}
                    resizeMode={'contain'}
                    source={appImages.BarCode}
                    style={{
                      height: '70%',
                      width: '70%',
                      padding: 5,
                    }}
                  /> */}
                </View>

                <View
                  style={{
                    borderColor: 'white',
                    borderStyle: 'dashed',
                    borderWidth: 1.5,
                    borderRadius: 1,
                    marginVertical: 4.7,
                    marginLeft: -2.9,
                  }}
                />

                <View
                  style={{
                    width: '70%',
                    height: (25 / 100) * WIDTH,
                    backgroundColor: appColors.primaryColor,
                    borderRadius: 10,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '40%',
                      flexDirection: 'column-reverse',
                      height: (25 / 100) * WIDTH,
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: 'white',
                        left: -5,
                      }}>
                      CODE: 1234567
                    </Text>

                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      One Day Only
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '60%',
                      flexDirection: 'column',
                      padding: 15,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        height: 40,
                        borderTopLeftRadius: 70,
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          color: 'red',
                          fontWeight: 'bold',
                          alignSelf: 'center',
                        }}>
                        75%
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        paddingVertical: 5,
                        color: 'white',
                        textAlign: 'right',
                      }}>
                      DISCOUNT
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  marginVertical: 20,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '30%',
                    borderRadius: 10,
                    height: (25 / 100) * WIDTH,
                    backgroundColor: '#FF6652',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/** <Image
                    loadingIndicatorSource={{uri: spinnerUri}}
                    resizeMode={'contain'}
                    source={appImages.BarCode}
                    style={{
                      height: '70%',
                      width: '70%',
                      padding: 5,
                    }}
                  /> */}
                </View>
                <View
                  style={{
                    borderColor: '#0E546D',
                    borderStyle: 'dashed',
                    borderWidth: 1.5,
                    borderRadius: 1,
                    marginVertical: 4.7,
                    marginLeft: -2.9,
                  }}></View>
                <View
                  style={{
                    width: '70%',
                    height: (25 / 100) * WIDTH,
                    backgroundColor: '#cccccc',
                    borderRadius: 10,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '40%',
                      flexDirection: 'column-reverse',
                      height: (25 / 100) * WIDTH,
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: 'white',
                        left: -5,
                        color: appColors.primaryColor,
                      }}>
                      CODE: 1234567
                    </Text>

                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#0E546D',
                      }}>
                      20 Feb 2020
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '60%',
                      flexDirection: 'column',
                      padding: 15,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        height: 40,
                        borderTopLeftRadius: 70,
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          color: 'red',
                          fontWeight: 'bold',
                          alignSelf: 'center',
                          color: appColors.primaryColor,
                        }}>
                        75%
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        paddingVertical: 5,
                        color: 'red',
                        textAlign: 'right',
                      }}>
                      DISCOUNT
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };
  //Our Products
  const [productData, setProductData] = useState([]);

  // const getSimilarProducts = async () => {
  //   const res = await ecommerce.getSimilarProducts(1, 1);
  //   if (res.responseContent) {
  //     setProductData(res.responseContent);
  //   }
  // };
  // useEffect(() => {
  //   let isActive = true;
  //   isActive && getSimilarProducts();

  //   return () => {
  //     isActive - false;
  //   };
  // }, []);

  const OurProducts = () => {
    return (
      <View style={[styles.viewStyle, {marginVertical: 0}]}>
        <View style={styles.heading1}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Similar Products
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  fontWeight: 'bold',
                  fontSize: 12,
                  color: appColors.primaryColor,
                }}>
                View all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginLeft: -15}}>
          <Products {...props} data={productData} />
        </View>
      </View>
    );
  };

  //Cart Screen
  const CartScreen = () => {
    return (
      <View>
        {myData.map((myData, index) => {
          return (
            <React.Fragment key={index}>
              <ModelBanner data={myData} index={index} />
            </React.Fragment>
          );
        })}
        <View style={[styles.viewStyle]}>
          <View style={styles.heading1}>
            <Text
              style={{
                fontWeight: 'bold',
                top: -5,
                fontSize: 16,
              }}>
              Order Summary
            </Text>
          </View>
          <View style={[styles.heading1, {width: '100%'}]}>
            <Text style={{width: '50%'}}>Total Price(Inc GST)</Text>
            <Text style={{width: '50%', textAlign: 'right'}}>RM.{total}</Text>
          </View>
          <View style={[styles.heading1, {width: '100%'}]}>
            <Text style={{width: '50%'}}>Estimated Shipping</Text>
            <Text style={{width: '50%', textAlign: 'right'}}>
              RM.{shipping}
            </Text>
          </View>
          <View style={{height: 2, borderWidth: 1, borderColor: '#9e9e9e'}} />
          <View style={[styles.heading1, {width: '100%'}]}>
            <Text style={{width: '50%', fontWeight: 'bold'}}>Total</Text>
            <Text
              style={{width: '50%', textAlign: 'right', fontWeight: 'bold'}}>
              RM.{sum(myData) + shipping}
            </Text>
          </View>
        </View>
        <View style={[styles.viewStyle, {marginVertical: 0}]}>
          <View style={styles.heading1}>
            <View style={{flexDirection: 'row'}}>
              <IonIcon
                name={'md-shield-checkmark-sharp'}
                color={appColors.primaryColor}
                size={20}
              />
              <Text style={{left: 10, fontWeight: 'bold', fontSize: 14}}>
                100% Secure Transaction
              </Text>
            </View>
          </View>
        </View>
        {/* <View style={[styles.viewStyle, { marginVertical: 0 }]}>
          <View style={styles.heading1}>
            <View style={{ flexDirection: "row", width: "50%" }}>
              <FontisIcon
                name={"ticket-alt"}
                color={appColors.primaryColor}
                size={20}
              />
              <Text style={{ left: 10, fontWeight: "bold", fontSize: 14 }}>
                Apply Voucher Code
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                width: "50%",
                alignItems: "flex-end",
              }}
              onPress={() => setActiveScreen("Voucher")}
            >
              <appImages.arrowright width={30} height={30} />
            </TouchableOpacity>
          </View>
        </View>
        <OurProducts />
         */}
      </View>
    );
  };

  const [deliveryInd, setDevliveryInd] = useState(undefined);
  const [deliveryOptions, setDeliveryOptions] = useState([
    {
      option: 'Standard',
      day: 'Monday',
      date: '13-04-2021',
      payment: 'free',
      amount: 0,
    },
    {
      option: 'Express',
      day: 'Monday',
      date: '13-04-2021',
      payment: 'fair',
      amount: 1288,
    },
  ]);

  //Delivery Instructions
  const DeliveryInst = () => {
    return (
      <View>
        <View style={[styles.viewStyle, {marginVertical: 0}]}>
          <Text
            style={{
              fontWeight: 'bold',

              fontSize: 16,
            }}>
            Select Delivery Address
          </Text>
        </View>

        <View style={[styles.viewStyle, {marginVertical: 0}]}>
          <TouchableOpacity
            onPress={() => (setAddDet(null), setActiveScreen('Modify'))}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 30,
              backgroundColor: 'white',
            }}>
            <IonIcon
              name={'add-circle-outline'}
              color={appColors.primaryColor}
              size={20}
            />
            <Text>&nbsp;&nbsp;Add New Delivery Address</Text>
          </TouchableOpacity>
        </View>
        {activeScreen == 'Delivery' &&
          validationErrors.address &&
          Snackbar.show({
            text: validationErrors.address,
            length: Snackbar.LENGTH_SHORT,
            backgroundColor: 'red',
          })}

        {addressList &&
          addressList.length != 0 &&
          addressList.map((add, index) => {
            return (
              <TouchableOpacity
                onPress={() => setAddInd(index)}
                key={index}
                style={[styles.viewStyle, {marginVertical: 0}]}>
                <View
                  style={{
                    height: 160,
                    borderWidth: 3,
                    borderColor:
                      index == addInd ? appColors.primaryColor : '#cccccc',
                    borderRadius: 5,
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <View
                      style={{flexDirection: 'row', padding: 10, width: '50%'}}>
                      <FIcon
                        name={add.addressType == 'Work' ? 'briefcase' : 'home'}
                        color={appColors.primaryColor}
                        size={20}
                      />
                      <Text style={{fontWeight: 'bold'}}>
                        &nbsp;&nbsp;&nbsp;{add.addressType}
                      </Text>
                    </View>

                    <TouchableOpacity style={{padding: 10, width: '50%'}}>
                      <Text
                        onPress={() => modifyAddress(add)}
                        style={{
                          color: appColors.primaryColor,
                          textAlign: 'right',
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      padding: 10,
                    }}>
                    <View
                      style={{
                        width: '100%',
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: 13}}>
                        {add.firstName.concat(add.lastName || '')}
                        &nbsp;&nbsp;&nbsp;
                        {add.mobile}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          marginVertical: 5,
                        }}>
                        {add.addressLine1
                          .concat(`${add.addressLine2} ,`)
                          .concat(`${add.city} ,`)
                          .concat(`${add.state} ,`)
                          .concat(`${add.pinCode} .`)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: '25%',
                      borderTopWidth: 1,
                      borderColor: '#cccccc',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        paddingBottom: 10,
                        textAlign: 'center',
                        color:
                          index == addInd ? appColors.primaryColor : 'black',
                      }}>
                      Deliver to this address
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        {/* <View style={[styles.viewStyle, { marginVertical: 0 }]}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Delivery Options
          </Text>
        </View> */}
        {/* <View style={[styles.viewStyle, { marginVertical: 0, paddingTop: 0 }]}>
          {deliveryOptions.map((del, index) => {
            return (
              <TouchableOpacity
                onPress={() => setDevliveryInd(index)}
                key={index}
                style={{
                  height: 60,
                  backgroundColor: "white",
                  borderColor:
                    index == deliveryInd ? appColors.primaryColor : "#cccccc",
                  borderWidth: 3,
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text style={{ width: "50%" }}>{del.option}</Text>

                  <View
                    style={{
                      width: "50%",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        width: del.payment == "free" ? "30%" : "40%",
                        textAlign: "center",
                        backgroundColor:
                          del.payment == "free" ? "#DEF5B2" : "#B2F5EA",
                      }}
                    >
                      {del.payment == "free" ? "Free" : `RM. ${del.amount}`}
                    </Text>
                  </View>
                </View>

                <Text style={{ fontSize: 13, fontWeight: "bold", top: 5 }}>
                  By monday,24 feb
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      */}
      </View>
    );
  };

  const Address = () => {
    return (
      <View style={[styles.viewStyle, {marginVertical: 0, marginBottom: 0}]}>
        <View
          style={{
            height: 160,
            borderRadius: 5,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{flexDirection: 'row', padding: 10, width: '50%'}}>
              <FIcon
                name={
                  addressList[addInd].addressType == 'Work'
                    ? 'briefcase'
                    : 'home'
                }
                color={appColors.primaryColor}
                size={20}
              />
              <Text style={{fontWeight: 'bold'}}>
                &nbsp;&nbsp;&nbsp;{addressList[addInd].addressType}
              </Text>
            </View>

            {activeScreen == 'Cart' && (
              <TouchableOpacity style={{padding: 10, width: '50%'}}>
                <Text
                  style={{color: appColors.primaryColor, textAlign: 'right'}}>
                  Edit
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'column',
              padding: 10,
            }}>
            <View
              style={{
                width: '60%',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 13}}>
                {addressList[addInd].firstName.concat(
                  addressList[addInd].lastName || '',
                )}
                &nbsp;&nbsp;&nbsp;{addressList[addInd].mobile}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginVertical: 5,
                }}>
                {addressList[addInd].doorNo
                  .concat(`${addressList[addInd].street} ,`)
                  .concat(`${addressList[addInd].landMark} ,`)
                  .concat(`${addressList[addInd].city} ,`)
                  .concat(`${addressList[addInd].state} ,`)
                  .concat(`${addressList[addInd].pinCode} .`)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const initRazorPay = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user_details'));
    console.log((total + shipping) * 100);
    var options = {
      description: 'Mach city iBike',
      currency: 'INR',
      key: 'rzp_test_XAwbRDSItDjjI0', // Your api key
      amount: (total + shipping) * 100,
      name: 'Track and Trail',
      prefill: {
        contact: user.mobile || '9847596855',
        name: user.firstName + ' ' + user.lastName,
      },
      theme: appColors.primaryColor,
    };

    // RazorpayCheckout.open(options)
    //   .then(data => {
    //     createOrder(data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     Snackbar.show({
    //       duration: Snackbar.LENGTH_SHORT,
    //       text: 'Payment Failed, Try again...',
    //       backgroundColor: 'tomato',
    //     });
    //   });
  };
  // const createOrder = async data => {
  //   const address = addressList[addInd];
  //   const user = JSON.parse(await AsyncStorage.getItem('user_details'));
  //   const order = {
  //     addressType: address.addressType,
  //     city: address.city,
  //     discount: 0,
  //     discountAmount: 0,
  //     doorNo: address.doorNo,
  //     firstName: address.firstName,
  //     items: [
  //       {
  //         price: shoppingData.amount,
  //         quantity: shoppingData.qty,
  //         subTotal: Number(shoppingData.amount) * Number(shoppingData.qty),
  //         variantId: shoppingData.id,
  //       },
  //     ],
  //     landMark: address.landMark,
  //     lastName: address.lastName,
  //     mobile: address.mobile,
  //     paymentDeductedAmount: 0,
  //     paymentMethod: 'RazorPay payment',
  //     paymentStatus: 'Success',
  //     paymentTransactionId: data.razorpay_payment_id,
  //     pinCode: address.pinCode,
  //     state: address.state,
  //     street: address.street,
  //     taxAmount: 0,
  //     taxPercentage: 0,
  //     taxType: 'string',
  //     totalAmount: 0,
  //     user: {
  //       id: user.id,
  //     },
  //   };
  //   // const res = await ecommerce.createOrder(order);
  //   // console.log(res);

  //   // if (res) {
  //   //   Snackbar.show({
  //   //     duration: Snackbar.LENGTH_SHORT,
  //   //     text: res.msg,
  //   //     backgroundColor: '#89b64e',
  //   //   });

  //   //   if (res.extras) {
  //   //     setEarnPoints(res.extras.point.earnPoint);

  //   //     setEarnedBadges(res.extras.badge);

  //   //     setModalVisible(true);
  //   //   }

  //   //   setActiveScreen('Order');
  //   // } else {
  //   //   Snackbar.show({
  //   //     duration: Snackbar.LENGTH_SHORT,
  //   //     text: 'Network unavailable.Please check your internet connection.',
  //   //   });
  //   // }
  // };
  const sum = arr => {
    let tot = 0;
    arr.forEach((item, index) => (tot = tot + item.qty * item.amount));
    return tot;
  };

  const [total, setTotal] = useState(sum(myData));
  const [shipping, setShipping] = useState(0);

  const Payment = () => {
    return (
      <View>
        {myData.map((myData, index) => {
          return (
            <React.Fragment key={index}>
              <ModelBanner data={myData} index={index} />
            </React.Fragment>
          );
        })}
        <Address />
        <View
          style={{
            padding: 15,
            width: '91%',
            marginTop: 10,
            alignSelf: 'center',
            backgroundColor: appColors.white,
          }}>
          <RadioButton
            label="Cash on Delivery"
            checked={true}
            onChange={() => console.log('Nothing')}
            style={{marginLeft: 10}}
          />
        </View>
      </View>
    );
  };

  const [qtyAmount, setQtyAmount] = useState(null);

  const ModelBanner = ({data, index}) => {
    return (
      <View style={[styles.viewStyle, {marginLeft: 20}]}>
        {activeScreen == 'Cart' && type == 'AddCart' && (
          <TouchableOpacity
            style={{height: 30, width: '100%'}}
            onPress={() => {
              setTotal(total - data.qty * data.amount);
              let newArr = [...myData];
              newArr.splice(index, 1);
              setData([...newArr]);
            }}>
            <IonIcon
              name={'close-outline'}
              color={appColors.primaryColor}
              size={30}
              style={{alignSelf: 'flex-end'}}
            />
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 0,
            alignItems: 'center',
          }}>
          <Image
            // loadingIndicatorSource={{uri: spinnerUri}}
            style={{height: 100, width: 100}}
            source={data.img}
            resizeMode={'contain'}
          />

          <View
            style={{
              marginVertical: 20,
              marginLeft: 10,
              // flexWrap: "wrap",
              width: '60%',
              bottom: 15,
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {data.title}
            </Text>
            <Text>{data.about}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={{width: '30%'}}></View>
          <View style={{width: '30%'}}>
            <View style={{flexDirection: 'row', left: 10}}>
              <Text>Qty&nbsp;&nbsp;</Text>
              {activeScreen == 'Cart' && (
                <TouchableOpacity
                  onPress={() => {
                    if (data.qty != 1) {
                      let dec = data.qty - 1;
                      let newData = [...myData];
                      newData[index].qty = dec;
                      setData([...newData]);
                      setTotal(sum(newData));
                    }
                  }}>
                  <IonIcon
                    name={'remove-circle-outline'}
                    color={appColors.primaryColor}
                    size={20}
                  />
                </TouchableOpacity>
              )}
              <Text> {data.qty} </Text>
              {activeScreen == 'Cart' && (
                <TouchableOpacity
                  onPress={() => {
                    let inc = data.qty + 1;
                    let newData = [...myData];
                    newData[index].qty = inc;

                    setData([...newData]);
                    setTotal(sum(newData));
                  }}>
                  <IonIcon
                    name={'add-circle-outline'}
                    color={appColors.primaryColor}
                    size={20}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{width: '40%'}}>
            <Text style={{textAlign: 'right'}}>
              Amount: RM {data.qty * data.amount}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            height: 1,
            borderWidth: 1,
            borderColor: '#cccccc',
          }}
        />
        <View
          style={{
            width: '100%',
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ShopView')}
            style={{flexDirection: 'row'}}>
            <Text style={{color: appColors.primaryColor, fontSize: 14}}>
              View Details&nbsp;&nbsp;
            </Text>
            <FIcon
              name={'long-arrow-right'}
              color={appColors.primaryColor}
              size={15}
              style={{top: 2}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const OrderSuccess = () => {
    return (
      <View>
        <View style={[styles.viewStyle, {marginVertical: 10}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 30,
              backgroundColor: 'white',
            }}>
            <FIcon
              name={'check-circle'}
              color={appColors.primaryColor}
              size={20}
            />
            <Text
              style={{
                color: appColors.primaryColor,
                textTransform: 'capitalize',
              }}>
              &nbsp;&nbsp;Order placed successfully!
            </Text>
          </View>
        </View>
        <View style={[styles.viewStyle, {marginVertical: 10}]}>
          <View
            style={{
              width: '100%',
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setActiveScreen('TrackOrder')}
              style={{flexDirection: 'row'}}>
              <Text style={{color: appColors.primaryColor, fontSize: 14}}>
                Track Order&nbsp;&nbsp;
              </Text>
              <FIcon
                name={'long-arrow-right'}
                color={appColors.primaryColor}
                size={15}
                style={{top: 2}}
              />
            </TouchableOpacity>
          </View>
        </View>
        {myData.map((myData, index) => {
          return (
            <React.Fragment key={index}>
              <ModelBanner data={myData} index={index} />
            </React.Fragment>
          );
        })}

        <Address />
        <View style={[styles.viewStyle]}>
          <View style={styles.heading1}>
            <Text
              style={{
                fontWeight: 'bold',
                top: -5,
                fontSize: 16,
              }}>
              Order Summary
            </Text>
          </View>
          {console.log(total, '=-=-=-=-=-=-=-=-=-=-=-=-=-')}
          <View style={[styles.heading1, {width: '100%'}]}>
            <Text style={{width: '50%'}}>Total Price(Inc GST)</Text>
            <Text style={{width: '50%', textAlign: 'right'}}>RM.{total}</Text>
          </View>
          <View style={[styles.heading1, {width: '100%'}]}>
            <Text style={{width: '50%'}}>Estimated Screen</Text>
            <Text style={{width: '50%', textAlign: 'right'}}>
              RM.{shipping}
            </Text>
          </View>
          <View style={{height: 2, borderWidth: 1, borderColor: '#cccccc'}} />
          <View style={[styles.heading1, {width: '100%'}]}>
            <Text style={{width: '50%', fontWeight: 'bold'}}>Total</Text>
            <Text
              style={{width: '50%', textAlign: 'right', fontWeight: 'bold'}}>
              RM.{sum(myData) + shipping}
            </Text>
          </View>
        </View>
        {/**        <OurProducts />
         */}
      </View>
    );
  };

  const goBack = () => {
    if (activeScreen == 'Delivery') {
      let crt = ['Cart'];
      setCompScreens(crt);
      setActiveScreen('Cart');
    } else if (activeScreen == 'Pay') {
      let del = ['Cart', 'Delivery'];
      setCompScreens(del);
      setActiveScreen('Delivery');
    } else if (activeScreen == 'Voucher') {
      let crt = ['Cart'];
      setCompScreens(crt);
      setActiveScreen('Cart');
    } else if (activeScreen == 'Modify') {
      let del = ['Cart', 'Delivery'];
      setCompScreens(del);
      setActiveScreen('Delivery');
    } else if (activeScreen == 'TrackOrder') {
      setActiveScreen('Order');
    } else {
      props.navigation.goBack();
    }
  };

  const renderEarnPoints = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <ImageBackground
              resizeMode={'contain'}
              style={{
                height: '100%',
                width: '100%',
              }}
              source={
                {
                  // uri: jumpUri1,
                }
              }></ImageBackground>
            <View style={{bottom: '40%'}}>
              <Text
                style={{
                  color: appColors.primaryColor,
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {/* Yeh!!! */}
              </Text>
              <Text
                style={{
                  color: appColors.primaryColor,
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {earnedBadgeStatus ? 'You have won a badge' : 'You just earned'}
              </Text>
              {/*{earnedBadgeStatus ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    onLoadStart={() => {
                      setBadgeImageLoading(true);
                    }}
                    onLoadEnd={() => {
                      setBadgeImageLoading(false);
                    }}
                    source={
                      earnedBadges.image
                        ? {uri: earnedBadges.image}
                        : appImages.Badges
                    }
                    style={{
                      width: 80,
                      height: 80,
                      resizeMode: 'cover',
                      marginVertical: 12,
                      borderRadius: 80 / 2,
                    }}
                  />
                  {badgeImageLoading && (
                    <ActivityIndicator
                      size={20}
                      color={appColors.primaryColor}
                      style={{position: 'absolute'}}
                    />
                  )}
                </View>
              ) : (
                <Text
                  style={{
                    color: appColors.primaryColor,
                    fontSize: 36,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {earnPoints}
                </Text>
              )}
              <Text
                style={{
                  color: appColors.primaryColor,
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {earnedBadgeStatus ? earnedBadges.badgeName : 'points!'}
              </Text>
              {earnedBadgeStatus && (
                <Text
                  style={{
                    color: appColors.black,
                    fontSize: 16,
                    fontWeight: '900',
                    textAlign: 'center',
                    marginTop: 4,
                  }}>
                  {earnedBadges.description}
                </Text>
              )}*/}
              <TouchableOpacity
                onPress={() => {
                  earnedBadges && !earnedBadgeStatus
                    ? setEarnedBadgeStatus(true)
                    : [setEarnedBadgeStatus(false), setModalVisible(false)];
                }}
                style={{
                  alignSelf: 'center',
                  height: 50,
                  width: 200,
                  borderRadius: 10,
                  marginVertical: 50,
                  backgroundColor: appColors.primaryColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {/**<MyHeader
          goBack={goBack}
          name={
            activeScreen == "Order"
              ? "Order"
              : activeScreen == "Modify"
              ? "Modify Address"
              : activeScreen == "Voucher"
              ? "Voucher Code"
              : activeScreen == "TrackOrder"
              ? "Track Order"
              : "Shopping Cart"
          }
          cart={true}
        /> */}
        {myData.length == 0 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ShopAccess', {type: 'access'});
              }}>
              <F5Icon
                name={'cart-plus'}
                color={appColors.primaryColor}
                size={80}
              />
            </TouchableOpacity>
            <Text>Add products to your cart</Text>
          </View>
        ) : (
          <React.Fragment>
            <ScrollView>
              {activeScreen != 'Order' &&
                activeScreen != 'Modify' &&
                activeScreen != 'Voucher' &&
                activeScreen != 'TrackOrder' && (
                  <View style={[styles.viewStyle]}>
                    <View style={{flexDirection: 'row', width: WIDTH}}>
                      <View style={{width: '10%'}}>
                        <Text
                          style={{
                            left: 5,
                            color:
                              activeScreen == 'Cart'
                                ? appColors.primaryColor
                                : 'black',
                          }}>
                          Cart
                        </Text>
                      </View>
                      <View style={{width: '5%'}}>
                        <View
                          style={{
                            height: 1,
                            width: '100%',
                          }}
                        />
                      </View>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color:
                              activeScreen == 'Delivery'
                                ? appColors.primaryColor
                                : 'black',
                          }}>
                          Delivery Instruction
                        </Text>
                      </View>
                      <View style={{width: '5%'}}></View>
                      <View style={{width: '20%', right: 15}}>
                        <Text
                          style={{
                            textAlign: 'right',
                            color:
                              activeScreen == 'Pay'
                                ? appColors.primaryColor
                                : 'black',
                          }}>
                          Payment
                        </Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row', width: '100%'}}>
                      <View style={{width: '10%'}}>
                        <View
                          style={{
                            width: 25,
                            height: 25,
                            borderRadius: 12.5,
                            borderWidth: 2,
                            borderColor: appColors.primaryColor,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {compScreens.includes('Cart') && (
                            <View
                              style={{
                                width: 15,
                                height: 15,
                                borderRadius: 7.5,
                                backgroundColor: appColors.primaryColor,
                              }}></View>
                          )}
                        </View>
                      </View>
                      <View style={{width: '35%'}}>
                        <View
                          style={{
                            height: 1,
                            width: '100%',
                          }}
                        />
                        <Text
                          ellipsizeMode="clip"
                          numberOfLines={1}
                          style={{color: '#66645f'}}>
                          - - - - - - - - - - - - - - - - - - - -
                        </Text>
                      </View>
                      <View style={{width: '10%'}}>
                        <View
                          style={{
                            width: 25,
                            height: 25,
                            borderRadius: 12.5,
                            borderWidth: 2,
                            borderColor: appColors.primaryColor,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {compScreens.includes('Delivery') && (
                            <View
                              style={{
                                width: 15,
                                height: 15,
                                borderRadius: 7.5,
                                backgroundColor: appColors.primaryColor,
                              }}></View>
                          )}
                        </View>
                      </View>
                      <View style={{width: '35%'}}>
                        <Text
                          ellipsizeMode="clip"
                          numberOfLines={1}
                          style={{color: '#66645f'}}>
                          - - - - - - - - - - - - - - - - - - - -
                        </Text>
                      </View>
                      <View style={{width: '10%', right: 10}}>
                        <View
                          style={{
                            width: 25,
                            height: 25,
                            borderRadius: 12.5,
                            borderWidth: 2,
                            borderColor: appColors.primaryColor,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {compScreens.includes('Pay') && (
                            <View
                              style={{
                                width: 15,
                                height: 15,
                                borderRadius: 7.5,
                                backgroundColor: appColors.primaryColor,
                              }}></View>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              {activeScreen == 'Cart' && <CartScreen />}
              {activeScreen == 'Delivery' && <DeliveryInst />}
              {activeScreen == 'Pay' && <Payment />}
              {activeScreen == 'Order' && <OrderSuccess />}

              {activeScreen == 'Voucher' && (
                <VoucherScreen toggleScreen={() => setActiveScreen('Cart')} />
              )}
              {activeScreen == 'TrackOrder' && (
                <OrdersTracking
                  data={myData}
                  type={type}
                  total={total}
                  toggleScreen={() => setActiveScreen('Order')}
                />
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
            </ScrollView>
            {/* {activeScreen == 'Modify' && (
              <TouchableOpacity
                onPress={() => childRef.current.handleAddressSubmit()}
                style={{
                  height: 40,
                  backgroundColor: appColors.primaryColor,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  backgroundColor: appColors.primaryColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                {loading ? (
                  <ActivityIndicator color={'white'} size={'small'} />
                ) : (
                  <Text style={{fontWeight: 'bold', color: 'white'}}>Save</Text>
                )}
              </TouchableOpacity>
            )}*/}
            {activeScreen !== 'Modify' &&
              activeScreen != 'Voucher' &&
              activeScreen != 'Order' &&
              activeScreen != 'TrackOrder' && (
                <View style={styles.viewStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      if (activeScreen == 'Cart') {
                        let del = ['Cart', 'Delivery'];
                        setCompScreens(del);
                        setActiveScreen('Delivery');
                      } else if (activeScreen == 'Delivery') {
                        if (addressList.length == 0) {
                          setValidationErrors({
                            ...validationErrors,
                            address: 'Please create your delivery address',
                          });
                        } else if (addInd == undefined) {
                          setValidationErrors({
                            ...validationErrors,
                            address: 'Please choose your delivery address',
                          });
                        } else {
                          let pay = ['Cart', 'Delivery', 'Pay'];
                          setCompScreens(pay);
                          setActiveScreen('Pay');
                        }
                      } else if (activeScreen == 'Pay') {
                        // initRazorPay();
                        Snackbar.show({
                          duration: Snackbar.LENGTH_SHORT,
                          text: 'Order created successfully',
                          backgroundColor: appColors.darkGreen,
                        });
                        setActiveScreen('Order');
                      }
                    }}
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      backgroundColor: appColors.primaryColor,
                      height: 40,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 16,
                      }}>
                      {activeScreen == 'Pay'
                        ? `Pay RM.${total + shipping}`
                        : 'Proceed to Checkout'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
          </React.Fragment>
        )}
      </View>

      {modalVisible && renderEarnPoints()}
    </>
  );
};

export default ShoppingCart;
