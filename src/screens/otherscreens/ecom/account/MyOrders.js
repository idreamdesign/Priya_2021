import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import getIcon from '../../../../utils/commonfunctions/getIcon';
import appImages from '../../../../assets';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/ecomAccount';
import shopStyles from '../../../../styles/shopStyles';

export const MyOrders = props => {
  return (
    <View style={basicStyles.container}>
      <View style={styles.ordersContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {[1, 2, 3, 4].map((el, i) => {
            return (
              <View
                style={{...shopStyles.itemCard, flexDirection: 'column'}}
                key={i}>
                <Image
                  style={shopStyles.shopImage}
                  source={appImages.otherImages.FOOD}
                />
                <View style={shopStyles.detailsContainer}>
                  <Text style={shopStyles.itemTitle}>Product Name: </Text>
                  <Text style={shopStyles.itemName}>Item 1 </Text>
                </View>
                <View style={shopStyles.detailsContainer}>
                  <Text style={shopStyles.itemTitle}>
                    Product Description:{' '}
                  </Text>
                  <Text style={shopStyles.itemName}>Most fresh item </Text>
                </View>
                <View style={shopStyles.detailsContainer}>
                  <Text style={shopStyles.itemTitle}>Order Price: </Text>
                  <Text style={shopStyles.itemName}>RM 100 (per kg)</Text>
                </View>
                <View style={shopStyles.detailsContainer}>
                  <Text style={shopStyles.itemTitle}>Ordered Qty: </Text>
                  <Text style={shopStyles.itemName}>2 (kgs)</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
