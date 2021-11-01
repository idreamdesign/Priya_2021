import { Dimensions, Image } from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

//LOGIN TOKEN

export const TOKEN = 'TOKENN';

//Api Strings

export const SUCCESS = 'Success';
export const NODATAFOUND = 'No Data found';
export const SOMETHINGWENTWRONG = 'Oops! Something went wrong!';

export const spinner50 = Image.resolveAssetSource(require('../assets/spinner50.gif')).uri;
export const spinner100 = Image.resolveAssetSource(require('../assets/spinner100.gif')).uri;
export const spinner200 = Image.resolveAssetSource(require('../assets/spinner200.gif')).uri;
