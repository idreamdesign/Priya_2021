import * as Types from '../../root.types';

// Authentication Reducers (Login, Register, Forgot Password, etc)

const initialState = { fcmToken: null, newUserDetails: {}, userDetails: {} };

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.FCM_TOKEN:
			return { ...state, fcmToken: action.payload };

		case Types.NEW_USER_DETAILS:
			return { ...state, newUserDetails: action.payload };

		case Types.GET_USER_DETAILS:
			return { ...state, userDetails: action.payload };

		case Types.ROLE_SELECTED:
			return { ...state, roleDetails: action.payload };

		default:
			return state;
	}
};

export default authReducer;
