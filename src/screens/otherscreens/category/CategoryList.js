import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../assets';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/categoryStyles';

const CategoryList = (props) => {
	return (
		<View style={{ ...basicStyles.container, alignItems: 'center', justifyContent: 'center' }}>
			<TouchableOpacity onPress={() => props.navigation.navigate('OneToOne')} style={styles.categoryCard}>
				<View style={{ width: '50%', maxWidth: '50%' }}>
					<Text style={styles.catTitle}>1 to 1 </Text>
					<Text style={styles.catTitle}>class</Text>
				</View>
				<View style={{ width: '50%' }}>
					<Image style={styles.cardImg} resizeMode="stretch" source={appImages.otherImages.ONETOONECLASS} />
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => props.navigation.navigate('PreRecordedSubList')}
				style={styles.categoryCard}
			>
				<View>
					<Text style={styles.catTitle}>Pre </Text>
					<Text style={styles.catTitle}>recorded</Text>
					<Text style={styles.catTitle}>class</Text>
				</View>
				<View style={{ width: '40%' }}>
					<Image
						style={styles.cardImg}
						resizeMode="stretch"
						source={appImages.otherImages.PRERECORDEDCLASS}
					/>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => props.navigation.navigate('GroupClass')} style={styles.categoryCard}>
				<View>
					<Text style={styles.catTitle}>Group </Text>
					<Text style={styles.catTitle}>class</Text>
				</View>
				<View style={{ width: '40%' }}>
					<Image style={styles.cardImg} resizeMode="stretch" source={appImages.otherImages.GROUPCLASS} />
				</View>
			</TouchableOpacity>
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
