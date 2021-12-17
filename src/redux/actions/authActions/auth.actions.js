// import RequestService from '../../../api/Service';
// import Endpoints from '../../../api/Endpoints';
import Endpoints from '../../../api/Endpoints';
import RequestService from '../../../api/Service';
import * as Types from '../../root.types';

// Authentication Actions (Login, Register, Forgot Password, etc)

// Login Actions
export const login = (requestData, onResponse, showSnackBar) => {
	console.log(requestData, 'requestDatarequestData');
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
export const getUserData = (requestData, onResponse, showSnackBar) => {
	console.log(requestData, 'requestDatarequestData');
	return (dispatch) => {
		RequestService.get(
			Endpoints.GET_USER_DETAILS,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};
export const register = (requestData, onResponse, showSnackBar) => {
	console.log(requestData, 'requestDatarequestData');
	return (dispatch) => {
		RequestService.post(
			Endpoints.REGISTER,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const getGrades = (requestData, onResponse, showSnackBar) => {
	console.log(requestData, 'requestDatarequestData');
	return (dispatch) => {
		RequestService.get(
			Endpoints.GET_GRADES,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};
export const getCategories = (requestData, onResponse, showSnackBar) => {
	console.log(requestData, 'requestDatarequestData');
	return (dispatch) => {
		RequestService.get(
			Endpoints.GETCATEGORIES,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const getUserDetails = (userDetails) => {
	console.log('userDetails:::::::>', userDetails);
	return {
		type: Types.GET_USER_DETAILS,
		payload: userDetails
	};
};
export const storeRoleDetails = (roleDetails) => {
	console.log('RoleDetails:::::::>', roleDetails);
	return {
		type: Types.ROLE_SELECTED,
		payload: roleDetails
	};
};

export const storeGradeDetails = (gradeList) => {
	console.log('gradeList:::::::>', gradeList);
	return {
		type: Types.GRADE_LIST,
		payload: gradeList
	};
};

export const storeCategoryDetails = (categoryList) => {
	console.log('categoryList:::::::>', categoryList);
	return {
		type: Types.CATEGORY_LIST,
		payload: categoryList
	};
};
