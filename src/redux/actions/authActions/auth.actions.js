import RequestService from '../../../api/Service';
import Endpoints from '../../../api/Endpoints';
import * as Types from '../../root.types';

// Authentication Actions (Login, Register, Forgot Password, etc)

// Login Actions

export const login = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.LOGIN,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const forgotPassword = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.FORGOT_PASSWORD,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const checkNric = (nric, onResponse, showSnackBar) => {
	console.log(nric, onResponse, showSnackBar, 'Detail');
	return (dispatch) => {
		RequestService.get(`${Endpoints.NRIC_CHECK}${nric}`, null, onResponse, false);
	};
};

export const resetPassword = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.RESET_PASSWORD,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const signUpPassword = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.SIGNUP,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const storeUserDetails = (userDetails) => {
	console.log('USERDETAILS:::::::>', userDetails);
	return {
		type: Types.GET_USER_DETAILS,
		payload: userDetails
	};
};

export const storeCountryDetails = (countryList) => {
	console.log('countryList:::::::>', countryList);
	return {
		type: Types.COUNTRY_LIST,
		payload: countryList
	};
};
export const storeStateDetails = (stateList) => {
	console.log('stateList:::::::>', stateList);
	return {
		type: Types.STATE_LIST,
		payload: stateList
	};
};

export const storeCityDetails = (cityList) => {
	console.log('cityList:::::::>', cityList);
	return {
		type: Types.CITY_LIST,
		payload: cityList
	};
};
