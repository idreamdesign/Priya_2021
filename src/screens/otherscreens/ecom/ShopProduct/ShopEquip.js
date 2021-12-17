import React, { useCallback, useState, useEffect } from "react";
import { Image } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import _ from "lodash";

import MyHeader from "../../common/MyHeader";
import { appImages } from "../../config";
import { Theme_Light_Green } from "../../styles/colors";
import { WINDOW_WIDTH } from "../../styles/mixins";
import Filter from "../../assets/filter.svg";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import FilterScreen from "./Filter";
import { ecommerce } from "../../api/Ecommerce.service";
import { useFocusEffect } from "@react-navigation/core";
import Snackbar from "react-native-snackbar";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadingUri } from "../../utils/constants";
import FilterModal from "./FilterModal";

const ShopEquip = (props) => {
  const [activeScreen, setActiveScreen] = useState("List");
  const [clear, setClear] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [equipList, setEquipList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [wishListPair, setWishListPair] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shopList, setShopList] = useState(null);
  const [taxomony, setTaxomony] = useState([]);

  //SortByCard
  const [sortbyVisibile, setSortByVisible] = useState(false);
  const [sortInd, setSortInd] = useState(undefined);
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
  useFocusEffect(
    useCallback(() => {
      let isFocus = true;
      fetchEquipList();
      getTaxomony();
      return () => {
        isFocus = false;
      };
    }, [])
  );

  const fetchEquipList = async () => {
    setLoading(true);
    const response = await ecommerce.getProductsById(2);
    getWishList();
    if (response) {
      if (response.responseContent) {
        setEquipList(response.responseContent);
      } else {
        setEquipList([]);
      }
    } else {
      Snackbar.show({
        duration: Snackbar.LENGTH_SHORT,
        text: "Network unavailable.Please check your internet connection",
      });
    }
    setLoading(false);
  };

  const getTaxomony = async () => {
    const res = await ecommerce.getTaxonomyById(2);
    if (res.responseContent) {
      setTaxomony(res.responseContent);
    }
  };

  const applyFilter = async (data) => {
    setFilterVisible(false);
    const termID = data.map((i) => i.id);
    setLoading(true);
    const res = await ecommerce.getFilterListEquip(termID.toString());
    if (res.responseContent) {
      console.log("gggg");
      setEquipList(res.responseContent.content);
    } else {
      console.log("gggggggggg");
      setEquipList([]);
    }
    setLoading(false);
  };

  const applySortBy = async (sort) => {
    setFilterVisible(false);
    console.log(sort);
    setLoading(true);
    const res = await ecommerce.getSortListEquip(sort);
    !res &&
      (setEquipList([]),
      Snackbar.show({
        text: "Network error!Please check you internet connection and try again later",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      }));
    if (res.responseContent) {
      setEquipList(res.responseContent.content);
    } else {
      setEquipList([]);
    }
    setLoading(false);
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

  const addWishlist = async (variantId) => {
    let user = await AsyncStorage.getItem("user_details");
    user = JSON.parse(user);
    if (wishList.includes(variantId)) {
      const wid = wishListPair.find((e) => e.variantId == variantId);
      console.log(wid);
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
      "Price { low > high }",
      "Price { high < low }",
      "Newest First",
    ];
    const sortQuery = ["lowtohigh", "hightolow", "newestfirst"];

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
              onPress={() => (setSortByVisible(false), setSortInd(sortIndex))}
            >
              <Text style={{ fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Sort by</Text>
            <TouchableOpacity
              onPress={() => (
                setSortByVisible(false),
                setSortInd(sortIndex),
                applySortBy(sortQuery[sortIndex])
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

  const CycleCard = ({ item, index }) => {
    return (
      <View
        style={{
          width: WINDOW_WIDTH / 2.1,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={styles.cycleCard}
          onPress={() =>
            props.navigation.navigate("ViewEquip", {
              productId: item.id,
            })
          }
        >
          <TouchableOpacity onPress={() => addWishlist(item.id)}>
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
              source={item.image1 ? { uri: item.image1 } : appImages.product}
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
              style={{ fontWeight: "bold", fontSize: 14, marginTop: 15 }}
            >
              {item.variantName}
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
                  20 %
                </Text>
              </View>
            </View>
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
          name={"Filter"}
          filter={true}
          clearAll={() => setClear(!clear)}
          navigation={props.navigation}
          type={props.route.params.type}
          goBack={goBack}
        />
      )}
      {loading ? (
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
      ) : (
        <View>
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
                  style={styles.filterbtn}
                  onPress={() => setFilterVisible(true)}
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
              {equipList.length !== 0 ? (
                <FlatList
                  data={equipList}
                  renderItem={CycleCard}
                  keyExtractor={(_, i) => i.toString()}
                  numColumns={2}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    top: 250,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>No data found</Text>
                </View>
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
          <FilterModal
            visible={filterVisible}
            close={setFilterVisible}
            list={taxomony}
            applyFilter={applyFilter}
          />
        </View>
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
export default ShopEquip;
