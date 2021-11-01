import React, { useState, Fragment } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import appImages from '../../assets';
import FullSizeBtn from '../../components/FullSizeBtn';
import CustomInput from '../../components/textinput/CustomInput';
import PasswordInput from '../../components/textinput/PasswordInput';
import basicStyles from '../../styles/basicStyles';
import appColors from '../../utils/appColors';

export const ForgotOrChangePassword = (props) => {
	const isChangePassword = props.route.params;
	const [ forgotVisible, setForgotVisible ] = useState(false);
	const ForgotFields = () => {
		return (
			<Fragment>
				{isChangePassword && <PasswordInput helperText="Your old password" placeHolder="Old Password" />}
				<PasswordInput helperText="Minimum 8 characters" placeHolder="New Password" />
				<PasswordInput helperText="Same as create password" placeHolder="Cofirm New Password" />

				<FullSizeBtn
					onPress={() => console.log('Register')}
					btnColor={appColors.simpleBlue}
					btnTitle={isChangePassword ? 'Update Password' : 'Reset'}
					style={{ marginTop: 15 }}
				/>
			</Fragment>
		);
	};
	return (
		<View
			style={{
				...basicStyles.container,
				alignItems: isChangePassword ? 'flex-start' : 'center',
				justifyContent: isChangePassword ? 'flex-start' : 'center'
			}}
		>
			{!isChangePassword && (
				<Image source={appImages.appImages.LOGO1} style={{ height: 150, width: 150, alignSelf: 'center' }} />
			)}
			{forgotVisible || isChangePassword ? (
				<View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
					<ForgotFields />
				</View>
			) : (
				<Fragment>
					{isChangePassword && <PasswordInput helperText="Your old Password" placeHolder="Old Password" />}
					<View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
						<CustomInput helperText="Enter registered phone number" placeHolder="Phone Number" />
						<View style={{ width: '90%', flexDirection: 'row', marginTop: 15 }}>
							<FullSizeBtn
								onPress={() => setForgotVisible(true)}
								btnColor={appColors.primaryColor}
								btnTitle="Coninue"
								style={{ width: '48%' }}
							/>
							<View style={{ width: '4%' }} />
							<FullSizeBtn
								onPress={() => props.navigation.navigate('LoginScreen')}
								btnColor={appColors.simpleBlue}
								btnTitle="Cancel"
								style={{ width: '48%' }}
							/>
						</View>
					</View>
				</Fragment>
			)}
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotOrChangePassword);
