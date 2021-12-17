import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import appImages from '../../../../assets';
import styles from '../../../../styles/shopStyles';
import appColors from '../../../../utils/appColors';

export const OrdersTracking = props => {
  const [trackData, setTrackData] = useState([
    {
      date: '13/11/2020',
      time: '01:15 AM',
      status: 'Delivered',
      location: 'Coimbatore',
      success: 0,
    },
    {
      date: '12/11/2020',
      time: '01:15 AM',
      status: 'Out for Delivery',
      location: 'Coimbatore',
      success: 0,
    },
    {
      date: '10/11/2021',
      time: '01:15 PM',
      status: 'The shipment arrived at final delivery location',
      location: 'Coimbatore',
      success: 1,
    },
    {
      date: '07/04/2020',
      time: '02:15 AM',
      status: 'The shipment has left the facility',
      location: 'Chennai',
      success: 1,
    },
    {
      date: '06/11/2020',
      time: '08:15 AM',
      status: 'The shipment has been processed in the location',
      location: 'Chennai',
      success: 1,
    },
  ]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          backgroundColor: 'white',
          marginRight: 20,
          marginVertical: 10,
          padding: 10,
          marginBottom: 10,
        }}>
        {props.data.map((trackData, index) => {
          return (
            <View
              style={{...styles.itemCard, flexDirection: 'column'}}
              key={index}>
              <Image
                style={styles.shopImage}
                source={appImages.otherImages.FOOD}
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.itemTitle}>Product Name: </Text>
                <Text style={styles.itemName}>Item 1 </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.itemTitle}>Product Description: </Text>
                <Text style={styles.itemName}>Most fresh item </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.itemTitle}>Order Price: </Text>
                <Text style={styles.itemName}>RM 100 (per kg)</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.itemTitle}>Ordered Qty: </Text>
                <Text style={styles.itemName}>2 (kgs)</Text>
              </View>
            </View>
          );
        })}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 20,
            marginBottom: 25,
          }}>
          <Text style={{fontWeight: 'bold'}}>Tracking Details</Text>
          <Text>Tracking ID: 124542514</Text>
        </View>
        {trackData.map((track, index) => {
          return (
            <View
              key={index}
              style={{
                width: '100%',
                flexDirection: 'row',
                marginLeft: 25,
                marginTop: -5,
              }}>
              <View style={{flexDirection: 'column', width: '20%'}}>
                <Text style={{fontWeight: '800'}}>{track.date}</Text>
                <Text style={{fontSize: 12}}>{track.time}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '10%',
                  marginHorizontal: 30,
                  alignItems: 'center',
                }}>
                <Icons
                  name={Boolean(track.success) ? 'circle' : 'circle-thin'}
                  size={15}
                  color={appColors.primaryColor}
                  style={{position: 'relative', top: 2}}
                />
                {trackData.length - 1 != index && (
                  <View
                    style={{
                      borderLeftColor: 'grey',
                      borderLeftWidth: 1,
                      height: 60,
                    }}></View>
                )}
              </View>
              <View style={{width: '50%', marginLeft: -10}}>
                <Text style={{fontSize: 16, flexWrap: 'wrap'}}>
                  {track.status}
                </Text>
                <Text style={{fontSize: 12}}>{track.location}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
