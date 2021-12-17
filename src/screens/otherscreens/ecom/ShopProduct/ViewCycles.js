import React, { useState, useEffect } from "react";
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
  Modal,
} from "react-native";
import { RadioButton } from "react-native-paper";

import MyHeader from "../../common/MyHeader";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../styles/mixins";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/FontAwesome";
import FeaIcon from "react-native-vector-icons/Feather";
import FontisIcon from "react-native-vector-icons/Fontisto";

import _ from "lodash";
import nameToColor from "name-to-color";

import { appImages } from "../../config";
import { Theme_Light_Green } from "../../styles/colors";
import { TextInput } from "react-native";
import { Products } from "./Products";

import { StackActions, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Snackbar from "react-native-snackbar";
import { loadingUri } from "../../utils/constants";
import { ecommerce } from "../../api";
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
          {this.props.imageList.map((img, i) => (
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

const ViewCycles = (props) => {
  const cycleView = props.route.params.cycleData;
  const [count, setCount] = useState(0);
  const [viewData, setviewData] = useState(
    props.route.params.accessShopData ? props.route.params.accessShopData : null
  );
  const [shopList, setShopList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  const getSimilarProducts = async () => {
    const res = await ecommerce.getSimilarProducts(1, cycleView.id);
    if (res.responseContent) {
      setProductData(res.responseContent);
    }
    console.log(res);
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
  useEffect(() => {
    let isActive = true;
    isActive && getCycleView();
    getWishList();
    return () => {
      isActive - false;
    };
  }, [wishList, colorInd, sizeInd]);

  const getCycleView = async () => {
    const userId = JSON.parse(await AsyncStorage.getItem("user_details")).id;

    const response = await ecommerce.getVariantById(cycleView.id);
    !response &&
      (setviewData(null),
      Snackbar.show({
        text: "Network error!Please check you internet connection and try again later",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      }));
    const resp = await ecommerce.getReviews(cycleView.id);
    getSimilarProducts();
    let data = response.responseContent;
    setviewData({
      img: data.image1,
      title: data.product.productName,
      disAmount: data.discountAmount,
      orgAmount: data.price,
      off: data.discountPercentage,
      rating: data.averageRating,
      wishList: 1,
      specifications: data.variantSpec ? data.variantSpec : [],
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
      colors: data.colors,
      sizes: data.size,
      productUrl: data.productUrl,
      productTypeId: data.product.id,
    });
    let colInd = data.colors.findIndex((x) => x.id === data.colorTermId.id);
    let sizInd = data.size.findIndex((x) => x.id === data.sizeTermId.id);

    setColorInd(colInd);
    setSizeInd(sizInd);
  };

  const getVariance = async (productId, sizeId, colorId) => {
    setColorModal(false);
    const resp = await ecommerce.getShopCyclesByColor(
      productId,
      sizeId,
      colorId
    );
    if (resp) {
      if (resp.responseContent) {
        let data = resp.responseContent;
        setviewData({
          img: data.image1,
          productUrl: data.productUrl,
          title: data.product.productName,
          disAmount: data.discountAmount,
          orgAmount: data.price,
          off: data.discountPercentage,
          rating: data.averageRating,
          wishList: 1,
          specifications: data.variantSpec ? data.variantSpec : [],
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
          colors: data.colors,
          sizes: data.size,
          productTypeId: data.product.id,
        });

        let colInd = data.colors.findIndex((x) => x.id === data.colorTermId.id);
        let sizInd = data.size.findIndex((x) => x.id === data.sizeTermId.id);

        setColorInd(colInd);
        setSizeInd(sizInd);
      } else {
        Snackbar.show({
          text: "No variance available for this size and color!",
          backgroundColor: "red",
          length: Snackbar.LENGTH_SHORT,
        });
      }
    } else {
      Snackbar.show({
        text: "No variance available for this size and color!",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const [address, setAddress] = useState([]);
  const route = {
    params: {
      type: props.route.params.type,
    },
  };

  const [pincode, setPincode] = useState("");
  const [stockAvailable, setStockAvailable] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [wishList, setWishList] = useState([]);
  const [wishListPair, setWishListPair] = useState([]);
  //sizeCard
  const [sizeInd, setSizeInd] = useState(undefined);

  const [specifications, setSpecifications] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [activeScreen, setActiveScreen] = useState("View");

  //color card
  const [colorInd, setColorInd] = useState(undefined);

  //cycleStoreDet
  //Data

  //validations
  const [validationErrors, setValidationErrors] = useState({
    ...initialValidationErrors,
  });

  const addWishlist = async (variantId) => {
    Snackbar.show({
      text: "Processing...",
      backgroundColor: Theme_Light_Green,
      length: Snackbar.LENGTH_INDEFINITE,
    });
    let user = await AsyncStorage.getItem("user_details");
    user = JSON.parse(user);
    if (wishList.includes(variantId)) {
      const wid = wishListPair.find((e) => e.variantId == variantId);
      const response = await ecommerce.deleteWhisList(wid.whislistId);

      if (response.errorCode == 200) {
        getWishList();
        Snackbar.show({
          text: "Product removed from your wishlist",
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
  useEffect(() => {
    let isActive = true;
    AsyncStorage.getItem("count").then((value) => {
      !_.isNull(value) && setCount(JSON.parse(value));
    });
    return () => {
      isActive = false;
    };
  }, [count]);

  useEffect(() => {
    let isActive = true;

    return () => {
      isActive = false;
    };
  }, [stockAvailable]);

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

  const shopHeader = () => {
    let name = "";
    switch (props.route.params.type) {
      case "city":
        name = "city bikes";
        break;
      case "girls":
        name = "girls bikes";
        break;
      case "hybrid":
        name = "hybrid bikes";
        break;
      case "kids":
        name = "kids bikes";
        break;
      case "mountain":
        name = "mountain bikes";
        break;
      case "road":
        name = "road bikes";
        break;
      case "urban":
        name = "urban sport bikes";
        break;
      case "equipment":
        name = "fitness equipments";
        break;
      case "access":
        name = "cycle";
        break;
      default:
        name = "";
        break;
    }
    return (
      <MyHeader
        onShare={handleShortLinkGeneration}
        {...props}
        shopList={shopList}
        viewData={viewData}
        count={count}
        name={name}
        share={true}
        navigation={props.navigation}
        type={props.route.params.type}
      />
    );
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

  const generateDeliveryDate = () => {
    setDeliveryDate("15 Jun 2021");
    setDeliveryDays("4-5");
  };

  const Specifications = ({ item }) => {
    return (
      <React.Fragment>
        {viewData.specifications && viewData.specifications.length == 0 && (
          <View
            style={[
              styles.heading1,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Text>No specifications found</Text>
          </View>
        )}
        {viewData.specifications &&
          viewData.specifications.map((spec, index) => {
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
                  <Text
                    key={index}
                    style={{ fontWeight: "bold", fontSize: 14 }}
                  >
                    {spec.specKey}
                  </Text>
                </View>
                <View style={{ width: "65%" }}>
                  <Text
                    key={index}
                    style={{ fontSize: 14, textAlign: "right" }}
                  >
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
        {viewData && viewData.reviews && viewData.reviews.length == 0 && (
          <View
            style={[
              styles.heading1,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Text>No reviews yet</Text>
          </View>
        )}
        {viewData &&
          viewData.reviews &&
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
                    {rev.user.firstName.concat(
                      rev.user.lastName ? rev.user.lastName : ""
                    )}
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
  const [colorModal, setColorModal] = useState(false);

  const ColorCard = () => {
    return (
      <React.Fragment>
        {viewData.colors && viewData.colors[colorInd] && (
          <TouchableOpacity
            onPress={() => setColorModal(true)}
            style={{
              height: 60,
              paddingLeft: 10,
              paddingTop: 5,
              borderColor: "#9e9e9e",
              borderWidth: 0.5,
              width: "100%",
              marginVertical: 5,
              borderRadius: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "65%", flexDirection: "column" }}>
              <Text style={{ fontSize: 13 }}>Colour :</Text>
              <Text
                style={{ fontSize: 18, fontWeight: "bold" }}
                numberOfLines={1}
                ellipsizeMode={"tail"}
              >
                {viewData.colors && viewData.colors[colorInd].termName}
              </Text>
            </View>
            <Image
              source={{ uri: viewData.image1 ? viewData.image1 : null }}
              resizeMode={"contain"}
              style={{
                backgroundColor: viewData.image1
                  ? "transparent"
                  : nameToColor(viewData.colors[colorInd].termName),
                width: "20%",
                height: 35,
                alignSelf: "center",
              }}
            />
            <View style={{ width: "15%", alignSelf: "center" }}>
              <FeaIcon
                name="chevron-right"
                size={25}
                color="black"
                style={{ marginTop: 3 }}
              />
            </View>
          </TouchableOpacity>
        )}
      </React.Fragment>
    );
  };

  const SizeCard = ({ sizeInd, setSizeInd, data }) => {
    return (
      <View style={{ flexDirection: "row", paddingVertical: 5 }}>
        {data.sizes &&
          data.sizes.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={() => {
                  setSizeInd(index);
                  getVariance(
                    viewData.productTypeId,
                    viewData.sizes[index].id,
                    viewData.colors[colorInd].id
                  );
                  setValidationErrors({ ...validationErrors, size: false });
                }}
                style={[
                  styles.sizeCard,
                  {
                    backgroundColor:
                      index == sizeInd ? Theme_Light_Green : "white",
                  },
                ]}
                key={index}
              >
                <Text
                  style={{ flexWrap: "wrap", fontSize: 12, fontWeight: "bold" }}
                >
                  {item.termName}
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
      const address = await AsyncStorage.getItem("addressList");
      props.navigation.navigate("ShoppingCart", {
        type: props.route.params.type,
        data: cycleView,
        addressList: _.isNull(address) ? [] : address,
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
    }

    setLoading(false);
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginVertical: 10 }}
      >
        {viewData.specifications.find(
          (spec) => spec["specKey"] === "Chain Wheel"
        ) && (
          <View style={{ width: 130 }}>
            <View style={styles.featureCard}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "70%" }}>
                  <Text>Wheels</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    {
                      viewData.specifications.find(
                        (spec) => spec["specKey"] === "Chain Wheel"
                      ).specValue
                    }
                  </Text>
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
        )}

        {viewData.specifications.find(
          (spec) => spec["specKey"] === "Frame"
        ) && (
          <View style={{ marginLeft: 10, width: 130 }}>
            <View style={styles.featureCard}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "70%" }}>
                  <Text>Frame</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    {
                      viewData.specifications.find(
                        (spec) => spec["specKey"] === "Frame"
                      ).specValue
                    }
                  </Text>
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
        )}
        {viewData.specifications.find(
          (spec) => spec["specKey"] === "Brakes"
        ) && (
          <View style={{ marginLeft: 10, width: 130 }}>
            <View style={styles.featureCard}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "70%" }}>
                  <Text>Brakes</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    {
                      viewData.specifications.find(
                        (spec) => spec["specKey"] === "Brakes"
                      ).specValue
                    }
                  </Text>
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
        )}
        {viewData.specifications.find((spec) => spec["specKey"] === "Seat") && (
          <View style={{ marginLeft: 10, width: 130 }}>
            <View style={styles.featureCard}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "70%" }}>
                  <Text>Seat</Text>
                  <Text>
                    {
                      viewData.specifications.find(
                        (spec) => spec["specKey"] === "Seat"
                      ).specValue
                    }
                  </Text>
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
        )}
        {viewData.specifications.find((spec) =>
          spec["specKey"].includes("Suspension")
        ) && (
          <View style={{ marginLeft: 10, width: 130 }}>
            <View style={styles.featureCard}>
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column", width: "70%" }}>
                    <Text>Suspension</Text>
                    <Text>
                      {
                        viewData.specifications.find((spec) =>
                          spec["specKey"].includes("Suspension")
                        ).specValue
                      }
                    </Text>
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
        )}
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

  const handleShare = async (shortLinkURL) => {
    const userDetails = JSON.parse(await AsyncStorage.getItem("user_details"));

    Share.share({
      message: `Check out ${userDetails.firstName.concat(
        userDetails.lastName ? userDetails.lastName : ""
      )} has shared '${
        viewData.title
      }' cycle from Track and Trail\n${shortLinkURL}`,
    })
      .then(() => {})
      .catch((error) => {
        Snackbar.show({
          text: "Failed to share the cycle link!",
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
                id={cycleView.id}
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
                      textTransform: "capitalize",
                    }}
                  >
                    {viewData.title}
                  </Text>
                </View>

                <View style={{ width: "35%", top: 5, alignItems: "flex-end" }}>
                  <Rating
                    rating={viewData.rating ? String(viewData.rating) : "0.0"}
                  />
                </View>
              </View>

              <View style={[styles.heading1, { marginVertical: 0 }]}>
                <Text style={{ fontSize: 16 }}>
                  Rs. {viewData.off ? viewData.disAmount : viewData.orgAmount}{" "}
                  &nbsp;&nbsp;
                  {viewData.off && (
                    <Text
                      style={{
                        textDecorationLine: "line-through",
                        color: "#7f7a73",
                      }}
                    >
                      Rs. {viewData.orgAmount}
                    </Text>
                  )}
                  &nbsp;&nbsp;
                  {viewData.off && (
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
                  )}
                </Text>
              </View>
              {props.route.params.type != "equipment" && (
                <React.Fragment>
                  <View style={[styles.heading1, { marginVertical: 10 }]}>
                    <View
                      style={{
                        width: "60%",
                      }}
                    >
                      <Text style={{ fontSize: 13 }}>Select Size</Text>
                      <SizeCard
                        sizeInd={sizeInd}
                        setSizeInd={setSizeInd}
                        data={viewData}
                      />
                    </View>
                  </View>

                  <ColorCard />
                  <Modal
                    transparent
                    animated
                    animationType="fade"
                    visible={colorModal}
                    style={{
                      marginBottom: 50,
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor: "white",
                        elevation: 5,
                        borderWidth: 1,
                        borderColor: Theme_Light_Green,
                        // height: `${(viewData.colors.length - 1) * 10}%`,
                      }}
                    >
                      <View
                        style={{
                          height: 50,
                          alignItems: "center",
                          justifyContent: "center",
                          borderBottomWidth: 1,
                          borderColor: Theme_Light_Green,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              color: Theme_Light_Green,
                              fontWeight: "bold",
                              width: "85%",
                              textAlign: "center",
                              fontSize: 15,
                              flexWrap: "wrap",
                            }}
                          >
                            Choose Colour
                          </Text>
                          <TouchableOpacity
                            onPress={() => setColorModal(false)}
                          >
                            <MIcon
                              name={"close-circle"}
                              color={Theme_Light_Green}
                              size={25}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      {viewData.colors &&
                        viewData.colors.map((col, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                margin: 10,
                                marginTop: 15,
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight:
                                    index === colorInd ? "bold" : "100",
                                  color:
                                    index === colorInd
                                      ? Theme_Light_Green
                                      : "black",
                                }}
                              >
                                {col.termName}
                              </Text>
                              <RadioButton
                                value={colorInd}
                                status={
                                  index === colorInd ? "checked" : "unchecked"
                                }
                                color={Theme_Light_Green}
                                onPress={() => {
                                  setColorInd(index);
                                  getVariance(
                                    viewData.productTypeId,
                                    viewData.sizes[sizeInd].id,
                                    viewData.colors[index].id
                                  );

                                  setValidationErrors({
                                    ...validationErrors,
                                    color: false,
                                  });
                                }}
                              />
                            </View>
                          );
                        })}
                      {/* <TouchableOpacity
                      onPress={()=>setColorModal(false)}
                        style={{
                          width: "100%",
                          height: 40,
                          backgroundColor: Theme_Light_Green,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          Choose
                        </Text>
                      </TouchableOpacity>
                     */}
                    </View>
                  </Modal>
                  <View style={[styles.heading1, { marginVertical: 0 }]}>
                    <View
                      style={{
                        width: "60%",
                      }}
                    >
                      {validationErrors.size && (
                        <Text style={{ color: "red" }}>
                          {validationErrors.size}
                        </Text>
                      )}
                    </View>
                    <View style={{ width: "5%" }} />
                    <View style={{ width: "35%", alignItems: "flex-end" }}>
                      {validationErrors.color && (
                        <Text style={{ color: "red" }}>
                          {validationErrors.color}
                        </Text>
                      )}
                    </View>
                  </View>
                  <Features />
                </React.Fragment>
              )}
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
                      maxLength={6}
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
                  <Text style={{ fontSize: 14, top: 10, textAlign: "justify" }}>
                    {viewData.about}
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
                      props.navigation.navigate("ShopCycles", {
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

export default ViewCycles;
