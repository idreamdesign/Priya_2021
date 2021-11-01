import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import appColors from '../utils/appColors';
import getIcon from '../utils/commonfunctions/getIcon';
import _ from 'lodash';

const Rating = ({ rating, style, iconSize, iconColor }) => {
	const ratingString = String(rating);
	let full = Number(ratingString.split('.')[0]);
	let half = Number(ratingString.split('.')[1]) == 0 || _.isNaN(Number(ratingString.split('.')[1])) ? false : true;
	let empty = Math.floor(5 - Number(ratingString));

	return (
		<View style={{ ...style, flexDirection: 'row' }}>
			{full != 0 &&
				full <= 5 &&
				Math.sign(full) != -1 &&
				[ ...Array(full) ].map((elementInArray, index) => (
					<Fragment key={index}>
						{getIcon(
							'mc',
							'star',
							{ top: 2 },
							iconSize ? iconSize : 25,
							iconColor ? iconColor : appColors.primaryColor
						)}
					</Fragment>
				))}
			{full <= 5 &&
			empty <= 5 &&
			half && (
				<Fragment>
					{getIcon(
						'mc',
						'star-half-full',
						{ top: 2 },
						iconSize ? iconSize : 25,
						iconColor ? iconColor : appColors.primaryColor
					)}
				</Fragment>
			)}
			{full == 0 &&
				[ ...Array(5) ].map((emp, index) => (
					<Fragment key={index}>
						{getIcon(
							'mc',
							'star-outline',
							{ top: 2 },
							iconSize ? iconSize : 25,
							iconColor ? iconColor : appColors.grey
						)}
					</Fragment>
				))}
			{empty != 0 &&
				empty < 5 &&
				Math.sign(empty) != -1 &&
				[ ...Array(empty) ].map((emp, index) => (
					<Fragment key={index}>
						{getIcon(
							'mc',
							'star-outline',
							{ top: 2 },
							iconSize ? iconSize : 25,
							iconColor ? iconColor : appColors.grey
						)}
					</Fragment>
				))}
		</View>
	);
};

export default Rating;
