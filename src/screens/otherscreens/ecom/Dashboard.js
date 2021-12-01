import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../assets';
import SearchBar from '../../../components/SearchBar';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/HomeStyles';
import appColors from '../../../utils/appColors';
import getIcon from '../../../utils/commonfunctions/getIcon';

export const Dashboard = (props) => {
	const myString = 'Restaurants';
	return (
		<View style={basicStyles.container}>
			<View style={styles.locationContainer}>
				{getIcon('et', 'location-pin', null, 25, appColors.white)}
				<Text style={styles.locationText}>123,New District,New State,Tamilnadu-123456.</Text>
			</View>
			<View style={styles.searchBarContainer}>
				<SearchBar
					placeHolder="Search by shopname,item,product..."
					style={{ marginTop: 10, backgroundColor: 'white', width: '103%' }}
				/>
			</View>
			<ScrollView horizontal contentContainerStyle={styles.tabsContainer}>
				<View style={{ ...styles.tabs, width: myString.length * 10, height: 40 }}>
					<Text>{myString}</Text>
				</View>
			</ScrollView>
			<ScrollView contentContainerStyle={{ padding: 15 }}>
				<Text style={styles.offerText}>Offers for you</Text>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{[ 1, 2, 3, 4, 5 ].map((item, i) => {
						return (
							<View key={i} style={{ ...styles.offerCard, marginLeft: i == 0 ? 0 : 10 }}>
								<Image style={styles.offerImg} source={appImages.appImages.LOGINBG} />
								<Text style={styles.offerPercent}>50% Offer</Text>
								<Text style={styles.restName}>New Shops</Text>
							</View>
						);
					})}
				</ScrollView>
				<Text style={{ ...styles.offerText, marginTop: 10 }}>Shops near by you</Text>
				<View style={styles.restContainer}>
					<View style={{ flexDirection: 'row', width: '100%' }}>
						<View style={{ ...styles.nearRestCard }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Shop1</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Shop2</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Shop3</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', width: '100%' }}>
						<View style={{ ...styles.nearRestCard }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Shop4</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Shop5</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Shop6</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', width: '100%' }}>
						<View style={{ ...styles.nearRestCard }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Shop7</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Shop8</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Shop9</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
