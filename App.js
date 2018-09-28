/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image} from 'react-native';
import RootTabs from './src/screen/RootTabs';

export default class App extends Component {
    render() {
        return(
            <RootTabs/>
        )
    }
}
