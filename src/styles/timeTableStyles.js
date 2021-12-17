import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import appColors from '../utils/appColors';

const styles = StyleSheet.create({
	timeTableCard: {
		height: 100,
		borderWidth: 1,
		borderColor: appColors.placeHolderGrey,
		width: '95%',
		alignSelf: 'center',
		padding: 5,
		paddingLeft: 10,
		marginTop: 10,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	timeTableIcon: {
		width: '20%'
	},
	timetableTextContainer: {
		left: 10,
		width: '80%',
		flexDirection: 'column'
	},
	timeTableTitle: {
		fontWeight: '500',
		fontSize: 15,
		color: appColors.smokyBlack
	}
});

export default styles;
