import { StyleSheet } from 'react-native';
import appColors from '../utils/appColors';

const styles = StyleSheet.create({
	searchBarContainer: {
		height: 70,
		width: '100%',
		backgroundColor: appColors.primaryColor,
		alignItems: 'center',
		justifyContent: 'center'
	},
	categoryHeading: { width: '100%', justifyContent: 'space-between', flexDirection: 'row' },
	categoryTitle: {
		fontWeight: 'bold',
		fontSize: 20,
		color: appColors.black,
		width: '50%'
	},
	selectGrade: {
		height: 25,
		width: '30%',
		flexDirection: 'row',
		alignSelf: 'flex-end',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: appColors.grey,
		backgroundColor: appColors.cement,
		alignItems: 'center',
		justifyContent: 'center'
	},
	selectGradeTxt: {
		fontSize: 14
	},
	categoryCard: {
		height: 125,
		width: 200,
		borderWidth: 1,
		borderColor: appColors.placeHolderGrey,
		borderRadius: 10,
		marginLeft: 5,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	catTitle: {
		fontSize: 16,
		width: '40%',
		fontWeight: 'bold'
	},
	categoryImg: {
		height: '80%',
		width: '60%',
		maxWidth: '50%'
	},
	divisionalCard: {
		width: '100%',
		marginTop: 10,
		padding: 10,
		height: 180,
		backgroundColor: appColors.palePink
	},
	divisionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	divisionInnerCard: {
		height: 100,
		width: 100,
		maxHeight: 100,
		maxWidth: 100,
		borderWidth: 1,
		borderColor: appColors.placeHolderGrey,
		borderRadius: 10,
		marginLeft: 5,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: appColors.white
	},
	divisionSub: {
		fontSize: 14,
		marginTop: 5
	},
	topImg: {
		height: '50%',
		width: '50%'
	},
	classesCard: {
		width: 200,
		padding: 5
	},
	continueImg: {
		height: '60%',
		width: '80%',
		borderRadius: 10
	},
	subTitle: {
		fontWeight: '500',
		fontSize: 14,
		color: appColors.smokyBlack
	}
});

export default styles;