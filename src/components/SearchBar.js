<<<<<<< HEAD
import React, { Fragment, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import appColors from '../utils/appColors';
import getIcon from '../utils/commonfunctions/getIcon';

const SearchBar = ({ style, placeHolder, helperText, helperTextStyles, onChange }) => {
	const [ showPassword, setShowPassword ] = useState(true);
	const styles = StyleSheet.create({
		textInput: {
			borderWidth: 1,
			borderColor: appColors.white,
			height: 40,
			width: '100%',
			borderRadius: 5,
			padding: 10,
			fontSize: 16
		},
		helperStyles: { marginTop: 5, marginLeft: '6%', color: appColors.grey, alignSelf: 'flex-start' }
	});
	return (
		<Fragment>
			<View style={{ alignSelf: 'center', flexDirection: 'row', width: '90%' }}>
				<TextInput
					placeholder={placeHolder ? placeHolder : ''}
					style={style ? { ...styles.textInput, ...style } : { ...styles.textInput }}
				/>
				<TouchableOpacity
					onPress={() => setShowPassword(!showPassword)}
					style={{ right: '70%', top: style && style.height ? style.height / 2.5 : 20 }}
				>
					{getIcon('fa5', 'search', null, 17.5)}
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
=======
import React, {Fragment, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import appColors from '../utils/appColors';
import getIcon from '../utils/commonfunctions/getIcon';

const SearchBar = ({
  style,
  placeHolder,
  helperText,
  helperTextStyles,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const styles = StyleSheet.create({
    textInput: {
      borderWidth: 1,
      borderColor: appColors.white,
      height: 40,
      width: '100%',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
    },
    helperStyles: {
      marginTop: 5,
      marginLeft: '6%',
      color: appColors.grey,
      alignSelf: 'flex-start',
    },
  });
  return (
    <Fragment>
      <View style={{alignSelf: 'center', flexDirection: 'row', width: '90%'}}>
        <TextInput
          placeholder={placeHolder ? placeHolder : ''}
          style={
            style ? {...styles.textInput, ...style} : {...styles.textInput}
          }
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            right: '70%',
            top: style && style.height ? style.height / 2 : 20,
          }}>
          {getIcon('fa5', 'search', null, 17.5)}
        </TouchableOpacity>
      </View>
      {helperText && (
        <Text
          style={
            helperTextStyles
              ? {...helperTextStyles, ...styles.helperStyles}
              : {...styles.helperStyles}
          }>
          {helperText}
        </Text>
      )}
    </Fragment>
  );
>>>>>>> master
};

export default SearchBar;
