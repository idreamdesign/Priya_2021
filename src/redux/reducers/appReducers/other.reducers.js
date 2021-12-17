import * as Types from '../../root.types';

// Other Reducers (Profile, Settings, etc)

const initialState = {loadingStatus: false};

const otherReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_LOADING_STATUS:
      return {...state, loadingStatus: action.payload};
    case Types.GET_SELECTED_SHOP:
      return {...state, selectedShop: action.payload};
    case Types.GET_SELECTED_ADDRESS:
      return {...state, selectedAddress: action.payload};
    case Types.GET_NOTIFICATION_COUNT:
      return {...state, notificationCount: action.payload};
    case Types.GET_CART_COUNT:
      return {...state, cartCount: action.payload};
    default:
      return state;
  }
};

export default otherReducer;
