import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/HomeStyles';
import rolestyles from '../../styles/roleSelectioStyles';

import appColors from '../../utils/appColors';
import getIcon from '../../utils/commonfunctions/getIcon';

export class Support extends Component {
	render() {
		return (
			<View style={{ ...basicStyles.container, ...basicStyles.centerContainer }}>
				<Image source={appImages.appImages.LOGO1} style={rolestyles.logoStyles} />

				<View style={{ marginTop: 20 }}>
					<Text style={{ fontSize: 20, fontWeight: '600', color: appColors.smokyBlack }}>Contact us: </Text>

					<View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
						{getIcon('ion', 'md-location-sharp', { top: 2 }, 25, appColors.primaryColor)}
						<Text style={{ marginLeft: 10, fontSize: 18, color: appColors.smokyBlack }}>
							Jeli, Kelantan , Malaysia
						</Text>
					</View>
					<View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
						{getIcon('ion', 'ios-call', { top: 2 }, 25, appColors.primaryColor)}

						<Text style={{ marginLeft: 10, marginTop: 10, fontSize: 18, color: appColors.smokyBlack }}>
							+6012-3456789
						</Text>
					</View>
					<View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
						{getIcon('ion', 'ios-mail', { top: 2 }, 25, appColors.primaryColor)}

						<Text style={{ marginLeft: 10, marginTop: 10, fontSize: 18, color: appColors.smokyBlack }}>
							support@djeli.com
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Support);
