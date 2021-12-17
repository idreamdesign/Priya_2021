import React, { Fragment, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import appColors from '../../utils/appColors';
import getIcon from '../../utils/commonfunctions/getIcon';

const PasswordInput = ({ style, placeHolder, helperText, helperTextStyles, onChange, initialValue }) => {
	const [ showPassword, setShowPassword ] = useState(false);
	const styles = StyleSheet.create({
		textInput: {
			borderWidth: 1,
			borderColor: appColors.grey,
			height: 50,
			width: '100%',
			borderRadius: 5,
			padding: 10,
			marginTop: 10
		},
		helperStyles: { marginTop: 5, marginLeft: '6%', color: appColors.grey, alignSelf: 'flex-start' }
	});
	return (
		<Fragment>
			<View style={{ alignSelf: 'center', flexDirection: 'row', width: '90%' }}>
				<TextInput
					secureTextEntry={!showPassword}
					value={initialValue}
					onChangeText={(text) => onChange(text)}
					placeholder={placeHolder ? placeHolder : ''}
					style={style ? { ...style, ...styles.textInput } : { ...styles.textInput }}
				/>
				<TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ right: '70%', top: 25 }}>
					{getIcon('fa5', showPassword ? 'eye' : 'eye-slash', null, 25)}
				</TouchableOpacity>
			</View>
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

export default PasswordInput;
