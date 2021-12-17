<<<<<<< HEAD
import React, { useState, Fragment } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { connect } from 'react-redux';
=======
import React, {useState, Fragment} from 'react';
import {Image, View, ActivityIndicator} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
>>>>>>> master
import appImages from '../../assets';
import FullSizeBtn from '../../components/FullSizeBtn';
import CustomInput from '../../components/textinput/CustomInput';
import PasswordInput from '../../components/textinput/PasswordInput';
<<<<<<< HEAD
import { changePassword } from '../../redux/root.actions';
import basicStyles from '../../styles/basicStyles';
import appColors from '../../utils/appColors';
import { formErrorValue, getTrimValueLength } from '../../utils/commonfunctions/validations';
import _ from 'lodash';
export const ForgotOrChangePassword = (props) => {
	const isChangePassword = props.route.params;
	const [ forgotVisible, setForgotVisible ] = useState(false);
	//fields for password change
	const [ details, setDetails ] = useState({
		oldPass: undefined,
		pass: undefined,
		confirmPass: undefined
	});
	const [ validationErrors, setValidationErrors ] = useState({
		oldPass: false,
		pass: false,
		confirmPass: false
	});
	const [ loading, setLoading ] = useState(false);
	const handleChangePass = () => {
		const formData = validateFields();

		console.log(formData, 'FormData;::::::::::');
		if (formData) {
			setLoading(true);

			props.changePassword(
				formData,
				(res) => {
					console.log(res);
					props.navigation.navigate('Profile');
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
		let errors = { ...validationErrors };

		if (_.isEmpty(details.oldPass)) {
			errors.oldPass = 'Enter old password';
			formData = undefined;
		} else if (!_.isEmpty(details.oldPass) && getTrimValueLength(details.oldPass) < 8) {
			errors.oldPass = 'Enter valid password';
			formData = undefined;
		} else {
			formData && formData.append('old_password', details.oldPass);
		}
		if (_.isEmpty(details.pass)) {
			errors.pass = 'Enter password';
			formData = undefined;
		} else if (!_.isEmpty(details.pass) && getTrimValueLength(details.pass) < 8) {
			errors.pass = 'Enter valid password';
			formData = undefined;
		} else {
			formData && formData.append('new_password', details.pass);
		}
		if (_.isEmpty(details.confirmPass)) {
			errors.confirmPass = 'Enter confirmation password';
			formData = undefined;
		} else if (details.pass !== details.confirmPass) {
			errors.confirmPass = 'Password Mismatch';
			formData = undefined;
		} else {
			formData && formData.append('confirm_password', details.pass);
		}
		console.log(errors, 'errors');
		setValidationErrors(errors);
		return formData;
	};
	// const ForgotFields = () => {
	// 	return (

	// 	);
	// };

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
					<Fragment>
						{isChangePassword && (
							<Fragment>
								<PasswordInput
									initialValue={details.oldPass}
									onChange={(text) => (
										setValidationErrors({ ...validationErrors, oldPass: false }),
										setDetails({ ...details, oldPass: text })
									)}
									helperText="Your old password"
									placeHolder="Old password"
								/>
								{validationErrors.oldPass && formErrorValue(validationErrors.oldPass)}
							</Fragment>
						)}
						<PasswordInput
							initialValue={details.pass}
							onChange={(text) => (
								setValidationErrors({ ...validationErrors, pass: false }),
								setDetails({ ...details, pass: text })
							)}
							helperText="Minimum 8 characters"
							placeHolder="New Password"
						/>
						{validationErrors.pass && formErrorValue(validationErrors.pass)}

						<PasswordInput
							initialValue={details.confirmPass}
							onChange={(text) => (
								setValidationErrors({ ...validationErrors, confirmPass: false }),
								setDetails({ ...details, confirmPass: text })
							)}
							helperText="Same as create password"
							placeHolder="Cofirm New Password"
						/>
						{validationErrors.confirmPass && formErrorValue(validationErrors.confirmPass)}

						<FullSizeBtn
							onPress={() => handleChangePass()}
							btnColor={appColors.simpleBlue}
							btnTitle={
								loading ? (
									<ActivityIndicator size={'small'} color={appColors.white} />
								) : isChangePassword ? (
									'Update Password'
								) : (
									'Reset'
								)
							}
							style={{ marginTop: 15 }}
						/>
					</Fragment>
				</View>
			) : (
				<Fragment>
					{isChangePassword && (
						<Fragment>
							<PasswordInput
								initialValue={details.pass}
								onChange={(text) => (
									setValidationErrors({ ...validationErrors, pass: false }),
									setDetails({ ...details, pass: text })
								)}
								helperText="Your old password"
								placeHolder="Old password"
							/>
							{validationErrors.pass && formErrorValue(validationErrors.pass)}
						</Fragment>
					)}
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
const mapDispatchToProps = (dispatch) => {
	return {
		changePassword: (requestData, onResponse, showSnackBar) => {
			dispatch(changePassword(requestData, onResponse, showSnackBar));
		}
	};
=======
import {changePassword} from '../../redux/root.actions';
import basicStyles from '../../styles/basicStyles';
import appColors from '../../utils/appColors';
import {
  formErrorValue,
  getTrimValueLength,
} from '../../utils/commonfunctions/validations';
import _ from 'lodash';
export const ForgotOrChangePassword = props => {
  const isChangePassword = props.route.params;
  console.log(isChangePassword, 'Oii selfie');
  const [forgotVisible, setForgotVisible] = useState(false);
  //fields for password change
  const [details, setDetails] = useState({
    oldPass: undefined,
    pass: undefined,
    confirmPass: undefined,
  });
  const [validationErrors, setValidationErrors] = useState({
    oldPass: false,
    pass: false,
    confirmPass: false,
  });
  const [loading, setLoading] = useState(false);
  const handleChangePass = () => {
    const formData = validateFields();

    console.log(formData, 'FormData;::::::::::');
    if (formData) {
      setLoading(true);

      isChangePassword.from == 'ecom'
        ? (Snackbar.show({
            text: 'Password updated succesfully!',
            backgroundColor: appColors.lightGreen,
            length: Snackbar.LENGTH_SHORT,
          }),
          props.navigation.navigate('AccountDetails'))
        : props.changePassword(
            formData,
            res => {
              console.log(res);
              props.navigation.navigate('Profile');
            },
            true,
          );
      setLoading(false);
    } else {
      Snackbar.show({
        text: 'Please check the details provided!',
        backgroundColor: 'red',
        length: Snackbar.LENGTH_SHORT,
      });
    }
  };
  const validateFields = () => {
    let formData = new FormData();
    let errors = {...validationErrors};

    if (_.isEmpty(details.oldPass)) {
      errors.oldPass = 'Enter old password';
      formData = undefined;
    } else if (
      !_.isEmpty(details.oldPass) &&
      getTrimValueLength(details.oldPass) < 8
    ) {
      errors.oldPass = 'Enter valid password';
      formData = undefined;
    } else {
      formData && formData.append('old_password', details.oldPass);
    }
    if (_.isEmpty(details.pass)) {
      errors.pass = 'Enter password';
      formData = undefined;
    } else if (
      !_.isEmpty(details.pass) &&
      getTrimValueLength(details.pass) < 8
    ) {
      errors.pass = 'Enter valid password';
      formData = undefined;
    } else {
      formData && formData.append('new_password', details.pass);
    }
    if (_.isEmpty(details.confirmPass)) {
      errors.confirmPass = 'Enter confirmation password';
      formData = undefined;
    } else if (details.pass !== details.confirmPass) {
      errors.confirmPass = 'Password Mismatch';
      formData = undefined;
    } else {
      formData && formData.append('confirm_password', details.pass);
    }
    console.log(errors, 'errors');
    setValidationErrors(errors);
    return formData;
  };
  // const ForgotFields = () => {
  // 	return (

  // 	);
  // };

  return (
    <View
      style={{
        ...basicStyles.container,
        alignItems: isChangePassword ? 'flex-start' : 'center',
        justifyContent: isChangePassword ? 'flex-start' : 'center',
      }}>
      {!isChangePassword && (
        <Image
          source={appImages.appImages.LOGO1}
          style={{height: 150, width: 150, alignSelf: 'center'}}
        />
      )}
      {forgotVisible || isChangePassword ? (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Fragment>
            {isChangePassword && (
              <Fragment>
                <PasswordInput
                  initialValue={details.oldPass}
                  onChange={text => (
                    setValidationErrors({...validationErrors, oldPass: false}),
                    setDetails({...details, oldPass: text})
                  )}
                  helperText="Your old password"
                  placeHolder="Old password"
                />
                {validationErrors.oldPass &&
                  formErrorValue(validationErrors.oldPass)}
              </Fragment>
            )}
            <PasswordInput
              initialValue={details.pass}
              onChange={text => (
                setValidationErrors({...validationErrors, pass: false}),
                setDetails({...details, pass: text})
              )}
              helperText="Minimum 8 characters"
              placeHolder="New Password"
            />
            {validationErrors.pass && formErrorValue(validationErrors.pass)}

            <PasswordInput
              initialValue={details.confirmPass}
              onChange={text => (
                setValidationErrors({...validationErrors, confirmPass: false}),
                setDetails({...details, confirmPass: text})
              )}
              helperText="Same as create password"
              placeHolder="Cofirm New Password"
            />
            {validationErrors.confirmPass &&
              formErrorValue(validationErrors.confirmPass)}

            <FullSizeBtn
              onPress={() => handleChangePass()}
              btnColor={appColors.simpleBlue}
              btnTitle={
                loading ? (
                  <ActivityIndicator size={'small'} color={appColors.white} />
                ) : isChangePassword ? (
                  'Update Password'
                ) : (
                  'Reset'
                )
              }
              style={{marginTop: 15}}
            />
          </Fragment>
        </View>
      ) : (
        <Fragment>
          {isChangePassword && (
            <Fragment>
              <PasswordInput
                initialValue={details.pass}
                onChange={text => (
                  setValidationErrors({...validationErrors, pass: false}),
                  setDetails({...details, pass: text})
                )}
                helperText="Your old password"
                placeHolder="Old password"
              />
              {validationErrors.pass && formErrorValue(validationErrors.pass)}
            </Fragment>
          )}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <CustomInput
              helperText="Enter registered phone number"
              placeHolder="Phone Number"
            />
            <View style={{width: '90%', flexDirection: 'row', marginTop: 15}}>
              <FullSizeBtn
                onPress={() => setForgotVisible(true)}
                btnColor={appColors.primaryColor}
                btnTitle="Coninue"
                style={{width: '48%'}}
              />
              <View style={{width: '4%'}} />
              <FullSizeBtn
                onPress={() => props.navigation.navigate('LoginScreen')}
                btnColor={appColors.simpleBlue}
                btnTitle="Cancel"
                style={{width: '48%'}}
              />
            </View>
          </View>
        </Fragment>
      )}
    </View>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    changePassword: (requestData, onResponse, showSnackBar) => {
      dispatch(changePassword(requestData, onResponse, showSnackBar));
    },
  };
>>>>>>> master
};

export default connect(null, mapDispatchToProps)(ForgotOrChangePassword);
