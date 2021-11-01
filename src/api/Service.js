import { TOKEN } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fetch from './Fetch';
import * as URL from './BaseURL';

class HandleRequestService {
	delete = (endpoint, onResponse, showSnackBar = true) => {
		handleRequestHeaders('DELETE', endpoint, null, onResponse, showSnackBar);
	};

	get = (endpoint, requestData, onResponse, showSnackBar = true) => {
		handleRequestHeaders('GET', endpoint, requestData, onResponse, showSnackBar);
	};
	post = (endpoint, requestData, onResponse, showSnackBar = true) => {
		console.log(requestData, 'FormData::::::::');
		handleRequestHeaders('POST', endpoint, requestData, onResponse, showSnackBar);
	};
}

const handleRequestHeaders = async (methodType, endpoint, requestData, onResponse, showSnackBar) => {
	const jwtToken = await AsyncStorage.getItem(TOKEN);

	console.log('JWT Token:::::::::::: ', jwtToken);

	let requestHeader = {
		method: methodType,
		headers: jwtToken
			? {
					Accept: '*/*',
					'Content-Type': requestData instanceof FormData ? 'multipart/form-data' : 'application/json',
					Authorization: 'Bearer' + ' ' + JSON.parse(jwtToken)
				}
			: {
					Accept: '*/*',
					'Content-Type': requestData instanceof FormData ? 'multipart/form-data' : 'application/json'
				}
	};

	Boolean(requestData) && [
		(requestHeader = {
			...requestHeader,
			body: requestData instanceof FormData ? requestData : JSON.stringify(requestData)
		})
	];

	Fetch.handleFetchRequest(`${URL.BASE_URL}${endpoint}`, requestHeader, onResponse, showSnackBar);
};

const RequestService = new HandleRequestService();

export default RequestService;
