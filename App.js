import React from 'react';

import LoginScreen from './screens/loginScreen';
import {TabNavigator} from './TabNavigator';

import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import createBottomTabNavigator from 'react-navigation-tabs';

export default function App(){
    return(
      <AppContainer/>
    );
}

const switchNavigator = createSwitchNavigator({
  LoginScreen:{screen:LoginScreen},
  TabNavigator: TabNavigator
})

const AppContainer = createAppContainer(switchNavigator)