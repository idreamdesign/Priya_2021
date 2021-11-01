import { StyleSheet } from 'react-native';
import appColors from '../utils/appColors';

const styles = StyleSheet.create({
	paymentCardContainer: {
		height: 160,
		borderBottomWidth: 1,
		borderBottomColor: appColors.placeHolderGrey,
		padding: 10
	},
	categoryName: {
		fontWeight: 'bold',
		fontSize: 18,
		color: appColors.smokyBlack
	},
	subCatName1: {
		fontSize: 16,
		color: appColors.grey,
		marginTop: 5
	},
	subCatName2: {
		fontSize: 14,
		color: appColors.grey,
		marginTop: 5
	},
	modeContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between'
	},
	voucherCard: {
		height: 30,
		width: 100,
		borderWidth: 1,
		borderColor: appColors.placeHolderGrey,
		borderStyle: 'dashed',
		marginTop: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	voucherTitle: {
		color: appColors.darkGreen
	},
	subCatName3: {
		fontSize: 14,
		color: appColors.primaryColor,
		marginTop: 5
	}
});
export default styles;
