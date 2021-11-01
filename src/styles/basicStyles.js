import { StyleSheet, Dimensions } from 'react-native';
import appColors from '../utils/appColors';
import { HEIGHT, WIDTH } from '../utils/constants';

const basicStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: appColors.white,
		height: HEIGHT,
		width: WIDTH
	},
	sideMenuStyle: {
		margin: 0,
		width: Dimensions.get('window').width * 0.75
	},
	safeAreaView: {
		flex: 1,
		backgroundColor: '#fff'
	},
	menuContainer: {
		margin: 12,
		flex: 1,
		padding: 20
	},
	swithBlock: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	bgprofile: {
		backgroundColor: appColors.primaryColor
	},
	centeralign: {
		padding: 10,
		alignItems: 'center',
		flexDirection: 'row'
		// alignContent: 'center'
		// justifyContent: 'center'
	},
	details: {
		marginLeft: 15
	},
	profileImg: {
		height: 100,
		width: 100,
		borderRadius: 50
	},
	usericon: {
		width: 50,
		height: 50,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 50
	},
	textheader: {
		fontSize: 17,
		fontWeight: 'bold',
		color: appColors.white
	},
	studentName: {
		fontSize: 13,
		marginVertical: 5,
		color: appColors.white
	},
	description: {
		fontWeight: '400',
		color: appColors.grey,
		fontSize: 16
	}
});
export default basicStyles;
