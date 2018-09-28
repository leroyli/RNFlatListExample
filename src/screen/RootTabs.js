import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import DetailsScreen from './DetailsScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import TabBarItemComponent from './TabBarItemComponent';
import RefreshListScreen from './RefreshListScreen';


export default class RootTabs extends Component {
    render() {
        return(
            <Tabs/>
        )
    }
}


const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Detail: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

HomeStack.navigationOptions = ({ navigation }) => {
    return {
        tabBarVisible: navigation.state.index === 0,
    };
};


const SettingStack = createStackNavigator(
    {
        Setting: {
            screen: SettingScreen,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            },
        },
        Detail: {
            screen: DetailsScreen,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            },
        },

        Refresh: {
            screen: RefreshListScreen,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            },
        },
    },
);


const Tabs = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Home',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItemComponent
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../image/home_normal.png')}
                        selectedImage={require('../image/home_select.png')}
                    />
                )
            }),
        },
        Setting: {
            screen: SettingStack,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Setting',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItemComponent
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../image/setting_normal.png')}
                        selectedImage={require('../image/setting_select.png')}
                    />
                )
            }),
        },
    },


    {
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            labelStyle: {
                fontSize: 15,
            },

        },
    }


);