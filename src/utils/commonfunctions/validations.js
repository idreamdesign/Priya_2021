import React from 'react';
<<<<<<< HEAD
import { Text } from 'react-native';

export const getTrimValueLength = (value) => {
	let newValue = String(value);
	return newValue.trim().length;
};
export const formErrorValue = (errorText, style) => {
	return (
		<Text style={{ ...style, color: 'red', marginLeft: '5.5%', marginTop: 10, alignSelf: 'flex-start' }}>
			{errorText}
		</Text>
	);
=======
import {Text} from 'react-native';

export const getTrimValueLength = value => {
  let newValue = String(value);
  return newValue.trim().length;
};
export const formErrorValue = (errorText, style) => {
  return (
    <Text
      style={{
        color: 'red',
        marginLeft: '5.5%',
        marginTop: 10,
        alignSelf: 'flex-start',
        ...style,
      }}>
      {errorText}
    </Text>
  );
>>>>>>> master
};
