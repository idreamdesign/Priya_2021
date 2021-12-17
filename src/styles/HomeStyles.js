import {StyleSheet} from 'react-native';
import appColors from '../utils/appColors';

const styles = StyleSheet.create({
  searchBarContainer: {
    height: 55,
    width: '100%',
    backgroundColor: appColors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
    alignSelf: 'center',
  },

  categoryHeading: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: appColors.black,
    width: '50%',
  },
  selectGrade: {
    height: 25,
    width: '30%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.grey,
    backgroundColor: appColors.cement,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectGradeTxt: {
    fontSize: 14,
  },
  categoryCard: {
    height: 125,
    width: 200,
    borderWidth: 1,
    borderColor: appColors.placeHolderGrey,
    borderRadius: 10,
    marginLeft: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catTitle: {
    fontSize: 16,
    width: '40%',
    fontWeight: 'bold',
  },
  categoryImg: {
    height: '80%',
    width: '60%',
    maxWidth: '50%',
  },
  divisionalCard: {
    width: '100%',
    marginTop: 10,
    padding: 10,
    height: 180,
    backgroundColor: appColors.palePink,
  },
  divisionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divisionInnerCard: {
    height: 100,
    width: 100,
    maxHeight: 100,
    maxWidth: 100,
    borderWidth: 1,
    borderColor: appColors.placeHolderGrey,
    borderRadius: 10,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.white,
  },
  divisionSub: {
    fontSize: 14,
    marginTop: 5,
  },
  topImg: {
    height: '50%',
    width: '50%',
  },
  classesCard: {
    width: 200,
    padding: 5,
  },
  continueImg: {
    height: '60%',
    width: '80%',
    borderRadius: 10,
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: appColors.smokyBlack,
  },
  //ECOM HOME
  offerText: {
    color: appColors.smokyBlack,
    fontSize: 20,
    fontWeight: '500',
  },
  offerCard: {
    borderWidth: 1,
    borderColor: appColors.primaryColor,
    borderRadius: 10,
    padding: 8,
    marginTop: 15,
    maxWidth: 175,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerImg: {
    height: 100,
    width: 150,
    borderRadius: 10,
  },
  offerPercent: {
    marginTop: 5,
    color: appColors.primaryColor,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  restName: {
    marginTop: 3,
    color: appColors.dimBlack,
    fontSize: 16,
    fontWeight: '600',
    // alignSelf: 'flex-start',
  },
  restContainer: {
    width: '110%',
    maxWidth: '110%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearRestCard: {
    borderWidth: 1,
    borderColor: appColors.grey,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    padding: 5,
  },
  nearRestImg: {
    height: 75,
    width: '90%',
  },
  nearRestName: {
    marginTop: 5,
    fontSize: 14,
  },
  locationTxt: {
    marginTop: 5,
    fontSize: 15,
  },
  availabilityTxt: {
    marginTop: 5,
    fontSize: 13,
  },
  //lms
  locationContainer: {
    width: '100%',
    backgroundColor: appColors.primaryColor,
    display: 'flex',
    flexDirection: 'row',
    aligSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '400',
    color: appColors.white,
    width: '90%',
  },
  tabsContainer: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    borderWidth: 1,
    borderColor: appColors.smokyBlack,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //lms
});

export default styles;
