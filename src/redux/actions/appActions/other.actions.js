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

export const profileBase = (profileBase) => {
	return {
		type: Types.PROFILE_BASE,
		payload: profileBase
	};
};

export const timeLine = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.TIMELINE,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const userPosts = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.USER_POSTS,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const postDetails = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.POST_DETAILS,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const hqPosts = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.HQ_POST,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const suggestedList = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.SUGGESTED_LIST,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const followersList = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.FOLLOWERS,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const followingList = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.FOLLOWING,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const memberDetails = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.MEMBER_DETAILS,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const memberFriendDetails = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.MEMBER_FRIEND_DETAILS,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const getComments = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.COMMENT_SECTION,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const emailCheck = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.EMAIL_CHECK,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const memberStatement = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.MEMBER_STATEMENT,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const getCountriesList = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.COUNTRY,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const getStateList = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.STATE_LIST,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const getCityList = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.CITY_LIST,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const getVideoUpload = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.VIDEO_UPLOAD,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const getUserChatList = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.CHAT_LIST,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const getConversationList = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.CONVERSATION_LIST,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};

export const getNotifcationList = (requestData, onResponse, showSnackBar) => {
	return (dispatch) => {
		RequestService.post(
			Endpoints.NOTIFICATION_LIST,
			requestData,
			(response) => {
				onResponse(response);
			},
			showSnackBar
		);
	};
};
