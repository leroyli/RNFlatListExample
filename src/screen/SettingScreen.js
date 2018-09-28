/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class SettingScreen extends Component {
    static navigationOptions = {
        title: 'Setting',
    };

    render() {

        const { navigation } = this.props;
        const itemId = navigation.getParam('itemTitle');

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Go to Third library refresh example"
                    onPress={() => this.props.navigation.push('Refresh')}
                />
                <Button
                    title="GO HOME"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}