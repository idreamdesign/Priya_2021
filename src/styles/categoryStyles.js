import { StyleSheet } from 'react-native';
import appColors from '../utils/appColors';

const styles = StyleSheet.create({
	categoryCard: {
		height: '20%',
		width: '70%',
		borderRadius: 15,
		borderWidth: 1,
		borderColor: appColors.placeHolderGrey,
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		alignItems: 'center'
	},

	catTitle: {
		fontSize: 25,
		fontWeight: 'bold',
		flexWrap: 'wrap',
		color: appColors.smokyBlack
	},
	cardImg: {
		height: '70%',
		marginLeft: '20%',
		width: '80%'
	},
	oneToOneCard: {
		borderBottomWidth: 1,
		borderBottomColor: appColors.dimGrey,
		padding: 20,
		flexDirection: 'row'
	},
	oneToOneImg: {
		width: '20%',
		height: 75
	},
	onetoOneTitle: {
		fontSize: 16,
		fontWeight: '500',
		color: appColors.smokyBlack
	},
	onetoOneDesc: {
		fontSize: 14,
		marginTop: 5
	},
	bookingBtn: {
		width: 100,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: appColors.primaryColor
	},
	bookNowTxt: {
		color: appColors.primaryColor,
		fontSize: 16,
		fontWeight: '500',
		textTransform: 'uppercase'
	},
	preRecordOuterView: {
		marginTop: 10,
		padding: 8,
		borderBottomWidth: 1,
		borderBottomColor: appColors.dimGrey,
		flexDirection: 'row',
		alignItems: 'center'
	},
	preRecordChapFab: {
		height: 40,
		width: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},

	chapterTxt: {
		color: appColors.white,
		fontSize: 15,
		fontWeight: '700'
	},
	chapterName: {
		fontWeight: '500',
		fontSize: 16,
		color: appColors.smokyBlack,
		marginLeft: 10
	},
	slotAvailabilityContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5,
		alignItems: 'center'
	}
});

export default styles;
