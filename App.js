import React, { Component } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
// import GlobalFont from 'react-native-global-font';
// import InAppUpdate from './InAppUpdate';
import Root from './src/navigation/Root';
import Store from './src/redux/store';
import * as RootNavigation from './src/utils/RootNavigation';
import appColors from './src/utils/appColors';
import BottomNavbar from './src/components/BottomNavbar';
import EcomNavbar from './src/components/EcomNavbar';

export default class App extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.

    this.state = {
      menuRoutes: ['Home', 'FavouriteList', 'Wallet', 'Profile'],
      ecomMenuRoutes: ['Dashboard', 'SearchHistory'],
      currentRoute: '',
      isSubscribed: false,
      requiresPrivacyConsent: false,
      isLocationShared: false,
      inputValue: '',
      consoleValue: '',
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={appColors.primaryColor}
        />
        <Provider store={Store}>
          <NavigationContainer
            ref={RootNavigation.navigationRef}
            onStateChange={state => {
              console.log(state);
              console.log(state.routes[state.routes.length - 1].name);
              state.routes.length != 0 &&
                this.setState({
                  currentRoute: state.routes[state.routes.length - 1].name,
                });
            }}>
            <Root />
            {this.state.menuRoutes.includes(this.state.currentRoute) && (
              <BottomNavbar currentRoute={this.state.currentRoute} />
            )}
            {this.state.ecomMenuRoutes.includes(this.state.currentRoute) && (
              <EcomNavbar currentRoute={this.state.currentRoute} />
            )}
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    );
  }
}
