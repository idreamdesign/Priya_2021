import { StyleSheet } from 'react-native';
import appColors from '../utils/appColors';

const styles = StyleSheet.create({
	imageContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',

		marginTop: 20,
		marginLeft: 10
	},
	profileImg: {
		width: 125,
		height: 125,
		borderRadius: 62.5
	},
	camerafab: {
		height: 50,
		width: 50,
		borderRadius: 25,
		backgroundColor: appColors.primaryColor,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-end',
		bottom: 50
	},
	changePswdBtn: {
		height: 30,
		width: 130,
		marginTop: 15,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: appColors.inkBlue
	},
	detailsContainer: {
		borderBottomWidth: 1,
		padding: 15,
		borderBottomColor: appColors.placeHolderGrey
	},
	detailTitle: {
		fontWeight: '400',
		fontSize: 16,
		color: appColors.grey,
		textTransform: 'capitalize'
	},
	detailValue: {
		fontSize: 14,
		marginTop: 10
	}
});

export default styles;
