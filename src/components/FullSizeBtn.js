import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FullSizeBtn = ({ onPress, btnTitle, btnTitleStyles, btnColor, style }) => {
	const styles = StyleSheet.create({
		btnStyles: {
			width: '90%',
			backgroundColor: btnColor,
			alignItems: 'center',
			height: 45,
			justifyContent: 'center',
			borderRadius: 10,
			alignSelf: 'center'
		},
		btnText: {
			fontWeight: 'bold',
			fontSize: 16,
			textTransform: 'uppercase',
			color: 'white'
		}
	});
	return (
		<TouchableOpacity
			onPress={() => (onPress ? onPress() : console.log('HI'))}
			style={style ? { ...styles.btnStyles, ...style } : styles.btnStyles}
		>
			<Text style={{ ...styles.btnText, ...btnTitleStyles }}>{btnTitle}</Text>
		</TouchableOpacity>
	);
};

export default FullSizeBtn;

const styles = StyleSheet.create({});
