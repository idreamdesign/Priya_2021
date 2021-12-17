import React, { Fragment, useState } from 'react';
import { View, Text, Modal } from 'react-native';
import store from '../redux/store';
import appColors from '../utils/appColors';
import RadioButton from './RadioButton';

const GradePopup = ({ visiblity, onClose, onSelect }) => {
	const gradeOptions = store.getState().auth.gradeDetails;
	const userDetails = store.getState().auth.userDetails;

	const [ selectedGrade, setSelectedGrade ] = useState(undefined);
	console.log(gradeOptions);
	return (
		<Modal
			onRequestClose={onClose}
			style={{ alignItems: 'center', justifyContent: 'center' }}
			visible={visiblity}
			transparent
		>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View
					style={{
						backgroundColor: appColors.white,
						borderWidth: 1,
						borderColor: appColors.primaryColor,
						padding: 10,
						width: '60%'
					}}
				>
					<Text style={{ fontSize: 15, fontWeight: '500', marginBottom: 10 }}>Grade List</Text>
					{gradeOptions &&
						gradeOptions.map((option, index) => {
							return (
								<Fragment key={index}>
									<RadioButton
										label={option.label}
										style={{
											marginTop: 10,
											borderBottomWidth: 1,
											borderBottomColor: appColors.dimGrey,
											paddingBottom: 20
										}}
										checked={selectedGrade && selectedGrade == option.value}
										onChange={() => (
											setSelectedGrade(option.value), onSelect(option.value, option.label)
										)}
									/>
								</Fragment>
							);
						})}
				</View>
			</View>
		</Modal>
	);
};

export default GradePopup;
