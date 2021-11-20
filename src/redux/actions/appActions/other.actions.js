import RequestService from '../../../api/Service';
import Endpoints from '../../../api/Endpoints';
import * as Types from '../../root.types';

// Other Actions (Profile, Settings, etc)

export const loadingStatus = (loaderStatus) => {
	return {
		type: Types.GET_LOADING_STATUS,
		payload: loaderStatus
	};
};
export const paymentHistory = (requestData, onResponse, showSnackBar) => {
	console.log(requestData, 'requestDatarequestData');
	return (dispatch) => {
		RequestService.get(
			Endpoints.PAYMENT_HISTORY,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const getUpcomingCourses = (requestData, onResponse, showSnackBar) => {
	console.log(requestData, 'requestDatarequestData');
	return (dispatch) => {
		RequestService.get(
			Endpoints.UPCOMING_COURSES,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};
