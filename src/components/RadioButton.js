import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import appColors from '../utils/appColors';

const RadioButton = ({ label, style, checked, onChange }) => {
	const styles = StyleSheet.create({
		btnContainer: { flexDirection: 'row', ...style },
		outerContainer: {
			height: 20,
			width: 20,
			borderRadius: 10,
			borderWidth: 2,
			borderColor: appColors.primaryColor,
			alignItems: 'center',
			justifyContent: 'center'
		},
		innerContainer: {
			height: 12,
			width: 12,
			borderRadius: 6,
			backgroundColor: checked ? appColors.primaryColor : appColors.white
		},
		btnLabel: {
			marginLeft: 10,
			color: appColors.grey
		}
	});
	return (
		<TouchableOpacity onPress={onChange} style={styles.btnContainer}>
			<View>
				<View style={styles.outerContainer}>
					<View style={styles.innerContainer} />
				</View>
			</View>
			<Text style={styles.btnLabel}>{label || ''}</Text>
		</TouchableOpacity>
	);
};

export default RadioButton;
