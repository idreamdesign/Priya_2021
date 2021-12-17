import React, { useCallback, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
} from "react-native";
import _ from "lodash";
import { loadingUri, spinnerUri } from "../../utils/constants";

import MyHeader from "../../common/MyHeader";
import { appImages } from "../../config";
import { Theme_Light_Green } from "../../styles/colors";
import { WINDOW_WIDTH } from "../../styles/mixins";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import FilterScreen from "./Filter";
import { ecommerce } from "../../api/Ecommerce.service";
import { useFocusEffect } from "@react-navigation/core";
import Snackbar from "react-native-snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShopCycles = (props) => {
  const [activeScreen, setActiveScreen] = useState("List");
  const [clear, setClear] = useState(false);

  const [cycleData, setCycleData] = useState(null);
  const [filterList, setFilterList] = useState(null);
  const [shopList, setShopList] = useState(null);
  const [wishList, setWishList] = useState([]);
  const [wishListPair, setWishListPair] = useState([]);
  const [termIds, setTermIds] = useState([]);
  const [sizeIds, setSizeIds] = useState([]);
  const [colorIds, setColorIds] = useState([]);
  const [selections, setSelections] = useState([]);

  const applyFilter = async () => {
    setActiveScreen("List");
    setCycleData(null);
    const response = await ecommerce.applyFilter(
      1,
      sizeIds.length == 0 ? "" : sizeIds,
      colorIds.length == 0 ? "" : colorIds,
      termIds.length == 0 ? "" : termIds,
      _.isUndefined(sortInd)
        ? ""
        : sortInd == 1
        ? "lowtohigh"
        : sortInd == 2
        ? "hightolow"
        : sortInd == 5
        ? "newestfirst"
        : ""
    );
    if (response) {
      _.isNull(response.responseContent)
        ? setCycleData([])
        : setCycleData(response.responseContent.content);
      getWishList();
    } else {
      Snackbar.show({
        text: "Network error!Please check you internet connection and try again later",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      });
    }
  };
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
          text: "Your product is saved to wishlist",
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

  //SortByCard
  const [sortbyVisibile, setSortByVisible] = useState(false);
  const [sortInd, setSortInd] = useState(undefined);

  useFocusEffect(
    useCallback(() => {
      let isFocus = true;

      fetchCycleList();

      return () => {
        isFocus = false;
      };
    }, [])
  );

  useEffect(() => {
    let isActive = true;
    isActive && getCartList();
    return () => {
      isActive = false;
    };
  }, []);

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

  const fetchCycleList = async () => {
    setCycleData(null);
    let termId;
    switch (props.route.params.type) {
      case "city":
        termId = 10;
        break;
      case "girls":
        termId = 11;
        break;
      case "hybrid":
        termId = 12;
        break;
      case "kids":
        termId = 13;
        break;
      case "mountain":
        termId = 14;
        break;
      case "road":
        termId = 15;
        break;
      case "urban":
        termId = 16;
        break;

      default:
        termId = "";
        break;
    }
    const response = await ecommerce.getShopCycles(termId);
    const res = await ecommerce.getFilters(1);
    setFilterList(res.responseContent);
    getWishList(cycleData);
    !response &&
      (setCycleData([]),
      Snackbar.show({
        text: "Network Error!Please check your internet connection",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      }));
    console.log("RESPONSE::: ", response);
    !response &&
      Snackbar.show({
        duration: Snackbar.LENGTH_SHORT,
        text: "Network unavailable.Please check your internet connection",
        backgroundColor: "red",
      });
    if (!_.isEmpty(response.responseContent)) {
      if (response.responseContent.content) {
        setCycleData(response.responseContent.content);
      } else {
        setCycleData([]);
      }
    } else {
      setCycleData([]);
    }
  };

  const goBack = () => {
    if (activeScreen == "Filter") {
      setActiveScreen("List");
    } else {
      props.navigation.goBack();
    }
  };

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

      default:
        name = "";
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
    const filterOptions = [
      "Most Relevant",
      "Price { low > high }",
      "Price { high < low }",
      "Popularity",
      "Rating",
      "Newest First",
    ];

    return (
      <Modal
        visible={sortbyVisibile}
        transparent={true}
        animationType={"slide"}
      >
        <View
          style={{
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 25,
            paddingVertical: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => (
                setSortByVisible(false), setSortInd(sortIndex), fetchCycleList()
              )}
            >
              <Text style={{ fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Sort by</Text>
            <TouchableOpacity
              onPress={() => (
                setSortByVisible(false), setSortInd(sortIndex), applyFilter()
              )}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: Theme_Light_Green,
                }}
              >
                APPLY
              </Text>
            </TouchableOpacity>
          </View>
          {filterOptions.map((item, index) => (
            <TouchableOpacity onPress={() => setSortIndex(index)} key={index}>
              <Text
                style={{
                  padding: 10,
                  color: index == sortIndex ? Theme_Light_Green : "black",
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    );
  };

  const Rating = ({ rating }) => {
    let full = Number(rating.split(".")[0]);
    let half =
      Number(rating.split(".")[1]) == 0 || _.isNaN(Number(rating.split(".")[1]))
        ? false
        : true;
    let empty = Math.floor(5 - Number(rating));

    return (
      <View style={{ flex: 1, flexDirection: "row", bottom: 10 }}>
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
              color={"#FFC107"}
              size={25}
              style={{ top: 2 }}
            />
          ))}
        {full <= 5 && empty <= 5 && half && (
          <Image
            resizeMode={"contain"}
            source={appImages.HStar}
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

  const CycleCard = ({ item }) => {
    return (
      <View
        style={{
          width: WINDOW_WIDTH / 2.1,
          marginVertical: 10,
          marginLeft: 10,
        }}
      >
        <TouchableOpacity
          style={styles.cycleCard1}
          onPress={() =>
            props.navigation.navigate("ViewCycles", {
              type: props.route.params.type,
              cycleData: item,
            })
          }
        >
          <TouchableOpacity
            onPress={() => {
              addWishlist(item.id);
            }}
          >
            <FIcon
              name={wishList.includes(item.id) ? "heart" : "heart-o"}
              color={Theme_Light_Green}
              size={20}
              style={styles.likeIcon}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              padding: 5,
            }}
          >
            <Image
              source={{ uri: item.image1 }}
              loadingIndicatorSource={{ uri: spinnerUri }}
              resizeMode={"contain"}
              style={{
                width: 150,
                height: 100,
                alignSelf: "center",
              }}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: 14,
                marginTop: 15,
              }}
            >
              {item.product.productName}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                width: WINDOW_WIDTH / 2,
                paddingVertical: 5,
              }}
            >
              <View style={{ width: "53%" }}>
                <Text
                  style={{
                    fontSize: 12,
                    alignSelf: "flex-start",
                    fontWeight: "900",
                  }}
                >
                  Rs. {item.price}
                </Text>
              </View>
              {item.discountPercentage && (
                <View
                  style={{
                    width: 60,
                    height: 18,
                    backgroundColor: `#97ea5a`,
                    right: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    {item.discountPercentage} Offer
                  </Text>
                </View>
              )}
            </View>

            <Rating
              rating={item.averageRating ? String(item.averageRating) : "0.0"}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {activeScreen == "List" ? (
        shopHeader()
      ) : (
        <MyHeader
          {...props}
          name={"Filter"}
          filter={true}
          clearAll={() => {
            setSelections([]);
            fetchCycleList();
          }}
          navigation={props.navigation}
          type={props.route.params.type}
          goBack={goBack}
        />
      )}
      {activeScreen !== "Filter" && (
        <React.Fragment>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity
              style={styles.sortbtn}
              onPress={() => setSortByVisible(true)}
            >
              <FIcon name={"sort"} color={"white"} size={25} />
              <Text
                style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
              >
                &nbsp; Sort By
              </Text>
              <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!Boolean(filterList)}
              termIds={termIds}
              colorIds={colorIds}
              sizeIds={sizeIds}
              style={styles.filterbtn}
              onPress={() => setActiveScreen("Filter")}
            >
              <MIcon
                name={"filter"}
                color={"white"}
                size={25}
                style={{ top: 2 }}
              />
              <Text
                style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
              >
                &nbsp; Filter
              </Text>
            </TouchableOpacity>
          </View>

          {Boolean(cycleData) == false && (
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
          {Boolean(cycleData) && cycleData.length != 0 ? (
            <FlatList
              data={cycleData}
              renderItem={CycleCard}
              keyExtractor={(_, i) => i.toString()}
              numColumns={2}
              // onEndReached={updateList}
              // onEndReachedThreshold={0.1}
              // ListFooterComponent={FooterLoader}
            />
          ) : (
            Boolean(cycleData) && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "50%",
                }}
              >
                <Text style={{ fontSize: 20 }}>No data found</Text>
              </View>
            )
          )}

          <ModalCard />

          {sortbyVisibile ? (
            <View
              style={{
                backgroundColor: "#000",
                opacity: 0.5,
                flex: 1,
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            ></View>
          ) : null}
        </React.Fragment>
      )}
      {activeScreen == "Filter" && (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sortbtn: {
    flexDirection: "row",
    width: WINDOW_WIDTH / 2,
    backgroundColor: Theme_Light_Green,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  filterbtn: {
    flexDirection: "row",
    width: WINDOW_WIDTH / 2,
    backgroundColor: Theme_Light_Green,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    left: 2,
  },
  cardContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  cycleCard: {
    height: 230,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#B5afa5",
  },
  cycleCard1: {
    height: 230,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#B5afa5",
  },
  likeIcon: {
    textAlign: "right",
    paddingRight: 15,
    paddingTop: 10,
  },
});
export default ShopCycles;
