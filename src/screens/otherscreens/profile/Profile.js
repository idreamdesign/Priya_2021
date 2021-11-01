import React from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../assets';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/profileStyles';
import getIcon from '../../../utils/commonfunctions/getIcon';

export const Profile = (props) => {
	return (
		<View style={basicStyles.container}>
			<View style={styles.imageContainer}>
				<View>
					<Image style={styles.profileImg} source={appImages.otherImages.PROFILEPLACEHOLDER} />
					<View style={styles.camerafab}>{getIcon('ion', 'camera', null, 25, 'white')}</View>
				</View>
				<View>
					<TouchableOpacity
						onPress={() => props.navigation.navigate('EditProfile')}
						style={{ flexDirection: 'row', marginRight: 40 }}
					>
						{getIcon('mi', 'mode-edit', null, 25)}
						<Text style={{ marginLeft: 10, fontSize: 16, fontWeight: '400' }}>Edit Profile</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.changePswdBtn}
						onPress={() => props.navigation.navigate('ChangePassword')}
					>
						<Text style={{ fontSize: 14, color: 'white', fontWeight: '500' }}>Change password</Text>
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView contentContainerStyle={{ flex: 0, height: undefined }}>
				<View style={{ ...styles.detailsContainer }}>
					<Text style={styles.detailTitle}>Student Name</Text>
					<Text style={styles.detailValue} />
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.detailTitle}>E-mail address</Text>
					<Text style={styles.detailValue} />
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.detailTitle}>Phone Number</Text>
					<Text style={styles.detailValue} />
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.detailTitle}>Grade</Text>
					<Text style={styles.detailValue} />
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.detailTitle}>Date of Birth</Text>
					<Text style={styles.detailValue} />
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.detailTitle}>Gender</Text>
					<Text style={styles.detailValue} />
				</View>
			</ScrollView>
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
