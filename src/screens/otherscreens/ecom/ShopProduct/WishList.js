import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import MyHeader from "../../common/MyHeader";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../styles/mixins";
import IonIcon from "react-native-vector-icons/Ionicons";
import { loadingUri, spinnerUri } from "../../utils/constants";
import { Theme_Light_Green } from "../../styles/colors";
import FIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { ecommerce } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";
import Snackbar from "react-native-snackbar";

const WishList = (props) => {
  const isFocused = useNavigation();
  const [wishlist, setWishList] = useState(null);
  useEffect(() => {
    let isActive = true;
    isActive && getUserWishList();
    return () => {
      isActive = false;
    };
  }, [isFocused]);

  const getUserWishList = async () => {
    let userId = JSON.parse(await AsyncStorage.getItem("user_details")).id;
    const response = await ecommerce.getUserWishList(userId);
    !response &&
      Snackbar({
        text: "Network Error!Please check your internet connection",
        backgroundColor: "red",
        length: Snackbar.LENGTH_SHORT,
      });
    _.isNull(response.responseContent)
      ? setWishList([])
      : setWishList(response.responseContent);
  };
  const ModelBanner = ({ item, index }) => {
    const catId = item.variant.product.category.id;
    const prodId = item.variant.productType.id;
    let type;
    switch (prodId) {
      case 10:
        type = "city";
        break;
      case 11:
        type = "girls";
        break;
      case 12:
        type = "hybrid";
        break;
      case 13:
        type = "kids";
        break;
      case 14:
        type = "mountain";
        break;
      case 15:
        type = "road";
        break;
      case 16:
        type = "urban";
        break;

      default:
        type = "";
        break;
    }

    const navigate = () => {
      catId == 3
        ? props.navigation.navigate("ViewAccess", {
            type: "access",
            accessData: {
              id: item.variant.id,
            },
          })
        : catId == 2
        ? props.navigation.navigate("ViewEquip", {
            type: "equipment",
            productId: item.variant.id,
          })
        : props.navigation.navigate("ViewCycles", {
            type: type,
            cycleData: {
              id: item.variant.id,
            },
          });
    };

    return (
      <View
        style={{
          backgroundColor: "white",
          marginRight: 15,
          marginVertical: 10,
          marginLeft: 15,
          padding: 10,
          marginBottom: 10,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          style={{ height: 30, width: "100%" }}
          onPress={async () => {
            let newArr = [...wishlist];
            newArr.splice(index, 1);
            setWishList([...newArr]);
            await ecommerce.deleteWhisList(item.id);
          }}
        >
          <IonIcon
            name={"close-outline"}
            color={"black"}
            size={30}
            style={{ alignSelf: "flex-end" }}
          />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", marginVertical: 0 }}>
          <View>
            <Image
              loadingIndicatorSource={{ uri: spinnerUri }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
              source={item.variant.image1 ? { uri: item.variant.image1 } : null}
              resizeMode={"contain"}
            />
          </View>
          <View
            style={{
              marginVertical: 20,
              marginLeft: 10,
              width: "60%",
              bottom: 15,
            }}
          >
            <Text
              numberOfLines={2}
              ellipsizeMode={"tail"}
              style={{
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {item.variant.variantName}
            </Text>
            <Text>{item.variant.price}</Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            height: 1,
            borderWidth: 1,
            borderColor: "#cccccc",
          }}
        />
        <View
          style={{
            width: "100%",
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => navigate()}
          >
            <Text style={{ color: Theme_Light_Green, fontSize: 14 }}>
              View Details&nbsp;&nbsp;
            </Text>
            <FIcon
              name={"long-arrow-right"}
              color={Theme_Light_Green}
              size={15}
              style={{ top: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, height: WINDOW_HEIGHT, width: WINDOW_WIDTH }}>
      <MyHeader
        name={"My WishList"}
        navigation={props.navigation}
        register={true}
      />
      {Boolean(wishlist) ? (
        wishlist.length == 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>No data found</Text>
          </View>
        ) : (
          <FlatList
            data={wishlist}
            renderItem={ModelBanner}
            keyExtractor={(_, i) => i.toString()}
            numColumns={1}
          />
        )
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

export default WishList;
