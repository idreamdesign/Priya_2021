import React, { Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import appColors from '../../utils/appColors';

const CustomInput = ({ style, placeHolder, helperText, helperTextStyles, onChange }) => {
	const styles = StyleSheet.create({
		textInput: {
			borderWidth: 1,
			borderColor: appColors.grey,
			height: 50,
			width: '90%',
			alignSelf: 'center',
			borderRadius: 5,
			padding: 10,
			marginTop: 10
		},
		helperStyles: { marginTop: 5, marginLeft: '6%', color: appColors.grey, alignSelf: 'flex-start' }
	});
	return (
		<Fragment>
			<TextInput
				placeholder={placeHolder ? placeHolder : ''}
				style={style ? { ...style, ...styles.textInput } : { ...styles.textInput }}
			/>
			{helperText && (
				<Text
					style={
						helperTextStyles ? { ...helperTextStyles, ...styles.helperStyles } : { ...styles.helperStyles }
					}
				>
					{helperText}
				</Text>
			)}
		</Fragment>
	);
};

export default CustomInput;
