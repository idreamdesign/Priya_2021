import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/paymentHistoryStyles';

export const PaymentHistory = (props) => {
	return (
		<ScrollView contentContainerStyle={{ ...basicStyles.container, flex: 0, height: undefined }}>
			{Array.from(Array(10).keys()).map((el, i) => {
				return (
					<View key={i} style={styles.paymentCardContainer}>
						<Text style={styles.categoryName}>Category name</Text>
						<Text style={styles.subCatName1}>Category name</Text>
						<Text style={styles.subCatName2}>Category name</Text>
						<View style={styles.modeContainer}>
							<View style={styles.voucherCard}>
								<Text style={styles.voucherTitle}>RM 100</Text>
							</View>
							<Text>payment mode</Text>
						</View>
						<Text style={styles.subCatName3}>Category name</Text>
					</View>
				);
			})}
		</ScrollView>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistory);
