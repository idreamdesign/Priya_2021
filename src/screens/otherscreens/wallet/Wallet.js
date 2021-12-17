import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import basicStyles from '../../../styles/basicStyles';
import getIcon from '../../../utils/commonfunctions/getIcon';

export const Wallet = (props) => {
	return (
		<View style={basicStyles.container}>
			<View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
				{getIcon('ion', 'wallet', null, 100)}
				<Text style={{ fontWeight: '700' }}>Wallet is empty</Text>
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
