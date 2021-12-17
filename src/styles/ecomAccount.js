import {StyleSheet} from 'react-native';
import appColors from '../utils/appColors';

const styles = StyleSheet.create({
  accountMenus: {
    // height: 60,
    backgroundColor: '#f7f7f7',
    padding: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: appColors.placeHolderGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: appColors.dimBlack,
  },
  menuDesc: {
    fontSize: 16,
    fontWeight: '500',
    color: appColors.dimBlack,
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 5,
  },
  ordersContainer: {
    width: '95%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    marginTop: 10,
  },
});
export default styles;
