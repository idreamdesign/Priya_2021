import { StyleSheet } from 'react-native';
import appColors from '../utils/appColors';

const styles = StyleSheet.create({
	bgImg: {
		height: '100%',
		width: '100%'
	},
	logoStyles: {
		height: 175,
		width: 175,
		alignSelf: 'center',
		marginTop: '20%'
	},
	selectionContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '10%'
	},
	roleCard: {
		marginLeft: '7.5%',
		marginRight: '7.5%',
		width: '35%',
		flexDirection: 'column'
	},
	roleNameContainer: {
		width: '100%',
		height: '15%',
		backgroundColor: appColors.primaryColor,
		alignItems: 'center',
		justifyContent: 'center'
	},
	roleName: {
		fontSize: 18,
		fontWeight: '700',
		color: appColors.white
	},
	roleImg: {
		height: 125,
		width: '100%'
	}
});
export default styles;
