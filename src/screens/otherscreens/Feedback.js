import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import appImages from '../../assets';
import FullSizeBtn from '../../components/FullSizeBtn';
import CustomInput from '../../components/textinput/CustomInput';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/HomeStyles';
import rolestyles from '../../styles/roleSelectioStyles';

import appColors from '../../utils/appColors';
import getIcon from '../../utils/commonfunctions/getIcon';

export class Feedback extends Component {
	render() {
		return (
			<View style={{ ...basicStyles.container, ...basicStyles.centerContainer }}>
				<TextInput
					style={{
						borderWidth: 1,
						borderColor: appColors.grey,
						width: '95%',
						alignSelf: 'center',
						borderRadius: 5,
						padding: 10,
						marginTop: 25,
						textAlignVertical: 'top'
					}}
					placeholder="Enter your feedback"
					multiline={true}
					numberOfLines={4}
				/>

				<Text style={{ marginTop: 5, marginLeft: '6%', color: appColors.grey, alignSelf: 'flex-start' }}>
					Feedback should not exceed 500 characters
				</Text>
				<FullSizeBtn
					onPress={() => props.navigation.navigate('Home')}
					btnColor={appColors.simpleBlue}
					btnTitle="Submit  Feedback"
					style={{ marginTop: 20 }}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
