import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import _ from "lodash";
import { spinnerUri } from "../../utils/constants";

const WIDTH = Dimensions.get("window").width / 1.75;
export const Products = (props) => {
  const navigation = useNavigation();
  const navigateToProducts = (item, type) => {
    const variant = item.product.category.id;
    const product = item.id;

    console.log(item.product.category.id, item.id);
    console.log(item.id);
    if (variant == 1) {
      navigation.navigate("ViewCycles", {
        type: type,
        cycleData: item,
      });
    } else if (variant == 2) {
      navigation.navigate("ViewEquip", {
        productId: product,
      });
    } else if (variant == 3) {
      navigation.navigate("ViewAccess", {
        type: "access",
        accessData: item,
      });
    }
  };
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={props.data}
        style={{ marginHorizontal: 10 }}
        horizontal={true}
        renderItem={({ item }) => {
          let type;
          switch (item.productType.id) {
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
          return (
            <TouchableOpacity
              onPress={() => navigateToProducts(item, type)}
              style={{ marginLeft: 10 }}
            >
              <ImageBackground
                loadingIndicatorSource={{ uri: spinnerUri }}
                source={{ uri: item.image1 }}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: 150,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  backgroundColor: "#00000029",
                }}
              ></ImageBackground>
              <Text
                style={{
                  position: "absolute",
                  margin: 5,
                  fontSize: 10,
                  color: "#fff",
                  paddingHorizontal: 10,
                  backgroundColor: "#83AA39",
                  textAlign: "center",
                  borderRadius: 5,
                }}
              >
                {item.type}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: WIDTH,
                  justifyContent: "space-around",
                  marginVertical: 10,
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {item.product.productName &&
                    item.product.productName.length > 18
                      ? item.product.productName.substring(0, 18) + "..."
                      : item.product.productName}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    props.route.params.type == "access" &&
                      props.navigation.dispatch(
                        StackActions.replace("ViewAccess", {
                          type: props.route.params.type,
                          accessData: item,
                        })
                      );
                    props.route.params.type == "equipment" &&
                      props.navigation.dispatch(
                        StackActions.replace("ViewEquip", {
                          type: props.route.params.type,
                          productId: item.id,
                        })
                      );
                    props.route.params.type != "access" &&
                      props.route.params.type != "equipment" &&
                      props.route.params.type != "AddCart" &&
                      props.navigation.dispatch(
                        StackActions.replace("ViewCycles", {
                          type: type,
                          cycleData: item,
                        })
                      );
                  }}
                  style={{
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    backgroundColor: "#83AA39",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 10,
                      padding: 5,
                      textTransform: "uppercase",
                    }}
                  >
                    shop now
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
