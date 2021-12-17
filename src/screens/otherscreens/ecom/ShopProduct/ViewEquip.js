import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Share,
  ActivityIndicator,
} from "react-native";
import MyHeader from "../../common/MyHeader";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../styles/mixins";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/FontAwesome";
import FeaIcon from "react-native-vector-icons/Feather";
import FontisIcon from "react-native-vector-icons/Fontisto";
import { loadingUri } from "../../utils/constants";

import _ from "lodash";

import { appImages } from "../../config";
import { Theme_Light_Green } from "../../styles/colors";
import { TextInput } from "react-native";
import { Products } from "./Products";
import { ecommerce } from "../../api/Ecommerce.service";

import { StackActions, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Snackbar from "react-native-snackbar";
import Firebase from "react-native-firebase";

const DOT_SIZE = 8;
const TIME = 2000;

class CarouselCycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishList: false,
      image: this.props.image,
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
          {this.state.image.map((img, i) => (
            <TouchableOpacity
              key={i.toString()}
              style={{ position: "relative" }}
            >
              <ImageBackground
                resizeMode={"contain"}
                style={{ width: WINDOW_WIDTH, height: 220 }}
                source={img ? { uri: img } : appImages.equip}
              >
                <TouchableOpacity
                  onPress={() => this.props.addRemove()}
                  style={{ alignItems: "flex-end", top: 20, right: 20 }}
                >
                  <FIcon
                    name={this.props.wishList ? "heart" : "heart-o"}
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
          ))}
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

const ViewEquip = (props) => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [wishList, setWishList] = useState([]);
  const [wishListPair, setWishListPair] = useState([]);
  const [viewData, setviewData] = useState({
    img: appImages.equip,
    title: "EL 54",
    disAmount: "1241",
    orgAmount: "1297",
    off: "40%",
    rating: 4.0,
    wishList: 1,
    specifications: [
      {
        name: "Equipment Type",
        desc: "ELLIPTICALS",
      },
      { name: "Warranty", desc: "24 Months" },
      { name: "Technical Feature", desc: "Upper and Lower Body." },
      { name: "Control", desc: "Auto Magnetic Resistance Control" },
      { name: "Fly Wheel Weight", desc: "6 Kgs.Fly Wheel" },
      {
        name: "Fitness Features",
        desc: "Single Window Display-Time,Distance,Speed,Calarie & Pulse",
      },
      { name: "Sensor", desc: "Hand Held Heart Rate Sensor" },
      { name: "Gross Weight", desc: "Maximum User Weight:120 Kgs" },
      {
        name: "Key functions",
        desc: "Targets Upper and Lower Body",
      },
      {
        name: "Handlebars",
        desc: "Fixed and Movable Handlebars",
      },
      { name: "Pedal", desc: "Large Anti-skid Pedal" },
      { name: "Rollers", desc: "Friction free Rollwers" },

      { name: "Wheel", desc: "Transportation wheels" },
    ],
    reviews: [
      {
        name: "Ram Kumar",
        rating: "4.5",
        desc: "The Equipment is awesome",
      },
      { name: "Akash", rating: "4.0", desc: "Nice Equipment" },
      {
        name: "BenJohn",
        rating: "3.5",
        desc: "Interesting and nice one",
      },
    ],
    about: `Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.`,
    std_delivery: "4-5",
    store_delivery: "3-5",
    date: "15 Feb 2021",
  });
  const route = {
    params: {
      type: props.route.params.type,
    },
  };
  const addWishlist = async () => {
    const variantId = props.route.params.productId;
    let user = await AsyncStorage.getItem("user_details");
    user = JSON.parse(user);
    if (wishList.includes(variantId)) {
      const wid = wishListPair.find((e) => e.variantId == variantId);
      const response = await ecommerce.deleteWhisList(wid.whislistId);
      if (res.errorCode == 200) {
        getWishList();
        Snackbar.show({
          text: "Product removed from your Wishlist",
          backgroundColor: "red",
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
          text: "Your product is saved to Wishlist",
          backgroundColor: Theme_Light_Green,
          length: Snackbar.LENGTH_SHORT,
        });
      }
    }
  };

  //checking availability
  const [stockAvailable, setStockAvailable] = useState("");

  const [pincode, setPincode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");

  //sizeCard
  const [sizeInd, setSizeInd] = useState(undefined);

  const [specifications, setSpecifications] = useState(false);
  const [specificationList, setSpecificationList] = useState([]);
  const [reviews, setReviews] = useState(false);
  const [activeScreen, setActiveScreen] = useState("View");

  //color card
  const [colorInd, setColorInd] = useState(undefined);

  //Data
  const [productData, setProductData] = useState([]);
  const [images, setimages] = useState([]);

  //validations
  const [validationErrors, setValidationErrors] = useState({
    ...initialValidationErrors,
  });

  const [shopList, setShopList] = useState(null);
  const [shoploading, setShopLoading] = useState(false);

  useEffect(() => {
    let isActive = true;
    isActive && getCartList();
    return () => {
      isActive = false;
    };
  }, [count]);

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
          {/* {viewData.date} */}
        </Text>
      </View>
      <View style={{ width: "10%" }} />
    </View>
  );

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

  const goBack = () => {
    if (activeScreen == "Filter") {
      setActiveScreen("List");
    } else {
      props.navigation.goBack();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      getProductView();
      getSimilarProducts();
      AsyncStorage.getItem("count").then((value) => {
        !_.isNull(value) && setCount(JSON.parse(value));
      });

      return () => {
        isActive = false;
      };
    }, [count])
  );

  const getProductView = async () => {
    setLoading(true);
    let product = await ecommerce.getVariantById(props.route.params.productId);
    !product &&
      (setData([]),
      Snackbar.show({
        text: "Network error!Please check you internet connection and try again later",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      }));
    setData(product.responseContent);
    setSpecificationList(product.responseContent.variantSpec);
    product = product.responseContent;
    let image = [];
    for (let i = 1; i <= 4; i++) {
      image.push(product[`image${i}`]);
    }
    setimages([...image]);
    setLoading(false);
  };

  const getSimilarProducts = async () => {
    const res = await ecommerce.getSimilarProducts(
      2,
      props.route.params.productId
    );
    if (res.responseContent) {
      setProductData(res.responseContent);
    }
    console.log(res);
  };

  const shopHeader = () => {
    let name = "";
    switch (props.route.params.type) {
      case "equipment":
        name = "fitness equipments";
        break;

      default:
        name = "";
        break;
    }
    return (
      <MyHeader
        onShare={handleShortLinkGeneration}
        shopList={shopList}
        count={count}
        name="fitness equipments"
        share={true}
        navigation={props.navigation}
        type={props.route.params.type}
      />
    );
  };

  const generateDeliveryDate = () => {
    setDeliveryDate("15 Jun 2021");
    setDeliveryDays("4-5");
  };

  const Specifications = ({ item }) => {
    return (
      <React.Fragment>
        {specificationList.map((spec, index) => {
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

  const handleSubmit = async () => {
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
      console.log("Okay");

      const address = await AsyncStorage.getItem("addressList");
      props.navigation.navigate("ShoppingCart", {
        type: "equipment",
        addressList: _.isNull(address) ? [] : address,
        data: {
          id: data.id,
          title: data.product.productName,
          amount: data.discountAmount || data.price,
          img: data.image1,
          qty: 1,
        },
      });
    }
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
      `https://www.trackandtrail.in?viewId=${data?.id}`,
      "https://trackandtrail.page.link"
    );

    console.log("EQUIPMENT LINK::: ", link);

    Firebase.links()
      .createShortDynamicLink(link, "SHORT")
      .then((shortLinkURL) => {
        console.log("EQUIPMENT SHORT LINK URL::: ", shortLinkURL);

        handleShare(shortLinkURL);
      })
      .catch((error) => {
        console.log("EQUIPMENT SHORT LINK GENERATION ERROR::: ", error);

        Snackbar.show({
          text: "Failed to generate short link for equipment!",
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
        data.product.productName
      }' fitness equipment from Track and Trail\n${shortLinkURL}`,
    })
      .then(() => {
        console.log("The equipment link has been shared successfully!");
      })
      .catch((error) => {
        console.log("EQUIPMENT SHARE ERROR::: ", error);

        Snackbar.show({
          text: "Failed to share the equipment link!",
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  return (
    <View style={styles.container}>
      {activeScreen == "View" && shopHeader()}

      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50%",
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
      ) : (
        <ScrollView>
          <View style={styles.imageCard}>
            <CarouselCycle
              image={images}
              wishList={wishList.includes(props.route.params.productId)}
              addRemove={addWishlist}
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
                  {data.product.productName}
                </Text>
              </View>

              <View style={{ width: "35%", top: 5, alignItems: "flex-end" }}>
                <Rating
                  rating={
                    data.averageRating ? String(data.averageRating) : "0.1"
                  }
                />
              </View>
            </View>
            <View style={[styles.heading1, { marginVertical: 0 }]}>
              <Text style={{ fontSize: 16 }}>
                Rs. {data.discountAmount || data.price} &nbsp;&nbsp;
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    color: "#7f7a73",
                  }}
                >
                  Rs. {data.price || 0}
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
                  {data.discountPercentage || 0} Offer
                </Text>
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
                <Text></Text>
                <Text style={{ fontSize: 13, marginTop: 10 }}>
                  Check Availability
                </Text>
                <TouchableOpacity
                  onPress={() => (setStockAvailable(""), setPincode(""))}
                >
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
                <Text style={{ fontSize: 14, top: 10 }}>
                  {data.description}
                </Text>
              </View>
            </View>
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
                    props.navigation.navigate("ShopEquip", {
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
              <Products
                data={productData}
                onShopPress={() => {
                  props.navigation.dispatch(
                    StackActions.replace("ShoppingCart", {
                      type: props.route.params.type,
                    })
                  );
                }}
                onPress={() => {
                  props.navigation.dispatch(
                    StackActions.replace("ViewEquip", {
                      type: props.route.params.type,
                    })
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      )}

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
          {shoploading ? (
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

export default ViewEquip;
