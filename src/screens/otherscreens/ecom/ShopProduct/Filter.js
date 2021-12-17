import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";

import { Theme_Light_Green } from "../../styles/colors";

const FilterScreen = ({
  toggleScreen,
  clear,
  filterList,
  clearAll,
  termIds,
  colorIds,
  sizeIds,
  setTermIds,
  setSizeIds,
  setColorIds,
  fetchCycleList,
  selections,
  setSelections,
  type,
}) => {
  const [filterOptions, setfilterOptions] = useState([...filterList]);
  const [filtInd, setFiltInt] = useState(0);
  const [checked, setChecked] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            width: "40%",
            borderRightWidth: 0.5,
            borderColor: Theme_Light_Green,
          }}
        >
          <ScrollView showsHorizontalScrollIndicator={false}>
            {filterOptions.map((filter, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setFiltInt(index)}
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: 10,
                    paddingBottom: 10,
                    paddingTop: 10,
                  }}
                >
                  <Text
                    style={{
                      flexWrap: "wrap",
                      width: "80%",
                      color: index == filtInd ? Theme_Light_Green : "black",
                    }}
                  >
                    {filter.taxonomyName}
                  </Text>
                  {index == filtInd && (
                    <React.Fragment>
                      <View style={{ width: "10%" }} />
                      <View
                        style={{
                          width: 5,
                          height: 35,
                          backgroundColor: Theme_Light_Green,
                          alignSelf: "flex-end",
                        }}
                      ></View>
                    </React.Fragment>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ width: "70%" }}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {filterOptions[filtInd].term &&
              filterOptions[filtInd].term.map((opt, index) => {
                return (
                  <View
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      width: "100%",
                    }}
                    key={index}
                  >
                    <View style={{ width: "15%" }}>
                      <Checkbox
                        color={Theme_Light_Green}
                        status={
                          selections.includes(opt.id) ? "checked" : "unchecked"
                        }
                        onPress={() => {
                          setChecked(!checked);
                          if (selections.includes(opt.id)) {
                            let ind = selections.indexOf(opt.id);
                            selections.splice(ind, 1);
                          } else {
                            selections.push(opt.id);
                          }
                          if (termIds.includes(opt.id)) {
                            let ind = termIds.indexOf(opt.id);
                            termIds.splice(ind, 1);
                          } else if (
                            filterOptions[filtInd].taxonomyName != "Size" &&
                            filterOptions[filtInd].taxonomyName != "Colors"
                          ) {
                            termIds.push(opt.id);
                          }
                          if (sizeIds.includes(opt.id)) {
                            let ind = sizeIds.indexOf(opt.id);
                            sizeIds.splice(ind, 1);
                          } else if (
                            filterOptions[filtInd].taxonomyName == "Size"
                          ) {
                            sizeIds.push(opt.id);
                          }
                          if (colorIds.includes(opt.id)) {
                            let ind = colorIds.indexOf(opt.id);
                            colorIds.splice(ind, 1);
                          } else if (
                            filterOptions[filtInd].taxonomyName == "Colors"
                          ) {
                            colorIds.push(opt.id);
                          }
                        }}
                      />
                    </View>
                    <View style={{ width: "55%" }}>
                      <Text
                        style={{
                          top: 8,
                          fontSize: 14,
                          textTransform: "capitalize",
                        }}
                      >
                        &nbsp;&nbsp;{opt.termName}
                      </Text>
                    </View>
                    {filtInd == 0 && (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: opt,
                          alignSelf: "flex-end",
                          bottom: 8,
                        }}
                      />
                    )}
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default FilterScreen;
