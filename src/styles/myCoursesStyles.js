import { StyleSheet } from 'react-native';
import appColors from '../utils/appColors';

const styles = StyleSheet.create({
	courseCard: {
		height: 170,
		borderBottomWidth: 1,
		borderBottomColor: appColors.placeHolderGrey,
		padding: 15
	},

	cardTitle: {
		fontWeight: 'bold',
		fontSize: 16,
		color: appColors.smokyBlack
	},
	cardSubTitle: {
		marginTop: 5,
		fontSize: 16,
		color: appColors.smokyBlack
	},
	classDetailsContainer: {
		flexDirection: 'row',
		width: '100%',
		marginTop: 10
	},
	classImage: {
		height: 80,
		width: '30%',

		borderRadius: 10
	},
	classDesc: {
		flexDirection: 'column',
		marginLeft: 10
	},
	courseOverLay: {},
	videoContainer: {
		height: 200,
		width: '100%',
		backgroundColor: appColors.black
		// position: 'absolute'
	},
	courseTitle: {
		fontWeight: '700',
		fontSize: 16,
		color: appColors.smokyBlack,
		marginTop: 10
	},
	courseDetailsContainer: {
		height: undefined,
		padding: 15,
		paddingTop: -5
	},
	courseDesc: {
		fontSize: 15,
		textAlign: 'justify',
		justifyContent: 'space-evenly',
		marginTop: 10,
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: appColors.placeHolderGrey
	},
	topSpacing: {
		marginTop: 10
	},
	courseRupees: {
		color: appColors.orange,
		fontSize: 16,
		fontWeight: '600'
	},
	curriculumCard: {
		borderBottomWidth: 1,
		borderBottomColor: appColors.placeHolderGrey,
		paddingBottom: 5,
		marginTop: 10,
		flexDirection: 'row',
		padding: 10
	},
	curriculumImg: {
		height: 50,
		width: 75
	},
	curriculumTitle: {
		fontSize: 15,
		color: appColors.smokyBlack,
		fontWeight: '500'
	},
	curriculumDesc: {
		fontSize: 14
	},
	starText: {
		fontSize: 14,
		fontWeight: '600'
	},
	overallRatingBox: {
		backgroundColor: appColors.dimGrey,
		alignItems: 'center',
		justifyContent: 'center',
		width: '35%',
		margin: 10,
		right: '10%'
	},
	overallRating: {
		fontSize: 30,
		fontWeight: '500',
		color: appColors.smokyBlack
	},
	noOfReviews: {
		fontSize: 16
	},
	starNosContainer: {
		width: '10%',
		height: 20,
		borderRadius: 5,
		backgroundColor: appColors.neutralGreen,
		padding: 2,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: -10
	},
	noOfStars: {
		fontWeight: '600',
		color: appColors.white,
		fontSize: 14
	},
	confimationPopupContainer: { width: '90%', backgroundColor: 'white' },
	courseAmnt: {
		height: 40,
		borderWidth: 1,
		borderColor: appColors.grey,
		borderStyle: 'dashed',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10
	},
	priceAndBtnContainer: {
		backgroundColor: appColors.white,
		padding: 5,
		paddingTop: 0,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: appColors.dimGrey,
		paddingBottom: 20
	}
});

export default styles;
