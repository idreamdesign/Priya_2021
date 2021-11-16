import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import NoDataFound from '../../components/NoDataFound';
import { paymentHistory } from '../../redux/root.actions';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/paymentHistoryStyles';
import appColors from '../../utils/appColors';

export const PaymentHistory = (props) => {
	const [ paymentHistory, setPaymentHistory ] = useState(undefined);
	React.useEffect(() => {
		let isActive = true;
		isActive && getPaymentHistory();
		return () => {
			isActive = false;
		};
	}, []);
	const getPaymentHistory = async () => {
		props.paymentHistory(
			null,
			async (res) => {
				let response = res.data;
				response.data.length == 0 ? setPaymentHistory([]) : setPaymentHistory(response.data);
				console.log(response.data, 'Ress');
			},
			false
		);
	};

	return (
		<ScrollView contentContainerStyle={{ ...basicStyles.container, flex: 0, height: undefined }}>
			{paymentHistory ? paymentHistory.length == 0 ? (
				<NoDataFound />
			) : (
				paymentHistory.map((el, i) => {
					console.log(el, 'El');
					return (
						<View key={i} style={styles.paymentCardContainer}>
							<Text style={styles.categoryName}>Category name</Text>
							<Text style={styles.subCatName1}>Category name</Text>
							<Text style={styles.subCatName2}>Category name</Text>
							<View style={styles.modeContainer}>
								<View style={styles.voucherCard}>
									<Text style={styles.voucherTitle}>RM {el.checkout.purchase_price}</Text>
								</View>
								<Text>{el.checkout.payment_method}</Text>
							</View>
							<Text style={styles.subCatName3}>Category name</Text>
						</View>
					);
				})
			) : (
				<Loader />
			)}
		</ScrollView>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		paymentHistory: (requestData, onResponse, showSnackBar) => {
			dispatch(paymentHistory(requestData, onResponse, showSnackBar));
		}
	};
};

export default connect(null, mapDispatchToProps)(PaymentHistory);
