import {Dimensions, Image} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

//Api Strings

export const SUCCESS = 'Success';
export const NODATAFOUND = 'No Data found';
export const SOMETHINGWENTWRONG = 'Oops! Something went wrong!';

export const spinner50 = Image.resolveAssetSource(
  require('../assets/spinner50.gif'),
).uri;
export const spinner100 = Image.resolveAssetSource(
  require('../assets/spinner100.gif'),
).uri;
export const spinner200 = Image.resolveAssetSource(
  require('../assets/spinner200.gif'),
).uri;

export const numberRegEx = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const emailRegEx = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

//Asynstorage constants
export const TOKEN = 'TOKEN';
export const ROLESELECTED = 'ROLESELECTED';
export const GRADELIST = 'GRADELIST';
export const CATEGORYLIST = 'CATEGORYLIST';
export const USER_DETAILS = 'USER_DETAILS';
export const SHOP_SELECTED = 'SHOP_SELECTED';
export const ADDRESS_SELECTED = 'ADDRESS_SELECTED';
export const NOTIFICATION_COUNT = 'NOTIFICATION_COUNT';
export const CART_COUNT = 'CART_COUNT';
