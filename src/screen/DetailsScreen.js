/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class DetailsScreen extends Component {
    static navigationOptions = {
        title: 'Details',
    };

    componentDidMount() {
        console.log('>>>>the state is '+ this.props.navigation.state)
    }

    render() {

        const { navigation } = this.props;
        const itemId = navigation.getParam('itemTitle');

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{fontSize: 30, color: 'blue'}}>{itemId}</Text>

            </View>
        );
    }
}






















