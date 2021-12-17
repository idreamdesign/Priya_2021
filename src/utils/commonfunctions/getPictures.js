const BASE_URL = 'https://djeli.com.my/lms/';

const getProfileImage = (path) => {
	return BASE_URL.concat(path);
};

export default getProfileImage;
