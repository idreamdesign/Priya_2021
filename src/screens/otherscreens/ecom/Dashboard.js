import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../../assets';
import SearchBar from '../../../components/SearchBar';
import basicStyles from '../../../styles/basicStyles';
import styles from '../../../styles/HomeStyles';

export const Dashboard = (props) => {
	return (
		<View style={basicStyles.container}>
			<View style={styles.searchBarContainer}>
				<SearchBar placeHolder="Search food" style={{ marginTop: 10, backgroundColor: 'white' }} />
			</View>
			<ScrollView contentContainerStyle={{ padding: 15 }}>
				<Text style={styles.offerText}>Offers for you</Text>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{[ 1, 2, 3, 4, 5 ].map((item, i) => {
						return (
							<View key={i} style={{ ...styles.offerCard, marginLeft: i == 0 ? 0 : 10 }}>
								<Image style={styles.offerImg} source={appImages.appImages.LOGINBG} />
								<Text style={styles.offerPercent}>50% Offer</Text>
								<Text style={styles.restName}>New Restaurant</Text>
							</View>
						);
					})}
				</ScrollView>
				<Text style={{ ...styles.offerText, marginTop: 10 }}>Restaurants nearby you</Text>
				<View style={styles.restContainer}>
					<View style={{ flexDirection: 'row', width: '100%' }}>
						<View style={{ ...styles.nearRestCard }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Restaurant1</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Restaurant2</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Restaurant3</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', width: '100%' }}>
						<View style={{ ...styles.nearRestCard }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Restaurant4</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Restaurant5</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Restaurant6</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', width: '100%' }}>
						<View style={{ ...styles.nearRestCard }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Restaurant7</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Restaurant8</Text>
						</View>
						<View style={{ ...styles.nearRestCard, marginLeft: '5%' }}>
							<Image style={styles.nearRestImg} source={appImages.otherImages.FOOD} />

							<Text style={styles.nearRestName}>Restaurant9</Text>
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
