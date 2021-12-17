import {StyleSheet} from 'react-native';
import appColors from '../utils/appColors';
import {WIDTH} from '../utils/constants';

const styles = StyleSheet.create({
  shopCard: {
    borderWidth: 1,
    borderColor: appColors.grey,
    borderRadius: 10,
    padding: 10,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  shopImage: {
    height: 175,
    width: '100%',
    borderRadius: 15,
    resizeMode: 'stretch',
  },
  locationTxt: {
    fontSize: 16,
  },
  locationTxtSmall: {
    fontSize: 15,
  },
  offerCard: {
    backgroundColor: appColors.primaryColor,
    width: 100,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopDetailsContainer: {
    width: '95%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    marginTop: 10,
  },
  shopTitle: {
    fontSize: 22,
    color: appColors.dimBlack,
    fontWeight: '700',
  },
  rateDisOffCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rateDisOffCard: {
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: appColors.placeHolderGrey,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
  },
  itemCard: {
    borderWidth: 1.5,
    borderColor: appColors.placeHolderGrey,
    padding: 10,
    margin: 5,

    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemImg: {
    height: 110,
    width: '90%',
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 16,
    color: appColors.black,
    fontWeight: 'bold',
  },
  itemName: {
    fontSize: 16,
    color: appColors.dimBlack,
    // maxWidth: '70%',
    flexWrap: 'wrap',
  },
  detailsContainer: {flexDirection: 'row', marginTop: 5},
  //shoppingCard
  container: {
    flex: 1,
  },

  imageCard: {
    height: 220,
    width: WIDTH,
    backgroundColor: 'white',
  },
  heading: {
    paddingLeft: 30,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white',
  },
  heading1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  viewStyle: {
    backgroundColor: 'white',
    marginRight: 20,
    marginVertical: 10,
    marginLeft: 15,
    padding: 10,
    marginBottom: 10,
  },
  voucherView: {
    marginRight: 20,
    marginVertical: 10,
    marginLeft: 15,
    padding: 10,
    marginBottom: 10,
  },
  storeBtn: {
    width: 125,
    height: 30,
    backgroundColor: appColors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  sizeCard: {
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#9e9e9e',
    borderRadius: 5,
  },
  featureCard: {
    width: '30%',
    height: 60,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'white',
  },
  checkInput: {
    width: 150,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderColor: appColors.primaryColor,
    height: 35,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flexWrap: 'wrap',
  },
  checkBtn: {
    width: '25%',
    backgroundColor: appColors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    height: 35,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderColor: appColors.primaryColor,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    height: '90%',
    // padding: 35,
  },
  //shoppingCard
});
export default styles;