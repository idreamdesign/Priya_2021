import { SUCCESS, NODATAFOUND, SOMETHINGWENTWRONG } from '../utils/constants';
import Snackbar from 'react-native-snackbar';
import Store from '../redux/store';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../redux/store';
import { CommonActions } from '@react-navigation/native';
import * as RootNavigation from '../utils/RootNavigation';
import appColors from '../utils/appColors';

class HandleFetchRequest {
	handleFetchRequest = (endpoint, headers, onResponse, showSnackBar) => {
		console.log('REQUEST ENDPOINT::: ', endpoint);
		console.log('REQUEST HEADERS::: ', headers);

		fetch(endpoint, headers)
			.then(handleResponse)
			.then((successResponse) => {
				console.log('SUCCESS RESPONSE::: ', successResponse);

				handleSuccessResponse(successResponse, onResponse, showSnackBar);
			})
			.catch((errorResponse) => {
				console.log('ERROR RESPONSE::: ', errorResponse);
				handleErrorResponse(errorResponse, onResponse);
			});
	};
}

const handleResponse = async (response) => {
	const resJson = response.json();
	const statusCode = response.status;
	return Promise.all([ statusCode, resJson ]).then((res) => ({
		statusCode: res[0],
		resJson: res[1]
	}));
};

const handleSuccessResponse = (successResponse, onResponse, showSnackBar = true) => {
	const response = successResponse.resJson;
	if (successResponse?.statusCode == 200) {
	  if (!showSnackBar) {
	    onResponse(response);
	  } else if(response.success==false) {
	    Snackbar.show({
	      text: String(response.message),
	      backgroundColor: 'red',
	      textColor: 'white',
	      length: Snackbar.LENGTH_SHORT,
	    });
	    onResponse(response);
	  }else {
	    Snackbar.show({
	      text: String(response.message),
	      backgroundColor: 'green',
	      textColor: 'white',
	      length: Snackbar.LENGTH_SHORT,
	    });
	    onResponse(response);
	  }
	} else if (successResponse?.statusCode == 401) {
		
		  Snackbar.show({
			text: 'Invalid credentials!',
			textColor: 'white',
			backgroundColor: 'red',
			length: Snackbar.LENGTH_SHORT,
		  });
		}else  {
	  Snackbar.show({
	    text: 'Opps!Something went wrong',
	    textColor: 'white',
	    backgroundColor: 'red',
	    length: Snackbar.LENGTH_SHORT,
	  });
	}
};

const handleErrorResponse = async (errorResponse, onResponse) => {
	const response = errorResponse.message;

	if (typeof response == 'string' && response.includes('JSON Parse error')) {
		// const keys = await AsyncStorage.getAllKeys();
		// console.log('async keys:::>', keys);
		// if (keys.length >= 0) {
		//   await AsyncStorage.multiRemove(keys);
		//   store.dispatch(logout());
		// }
	} else {
		Snackbar.show({
			backgroundColor: appColors.red,
			duration: Snackbar.LENGTH_LONG,
			text: SOMETHINGWENTWRONG
		});
	}
};

const FetchRequest = new HandleFetchRequest();

export default FetchRequest;
