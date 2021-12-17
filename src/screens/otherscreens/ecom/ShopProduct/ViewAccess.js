import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Image,
  Share,
} from "react-native";
import MyHeader from "../../common/MyHeader";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../styles/mixins";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/FontAwesome";
import FeaIcon from "react-native-vector-icons/Feather";
import FontisIcon from "react-native-vector-icons/Fontisto";

import _ from "lodash";

import { appImages } from "../../config";
import { Theme_Light_Green } from "../../styles/colors";
import { TextInput } from "react-native";
import { Products } from "./Products";

import { StackActions, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Snackbar from "react-native-snackbar";
import { ecommerce } from "../../api";
import { loadingUri } from "../../utils/constants";
import Firebase from "react-native-firebase";

const DOT_SIZE = 8;
const TIME = 2000;

class CarouselCycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishList: this.props.wishList.includes(this.props.id) ? true : false,
      image: [...this.props.imageList],
      currentIndex: 0,
      texttitle: [
        "CHALLENGE 2021",
        "CHALLENGE 2020",
        "CHALLENGE 2020",
        "CHALLENGE 2020",
      ],
      textdesc: [
        "21 JAN - 21 FEB",
        "21 DEC - 21 NOV",
        "21 SEP - 21 OCT",
        "21 JUL - 21 AUG",
      ],
    };
    this.scrollView = React.createRef();
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.handleScroll();
    }, TIME);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  handleScroll = () => {
    const newIndex = this.state.currentIndex + 1;

    if (newIndex < this.state.image.length) {
      this.scrollView.current.scrollTo({
        x: newIndex * WINDOW_WIDTH,
        animated: true,
      });

      this.setState({ currentIndex: newIndex });
    } else {
      this.scrollView.current.scrollTo({
        x: 0,
        animated: true,
      });
      this.setState({ currentIndex: 0 });
    }
  };
  onScroll = (event) => {
    const { contentOffset } = event.nativeEvent;

    const currentIndex = Math.round(contentOffset.x / WINDOW_WIDTH);

    if (this.state.currentIndex !== currentIndex) {
      this.setState({ currentIndex });
    }
  };
  render() {
    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={this.scrollView}
          scrollEventThrottle={15}
          onScroll={this.onScroll}
        >
          {this.state.image.map((img, i) => {
            return (
              <TouchableOpacity
                key={i.toString()}
                style={{ position: "relative" }}
              >
                <ImageBackground
                  resizeMode={"contain"}
                  style={{ width: WINDOW_WIDTH, height: 220 }}
                  source={{ uri: img }}
                >
                  <TouchableOpacity
                    onPress={() => this.props.addWishlist(this.props.id)}
                    style={{ alignItems: "flex-end", top: 20, right: 20 }}
                  >
                    <FIcon
                      name={
                        this.props.wishList.includes(this.props.id)
                          ? "heart"
                          : "heart-o"
                      }
                      color={Theme_Light_Green}
                      size={20}
                    />
                  </TouchableOpacity>
                </ImageBackground>

                <View
                  style={{
                    position: "absolute",
                    flexDirection: "row",
                    height: 200,
                    width: WINDOW_WIDTH,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    padding: 10,
                    top: 20,
                  }}
                >
                  {Array.from({ length: this.state.image.length }).map(
                    (_, index) => (
                      <View
                        key={index}
                        style={{
                          backgroundColor:
                            this.state.currentIndex === index
                              ? Theme_Light_Green
                              : "lightgrey",
                          width: DOT_SIZE,
                          height: DOT_SIZE,
                          borderRadius: DOT_SIZE,
                          margin: DOT_SIZE / 2,
                        }}
                      ></View>
                    )
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const initialValidationErrors = {
  size: false,
  color: false,
  delivery: false,
  pincode: false,
};

const ViewAccess = (props) => {
  const accessView = props.route.params.accessData;
  const [stockAvailable, setStockAvailable] = useState("");

  useEffect(() => {
    let isActive = true;
    isActive && getAccessView();
    getSimilarProducts();
    getWishList();
    return () => {
      isActive - false;
    };
  }, []);
  const [shopList, setShopList] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let isActive = true;
    isActive && getCartList();

    return () => {
      isActive = false;
    };
  }, [count]);
  const getCartList = async () => {
    let shoppingList = JSON.parse(await AsyncStorage.getItem("cartList"));
    shoppingList.forEach((element) => {
      element.img = element.variant.image1;
      element.title = element.variant.product.productName;
      element.qty = element.variant.quantity;
      element.amount = Number(element.variant.price);
      element.estimated = 1200;
      element.type = null;
    });
    setShopList(shoppingList);
  };

  const checkAvailability = async () => {
    if (_.isEmpty(pincode)) {
      setValidationErrors({
        ...validationErrors,
        pincode: "Please enter pincode to check availability",
      });
    } else if (pincode.length != 6) {
      setValidationErrors({
        ...validationErrors,
        pincode: "Please enter valid pincode",
      });
    } else {
      const response = await ecommerce.getProductAvailability(
        viewData.productTypeId,
        pincode
      );
      setStockAvailable(Boolean(response));
    }
  };
  const getAccessView = async () => {
    const response = await ecommerce.getVariantById(accessView.id);
    !response &&
      (setviewData(null),
      Snackbar.show({
        text: "Network error!Please check you internet connection and try again later",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      }));
    const resp = await ecommerce.getReviews(accessView.id);

    let data = response.responseContent;
    setviewData({
      img: data.image1,
      title: data.variantName,
      disAmount: data.discountAmount,
      orgAmount: data.price,
      off: data.discountPercentage,
      rating: data.averageRating,
      wishList: wishList,
      specifications: data.variantSpec,
      reviews: _.isEmpty(data.averageRating) ? [] : data.averageRating,
      about: data.description,
      std_delivery: "4-5",
      store_delivery: "3-5",
      date: "15 Feb 2021",
      image1: data.image1,
      image2: data.image2,
      image3: data.image3,
      image4: data.image4,
      image5: data.image5,
      quantity: data.quantity,
      id: data.id,
      productUrl: data.productUrl,
    });
  };
  const [count, setCount] = useState(0);
  const [viewData, setviewData] = useState(
    props.route.params.accessShopData ? props.route.params.accessShopData : null
  );
  const route = {
    params: {
      type: props.route.params.type,
    },
  };

  //checking availability
  const [pincode, setPincode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");

  //sizeCard
  const [sizeInd, setSizeInd] = useState(undefined);

  const [specifications, setSpecifications] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [activeScreen, setActiveScreen] = useState("View");
  const [wishList, setWishList] = useState([]);
  const [wishListPair, setWishListPair] = useState([]);

  //color card
  const [colorInd, setColorInd] = useState(undefined);

  //Data
  const [productData, setProductData] = useState([]);

  //validations
  const [validationErrors, setValidationErrors] = useState({
    ...initialValidationErrors,
  });

  const getSimilarProducts = async () => {
    const res = await ecommerce.getSimilarProducts(3, accessView.id);
    if (res.responseContent) {
      setProductData(res.responseContent);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      AsyncStorage.getItem("count").then((value) => {
        !_.isNull(value) && setCount(JSON.parse(value));
      });

      return () => {
        isActive = false;
      };
    }, [count])
  );

  const getStockAvailability = () => (
    <View style={{ flexDirection: "row", marginTop: 20 }}>
      <View
        style={{
          flexDirection: "column",
          width: "65%",
          marginLeft: 8,
        }}
      >
        {!_.isBoolean(stockAvailable) ? null : stockAvailable ? (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              marginBottom: 5,
              color: Theme_Light_Green,
            }}
          >
            Product available in stock
          </Text>
        ) : (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              marginBottom: 5,
              color: "red",
            }}
          >
            Product not available to buy
          </Text>
        )}
        {!_.isEmpty(deliveryDays) && (
          <>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              Standard Delivery
            </Text>
            <Text style={{ flexWrap: "wrap", fontSize: 12 }}>
              Standard Delivery i.e {deliveryDays}
              Days
            </Text>
          </>
        )}
      </View>
      <View style={{ width: "35%", flexDirection: "column", right: 20 }}>
        <Text
          style={{
            color: Theme_Light_Green,
            top: 5,
            fontWeight: "bold",
            textAlign: "right",
            marginTop: 10,
            fontSize: 14,
          }}
        >
          {!_.isEmpty(deliveryDate) && deliveryDate}
        </Text>
      </View>
      <View style={{ width: "10%" }} />
    </View>
  );

  const shopHeader = () => {
    let name = "";
    switch (props.route.params.type) {
      case "access":
        name = "accessories";
        break;
      default:
        name = "";
        break;
    }
    return (
      <MyHeader
        {...props}
        onShare={handleShortLinkGeneration}
        shopList={shopList}
        count={count}
        viewData={viewData}
        name={name}
        share={true}
        navigation={props.navigation}
        type={props.route.params.type}
      />
    );
  };

  const addWishlist = async (variantId) => {
    let user = await AsyncStorage.getItem("user_details");
    user = JSON.parse(user);
    if (wishList.includes(variantId)) {
      const wid = wishListPair.find((e) => e.variantId == variantId);
      const response = await ecommerce.deleteWhisList(wid.whislistId);
      if (response.errorCode == 200) {
        if (res.errorCode == 200) {
          getWishList(cycleData);
          Snackbar.show({
            text: "Product removed from your Wishlist",
            backgroundColor: "red",
            length: Snackbar.LENGTH_SHORT,
          });
        }
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
          text: "Your product is saved to Wishlist",
          backgroundColor: Theme_Light_Green,
          length: Snackbar.LENGTH_SHORT,
        });
      }
    }
    getWishList();
  };
  const getWishList = async () => {
    let user = await AsyncStorage.getItem("user_details");
    user = JSON.parse(user);
    const res = await ecommerce.getUserWishList(user.id);
    const result = res.responseContent || [];
    const whislist = await result.map((obj) => obj.variant.id);
    const whislistnew = await result.map((obj) => {
      let temp = {
        whislistId: obj.id,
        variantId: obj.variant.id,
      };
      return temp;
    });
    setWishListPair(whislistnew);
    setWishList(whislist);
  };

  const generateDeliveryDate = () => {
    setDeliveryDate("15 Jun 2021");
    setDeliveryDays("4-5");
  };

  const Specifications = ({ item }) => {
    return (
      <React.Fragment>
        {viewData.specifications.map((spec, index) => {
          return (
            <View
              key={index}
              style={{
                marginVertical: 10,
                flexDirection: "row",
                width: "100%",
              }}
            >
              <View style={{ width: "35%" }}>
                <Text key={index} style={{ fontWeight: "bold", fontSize: 14 }}>
                  {spec.specKey}
                </Text>
              </View>
              <View style={{ width: "65%" }}>
                <Text key={index} style={{ fontSize: 14, textAlign: "right" }}>
                  {spec.specValue}
                </Text>
              </View>
            </View>
          );
        })}
      </React.Fragment>
    );
  };

  const Reviews = ({ item }) => {
    console.log(viewData.reviews);
    return (
      <React.Fragment>
        {!Boolean(viewData.reviews) ||
          (viewData.reviews.length == 0 && (
            <View
              style={[
                styles.heading1,
                { alignItems: "center", justifyContent: "center" },
              ]}
            >
              <Text>No reviews yet</Text>
            </View>
          ))}
        {viewData.reviews &&
          viewData.reviews.length != 0 &&
          viewData.reviews.map((rev, index) => {
            return (
              <View style={styles.heading1} key={index}>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {rev.name}
                  </Text>
                  <Text style={{ fontSize: 16, paddingVertical: 10 }}>
                    {rev.comment}
                  </Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Rating
                    color={Theme_Light_Green}
                    rating={rev.ratingStar ? String(rev.ratingStar) : "0.0"}
                  />
                </View>
              </View>
            );
          })}
      </React.Fragment>
    );
  };

  const ColorCard = () => {
    return (
      <View
        style={{
          flexDirection: "row-reverse",
          alignSelf: "flex-end",
          width: "90%",
          top: 5,
        }}
      >
        {viewData.colors.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setColorInd(index);
              setValidationErrors({ ...validationErrors, color: false });
            }}
            style={{
              width: 25,
              height: 25,
              backgroundColor: index == colorInd ? "#B9e8dd" : "transparent",
              marginLeft: 5,
              padding: 2,
              alignSelf: "center",
            }}
            key={index}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: item,
                alignSelf: "center",
              }}
            ></View>
            <Text>&nbsp;&nbsp;</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const SizeCard = ({ sizeInd, setSizeInd, data }) => {
    return (
      <View style={{ flexDirection: "row", paddingVertical: 5 }}>
        {data.sizes.map((item, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              onPress={() => {
                setSizeInd(index);
                setValidationErrors({ ...validationErrors, size: false });
              }}
              style={[
                styles.sizeCard,
                {
                  backgroundColor:
                    index == sizeInd ? Theme_Light_Green : "white",
                },
              ]}
            >
              <Text
                style={{ flexWrap: "wrap", fontSize: 12, fontWeight: "bold" }}
              >
                {item}
              </Text>
            </TouchableOpacity>
            <Text>&nbsp;&nbsp;</Text>
          </React.Fragment>
        ))}
      </View>
    );
  };

  const handleSubmit = async () => {
    let wholeData = validateFields();
    console.log(wholeData);

    if (
      props.route.params.type != "equipment" &&
      props.route.params.type != "access" &&
      Object.values(wholeData).every((v) => v == null)
    ) {
      Snackbar.show({
        text: "Please recheck the given informations!",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      });
    } else if (!_.isBoolean(stockAvailable)) {
      Snackbar.show({
        text: "Please check the product availability with pincode!",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      });
    } else if (!stockAvailable) {
      Snackbar.show({
        text: "Product not available to buy!",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      });
    } else {
      console.log("Okay");
      const address = await AsyncStorage.getItem("addressList");
      console.log(_.isNull(address) ? [] : address);
      props.navigation.navigate("ShoppingCart", {
        type: props.route.params.type,
        addressList: _.isNull(address) ? [] : address,
        data: viewData,
      });
    }
  };

  const addToCart = async () => {
    let user = JSON.parse(await AsyncStorage.getItem("user_details"));
    let data = {
      quantity: viewData.quantity,
      user: {
        id: user.id,
      },
      variant: {
        id: viewData.id,
      },
    };
    if (!_.isBoolean(stockAvailable)) {
      Snackbar.show({
        text: "Please check the product availability with pincode!",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      });
    } else if (!stockAvailable) {
      Snackbar.show({
        text: "Product not available to buy!",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      });
    } else {
      setLoading(true);
      const res = await ecommerce.addToCartSave(data);
      await ecommerce.getAddToCart(user.id);
      if (res) {
        getCartList();
        setCount(count + 1);
        Snackbar.show({
          text: "Product added to cart successfully!",
          backgroundColor: Theme_Light_Green,
          length: Snackbar.LENGTH_SHORT,
        });
      } else {
        setCount(count);
        Snackbar.show({
          text: "This product already added to your cart!",
          backgroundColor: "red",
          length: Snackbar.LENGTH_SHORT,
        });
      }

      setLoading(false);
    }
  };

  const validateFields = () => {
    let errors = validationErrors;
    let myData = {};
    if (_.isUndefined(sizeInd)) {
      errors.size = "Please choose any one size";
      myData = {};
    } else {
      myData.size = viewData.sizes[sizeInd];
    }
    if (_.isUndefined(colorInd)) {
      errors.color = "Please choose any one colour";
      myData = {};
    } else {
      myData.color = viewData.colors[colorInd];
    }
    setValidationErrors({ ...validationErrors, errors });
    return myData;
  };

  const Features = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ width: 130 }}>
          <View style={styles.featureCard}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", width: "70%" }}>
                <Text>Wheels</Text>
                <Text>27.5</Text>
              </View>

              <Image
                resizeMode={"contain"}
                source={appImages.Wheel}
                style={{
                  height: 30,
                  width: 30,
                  padding: 5,
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ marginLeft: 10, width: 130 }}>
          <View style={styles.featureCard}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", width: "70%" }}>
                <Text>Frame</Text>
                <Text>Di-frame</Text>
              </View>
              <Image
                resizeMode={"contain"}
                source={appImages.Bar}
                style={{
                  height: 30,
                  width: 30,
                  padding: 5,
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ marginLeft: 10, width: 130 }}>
          <View style={styles.featureCard}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", width: "70%" }}>
                <Text>Brakes</Text>
                <Text>Disk</Text>
              </View>
              <Image
                resizeMode={"contain"}
                source={appImages.CycGroup}
                style={{
                  height: 30,
                  width: 30,
                  padding: 5,
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ marginLeft: 10, width: 130 }}>
          <View style={styles.featureCard}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", width: "70%" }}>
                <Text>Seat</Text>
                <Text>Soft</Text>
              </View>
              <Image
                resizeMode={"contain"}
                source={appImages.Seat}
                style={{
                  height: 30,
                  width: 30,
                  padding: 5,
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ marginLeft: 10, width: 130 }}>
          <View style={styles.featureCard}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "70%" }}>
                  <Text>Suspension</Text>
                  <Text>Shimano</Text>
                </View>
                <Image
                  resizeMode={"contain"}
                  source={appImages.Susp}
                  style={{
                    height: 30,
                    width: 30,
                    padding: 5,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  const Rating = ({ rating, color }) => {
    let full = Number(rating.split(".")[0]);
    let half =
      Number(rating.split(".")[1]) == 0 || _.isNaN(Number(rating.split(".")[1]))
        ? false
        : true;
    let empty = Math.floor(5 - Number(rating));

    return (
      <View style={{ flexDirection: "row", bottom: 10 }}>
        {full == 0 &&
          [...Array(5)].map((emp, index) => (
            <MIcon
              name={"star-outline"}
              key={index}
              color={"#8f8f8b"}
              size={25}
              style={{ top: 2 }}
            />
          ))}
        {full != 0 &&
          full <= 5 &&
          Math.sign(full) != -1 &&
          [...Array(full)].map((elementInArray, index) => (
            <MIcon
              key={index}
              name={"star"}
              color={color ? color : "#FFC107"}
              size={25}
              style={{ top: 2 }}
            />
          ))}
        {full <= 5 && empty <= 5 && half && (
          <Image
            resizeMode={"contain"}
            source={color ? appImages.HGStar : appImages.HStar}
            style={{
              top: 2,
              height: 24,
              width: 23,
            }}
          />
        )}
        {empty != 0 &&
          empty < 5 &&
          Math.sign(empty) != -1 &&
          [...Array(empty)].map((emp, index) => (
            <MIcon
              name={"star-outline"}
              key={index}
              color={"#8f8f8b"}
              size={25}
              style={{ top: 2 }}
            />
          ))}
      </View>
    );
  };

  const handleShortLinkGeneration = async () => {
    const link = await new Firebase.links.DynamicLink(
      `https://www.trackandtrail.in?viewId=${viewData?.id}`,
      "https://trackandtrail.page.link"
    );

    console.log("ACCESSORIES LINK::: ", link);

    Firebase.links()
      .createShortDynamicLink(link, "SHORT")
      .then((shortLinkURL) => {
        console.log("ACCESSORIES SHORT LINK URL::: ", shortLinkURL);

        handleShare(shortLinkURL);
      })
      .catch((error) => {
        console.log("ACCESSORIES SHORT LINK GENERATION ERROR::: ", error);

        Snackbar.show({
          text: "Failed to generate short link for accessories!",
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  const handleShare = async (shortLinkURL) => {
    const userDetails = JSON.parse(await AsyncStorage.getItem("user_details"));

    Share.share({
      message: `Check out ${userDetails.firstName.concat(
        userDetails.lastName ? userDetails.lastName : ""
      )} has shared '${
        viewData.title
      }' accessory from Track and Trail\n${shortLinkURL}`,
    })
      .then(() => {
        console.log("The accessories link has been shared successfully!");
      })
      .catch((error) => {
        console.log("ACCESSORIES SHARE ERROR::: ", error);

        Snackbar.show({
          text: "Failed to share the accessories link!",
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  return (
    <View style={styles.container}>
      {activeScreen == "View" && shopHeader()}
      {Boolean(viewData) ? (
        <React.Fragment>
          <ScrollView>
            <View style={styles.imageCard}>
              <CarouselCycle
                addWishlist={addWishlist}
                wishList={wishList}
                image={viewData.img}
                id={accessView.id}
                imageList={[
                  viewData.image1,
                  viewData.image2,
                  viewData.image3,
                  viewData.image4,
                  viewData.image5,
                ]}
              />
            </View>
            <View style={styles.viewStyle}>
              <View style={[styles.heading1]}>
                <View
                  style={{
                    width: "65%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      flexWrap: "wrap",
                    }}
                  >
                    {viewData.title}
                  </Text>
                </View>

                <View style={{ width: "35%", top: 5, alignItems: "flex-end" }}>
                  <Rating
                    color={Theme_Light_Green}
                    rating={viewData.rating ? String(viewData.rating) : "0.0"}
                  />
                </View>
              </View>

              <View style={[styles.heading1, { marginVertical: 0 }]}>
                <Text style={{ fontSize: 16 }}>
                  Rs. {viewData.off ? viewData.disAmount : viewData.orgAmount}{" "}
                  &nbsp;&nbsp;
                  {viewData.off && (
                    <React.Fragment>
                      <Text
                        style={{
                          textDecorationLine: "line-through",
                          color: "#7f7a73",
                        }}
                      >
                        Rs. {viewData.orgAmount}
                      </Text>{" "}
                      &nbsp;&nbsp;
                      <Text
                        style={{
                          backgroundColor: `#97ea5a`,
                          height: 30,
                          width: "10%",
                          color: "black",
                        }}
                      >
                        {viewData.off} Offer
                      </Text>
                    </React.Fragment>
                  )}
                </Text>
              </View>
            </View>
            <View style={[styles.viewStyle, { marginVertical: 0 }]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    width: "65%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      flexWrap: "wrap",
                    }}
                  >
                    Delivery Options
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      width: "100%",
                    }}
                  >
                    <TextInput
                      style={[styles.checkInput, { width: "75%" }]}
                      value={pincode}
                      onChangeText={(text) => {
                        setPincode(text);
                        setDeliveryDate("");
                        setDeliveryDays("");
                        setValidationErrors({
                          ...validationErrors,
                          pincode: false,
                        });
                      }}
                      placeholder={"Enter your pincode here"}
                    />
                    <TouchableOpacity
                      onPress={checkAvailability}
                      style={[styles.checkBtn, { width: "25%" }]}
                    >
                      <Text style={{ color: "white" }}>Check</Text>
                    </TouchableOpacity>
                  </View>
                  {validationErrors.pincode && (
                    <Text style={{ color: "red" }}>
                      {validationErrors.pincode}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    width: "35%",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => (setStockAvailable(""), setPincode(""))}
                  >
                    <Text style={{ fontSize: 13, marginTop: 10 }}>
                      Check Availability
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: Theme_Light_Green,
                        top: 5,
                        textAlign: "right",
                        fontSize: 12,
                      }}
                    >
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {getStockAvailability()}
            </View>

            <View style={[styles.viewStyle, { marginVertical: 0 }]}>
              <View style={styles.heading1}>
                <View
                  style={{
                    flexDirection: "column",
                    right: 5,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    About the Product
                  </Text>
                  <Text style={{ fontSize: 14, top: 10, textAlign: "justify" }}>
                    {viewData.about}
                  </Text>
                </View>
              </View>
              {viewData.specifications.length != 0 && (
                <React.Fragment>
                  <View style={[styles.heading1, { width: "100%" }]}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        Specifications
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        width: "45%",
                      }}
                      onPress={() => setSpecifications(!specifications)}
                    >
                      <appImages.arrowright width={25} height={25} />
                    </TouchableOpacity>
                    <View style={{ width: "5%" }} />
                  </View>
                  {specifications && <Specifications />}
                </React.Fragment>
              )}

              <View
                style={{ height: 2, borderWidth: 1, borderColor: "#cccccc" }}
              />
              <View style={styles.heading1}>
                <View
                  style={{
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Reviews
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    width: "45%",
                  }}
                  onPress={() => setReviews(!reviews)}
                >
                  <appImages.arrowright width={25} height={25} />
                </TouchableOpacity>
                <View style={{ width: "5%" }} />
              </View>
              {reviews && viewData && viewData.reviews && <Reviews />}
            </View>
            <View style={[styles.viewStyle, { marginVertical: 0 }]}>
              <View style={styles.heading1}>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Similar Products
                  </Text>
                </View>
                <View style={{ flexDirection: "column", right: 20 }}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("ShopAccess", {
                        type: props.route.params.type,
                      })
                    }
                  >
                    <Text
                      style={{
                        alignSelf: "flex-end",
                        fontWeight: "bold",
                        fontSize: 12,
                        color: Theme_Light_Green,
                      }}
                    >
                      View all
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginLeft: -15 }}>
                <Products {...props} data={productData} />
              </View>
            </View>
          </ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={addToCart}
              style={{
                width: "50%",
                height: 60,
                borderWidth: 1,
                borderTopWidth: 2,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#cccccc",
                flexDirection: "row",
              }}
            >
              {loading ? (
                <ActivityIndicator size={"small"} color={Theme_Light_Green} />
              ) : (
                <React.Fragment>
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      tintColor: Theme_Light_Green,
                    }}
                    source={appImages.Shop1}
                  ></Image>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: Theme_Light_Green,
                    }}
                  >
                    &nbsp;&nbsp;Add to cart
                  </Text>
                </React.Fragment>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                width: "50%",
                height: 60,
                borderRightWidth: 1,
                borderTopWidth: 2,
                borderBottomWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#cccccc",
                flexDirection: "row",
              }}
            >
              <FontisIcon
                name={"shopping-bag-1"}
                color={Theme_Light_Green}
                size={30}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: Theme_Light_Green,
                }}
              >
                &nbsp;&nbsp;Buy now
              </Text>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            resizeMode={"contain"}
            style={{ height: 100, width: 100 }}
            source={{
              uri: loadingUri,
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageCard: {
    height: 220,
    width: WINDOW_WIDTH,
    backgroundColor: "white",
  },

  heading1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  viewStyle: {
    backgroundColor: "white",
    marginRight: 20,
    marginVertical: 20,
    marginLeft: 15,
    padding: 10,
    marginBottom: 10,
    // width: WINDOW_WIDTH,
  },
  storeBtn: {
    width: "100%",
    height: 30,
    backgroundColor: Theme_Light_Green,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  sizeCard: {
    height: 30,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#9e9e9e",
    borderRadius: 5,
  },
  featureCard: {
    height: 60,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 5,
    backgroundColor: "white",
  },
  checkInput: {
    width: 150,
    height: 30,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderColor: Theme_Light_Green,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: 0,
    paddingBottom: 0,
    textAlignVertical: "top",
  },
  checkBtn: {
    width: "25%",
    backgroundColor: Theme_Light_Green,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    height: 30,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderColor: Theme_Light_Green,
  },
});

export default ViewAccess;
