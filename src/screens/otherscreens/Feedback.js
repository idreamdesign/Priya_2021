import React, { Component, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import { connect } from 'react-redux';
import appImages from '../../assets';
import FullSizeBtn from '../../components/FullSizeBtn';
import CustomInput from '../../components/textinput/CustomInput';
import { sendFeedback } from '../../redux/root.actions';
import basicStyles from '../../styles/basicStyles';
import styles from '../../styles/HomeStyles';
import rolestyles from '../../styles/roleSelectioStyles';
import _ from 'lodash';

import appColors from '../../utils/appColors';
import getIcon from '../../utils/commonfunctions/getIcon';
import { formErrorValue, getTrimValueLength } from '../../utils/commonfunctions/validations';

const Feedback = (props) => {
	const [ feedback, setFeedback ] = useState(undefined);
	const [ loading, setLoading ] = useState(false);
	const [ feedBackError, setFeedbackError ] = useState(false);
	const sendFeedback = () => {
		const formData = validateFields();

		console.log(formData, 'FormData;::::::::::');
		if (formData) {
			setLoading(true);

			props.sendFeedback(
				formData,
				(res) => {
					console.log(res);
					props.navigation.navigate('Home');
					// const response = res.data;
					// console.log(response);
				},
				true
			);
			setLoading(false);
		} else {
			Snackbar.show({
				text: 'Please check the details provided!',
				backgroundColor: 'red',
				length: Snackbar.LENGTH_SHORT
			});
		}
	};
	const validateFields = () => {
		let formData = new FormData();

		if (_.isEmpty(feedback)) {
			setFeedbackError('Enter feedback');
			formData = undefined;
		} else if ((!_.isEmpty(feedback) && getTrimValueLength(feedback) < 3) || getTrimValueLength(feedback) > 500) {
			setFeedbackError('Feedback exceeding the limit');
			formData = undefined;
		} else {
			formData && formData.append('message', feedback);
		}

		return formData;
	};
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
				value={feedback}
				onChangeText={(text) => (setFeedbackError(false), setFeedback(text))}
			/>
			{feedBackError && formErrorValue(feedBackError)}

			<Text style={{ marginTop: 5, marginLeft: '6%', color: appColors.grey, alignSelf: 'flex-start' }}>
				Feedback should not exceed 500 characters
			</Text>
			<FullSizeBtn
				onPress={() => sendFeedback()}
				btnColor={appColors.simpleBlue}
				btnTitle={loading ? <ActivityIndicator size={'small'} color={appColors.white} /> : 'Submit feedback'}
				style={{ marginTop: 20 }}
			/>
		</View>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendFeedback: (requestData, onResponse, showSnackBar) => {
			dispatch(sendFeedback(requestData, onResponse, showSnackBar));
		}
	};
};
export default connect(null, mapDispatchToProps)(Feedback);
