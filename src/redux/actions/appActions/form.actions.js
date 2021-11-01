import RequestService from '../../../api/Service';
import Endpoints from '../../../api/Endpoints';
import * as Types from '../../root.types';

// Other Actions (Profile, Settings, etc)

export const updatePersonalDetails = (requestData, onResponse, showSnackBar) => {
	console.log(requestData, 'requestDatarequestData');
	return (dispatch) => {
		RequestService.post(
			Endpoints.PERSONAL_UPDATE,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const followRequest = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.FOLLOW_REQUEST,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const addComment = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.ADD_COMMENT,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const addReplyComment = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.ADD_REPLY_COMMENT,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const likePost = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.LIKE_POST,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const followUnFollow = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.FOLLOW_UNFOLLOW,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const updateProfile = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.UPDATE_PROFILE,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const updateCover = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.UPDATE_COVER,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const addMultiplePost = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.ADD_POST_MULTIPLE,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const addPost = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.ADD_POST,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const addUserChatMessage = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.ADD_MESSAGE,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};
