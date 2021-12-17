import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Theme_Light_Green } from "../../styles/colors";
import { appImages } from "../../config";
import { Checkbox } from "react-native-paper";

const FilterModal = ({ visible, close, list, applyFilter }) => {
  const [filtInd, setFiltInt] = useState(0);
  const [selections, setSelections] = useState([]);

  return (
    <Modal visible={visible}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              elevation: 5,
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 18,
              borderBottomColor: "#04050573",
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity onPress={() => console.log("llll")}>
              <appImages.Back width={20} height={20} />
            </TouchableOpacity>
            <Text
              style={{
                width: "65%",
                fontWeight: "bold",
                fontSize: 18,
                marginLeft: 20,
              }}
            >
              Filter
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Clear All</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                width: "45%",
                borderRightColor: Theme_Light_Green,
                borderRightWidth: 2,
                height: "100%",
              }}
            >
              <FlatList
                data={list}
                style={{ marginHorizontal: 15, marginVertical: 20 }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{ marginVertical: 10 }}
                    onPress={() => setFiltInt(index)}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: filtInd == index ? Theme_Light_Green : "grey",
                      }}
                    >
                      {item.taxonomyName}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
            <View style={{ width: "65%" }}>
              <FlatList
                data={list[filtInd]?.term}
                style={{ marginHorizontal: 15, marginVertical: 20 }}
                renderItem={({ item, index }) => (
                  <View style={{ flexDirection: "row" }}>
                    <Checkbox
                      color={Theme_Light_Green}
                      status={
                        selections.includes(item) ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        if (selections.includes(item)) {
                          let ind = selections.indexOf(item);
                          const data = selections;
                          data.splice(ind, 1);
                          setSelections([...data]);
                        } else {
                          setSelections([...selections, item]);
                        }
                      }}
                    />
                    <TouchableOpacity
                      style={{ marginVertical: 10 }}
                      onPress={() => {
                        if (selections.includes(item)) {
                          let ind = selections.indexOf(item);
                          const data = selections;
                          data.splice(ind, 1);
                          setSelections([...data]);
                        } else {
                          setSelections([...selections, item]);
                        }
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          color: selections.includes(item)
                            ? Theme_Light_Green
                            : "grey",
                        }}
                      >
                        {item.termName}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
          </View>
        </View>
        <View style={{ width: "100%", flexDirection: "row", marginBottom: 5 }}>
          <TouchableOpacity
            onPress={() => close(false)}
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
            onPress={() => applyFilter(selections)}
            style={{
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Theme_Light_Green,
              height: 50,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 14 }}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
