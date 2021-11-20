import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../assets';
import store from '../../../redux/store';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/categoryStyles';
import getProfileImage from '../../../utils/commonfunctions/getPictures';

const CategoryList = (props) => {
	const categories = store.getState().auth.categoryDetails;

	return (
		<View style={{ ...basicStyles.container, alignItems: 'center', justifyContent: 'center' }}>
			{categories.map((cat, i) => {
				console.log(cat, i);
				return (
					<TouchableOpacity
						key={i}
						onPress={() => props.navigation.navigate('OneToOne')}
						style={styles.categoryCard}
					>
						<View style={{ width: '50%', maxWidth: '50%' }}>
							<Text style={styles.catTitle}>{cat.name}</Text>
							{/* <Text style={styles.catTitle}>class</Text> */}
						</View>
						<View style={{ width: '50%' }}>
							<Image
								style={styles.cardImg}
								resizeMode="stretch"
								source={
									cat.thumbnail ? (
										{ uri: getProfileImage(cat.thumbnail) }
									) : (
										appImages.otherImages.ONETOONECLASS
									)
								}
							/>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
