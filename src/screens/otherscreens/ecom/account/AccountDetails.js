import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import FullSizeBtn from '../../../../components/FullSizeBtn';
import basicStyles from '../../../../styles/basicStyles';
import styles from '../../../../styles/profileStyles';
import appColors from '../../../../utils/appColors';
import getIcon from '../../../../utils/commonfunctions/getIcon';

export const AccountDetails = props => {
  return (
    <View style={basicStyles.container}>
      <View style={styles.ecomProfileCard}>
        <Text style={styles.ecomName}>Example Name </Text>
        <Text style={styles.ecomNumAndMail}>9876543210, abc123@gmail.com</Text>
      </View>
      <ScrollView contentContainerStyle={{flex: 0, height: undefined}}>
        <View style={{...styles.detailsContainer}}>
          <Text style={styles.detailTitle}>Your Name </Text>
          <Text style={styles.detailValue}>Example Name</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>E-mail address</Text>
          <Text style={styles.detailValue}>abc123@gmail.com</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Phone Number</Text>
          <Text style={styles.detailValue}>9876543210</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>City</Text>
          <Text style={styles.detailValue}>Madurai</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Pincode</Text>
          <Text style={styles.detailValue}>123456</Text>
        </View>
        <FullSizeBtn
          onPress={() => props.navigation.navigate('EditEcomProfile')}
          btnColor={appColors.inkBlue}
          btnTitle={'Edit Profile'}
          style={{marginTop: 25}}
        />
        <FullSizeBtn
          onPress={() =>
            props.navigation.navigate('ChangePassword', {from: 'ecom'})
          }
          btnColor={appColors.primaryColor}
          btnTitle={'Change Password'}
          style={{marginTop: 15}}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
