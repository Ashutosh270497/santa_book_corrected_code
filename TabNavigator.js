import React from 'react';
import {View,Text,Image} from 'react-native';
import DonateBook from './screens/DonateBook';
import RequestBook from './screens/RequestBook';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export const TabNavigator = createBottomTabNavigator({
    DonateBook:{screen:DonateBook,
    navigationOptions:{
        tabBarIcon:
        <Image source = {require('./assets/request-list.png')}/>,
        tabBarLabel:"Book Donate",
    }},
    RequestBook:{screen:RequestBook,
    navigationOptions:{
        tabBarIcon:
        <Image source = {require('./assets/request-book.png')}/>,
        tabBarLabel:"Book Request",
    }}
})