import * as Types from '../../root.types';

// Other Reducers (Profile, Settings, etc)

const initialState = { loadingStatus: false };

const otherReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.GET_LOADING_STATUS:
			return { ...state, loadingStatus: action.payload };
		case Types.PROFILE_BASE:
			return { ...state, profileBase: action.payload };
		case Types.COUNTRY_LIST:
			return { ...state, countryList: action.payload };
		case Types.STATE_LIST:
			return { ...state, stateList: action.payload };
		case Types.CITY_LIST:
			return { ...state, cityList: action.payload };
		default:
			return state;
	}
};

export default otherReducer;
