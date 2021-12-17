import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import appColors from '../utils/appColors';

const RatingProgressBar = ({ widthHeight, progressLevel }) => {
	return (
		<View
			style={{
				width: widthHeight.width,
				height: widthHeight.height,
				backgroundColor: appColors.dimGrey,
				borderRadius: (widthHeight.width + widthHeight.height) / 4
			}}
		>
			<View
				style={{
					width: widthHeight.width,
					height: widthHeight.height,
					borderRadius: (widthHeight.width + widthHeight.height) / 3,
					borderTopEndRadius: 0,
					borderBottomEndRadius: 0,
					backgroundColor: appColors.primaryColor,
					width: progressLevel
				}}
			/>
		</View>
	);
};

export default RatingProgressBar;

const styles = StyleSheet.create({});
