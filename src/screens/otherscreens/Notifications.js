import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import basicStyles from '../../styles/basicStyles';
import getIcon from '../../utils/commonfunctions/getIcon';

export const Notifications = (props) => {
	return (
		<View style={basicStyles.container}>
			<View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
				{getIcon('ion', 'notifications', null, 100)}
				<Text style={{ fontWeight: '700' }}>There is no notifications</Text>
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
