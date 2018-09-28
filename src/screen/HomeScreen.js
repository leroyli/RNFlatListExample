/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DetailsScreen from './DetailsScreen';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            refreshing: false,
        };
    }

    static navigationOptions = {
        title: 'Home',
        headerRight: (
            <Button
                onPress={() => {}}
                title="item"
                color="#fff"
            />
        ),
    }


    componentDidMount() {
        this.loadList();
    }

    render() {

        if (this.state.refreshing) {
            return this.renderEmptyView();
        }

        return (

            <View style={styles.container}>

                <FlatList
                    data = {this.state.movies}
                    renderItem = {this.renderItem.bind(this)}
                    keyExtractor = {(item) => item.id}
                    ItemSeparatorComponent = {this.renderLineView}
                    refreshing = {this.state.refreshing}
                    onRefresh = {this.handRefresh.bind(this)}
                    /* 加载下一页
                    onEndReachedThreshold={0.5}
                    onEndReached={this.handRefresh.bind(this)}
                    */
                />

            </View>

        );
    }

    handRefresh = () => {
        this.setState({
            refreshing: true,
            movies: [],
        }, () => {
            this.loadList();
        });
    }

    renderEmptyView() {
        return(
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size= 'large'
                                   color= 'red'
                                   animating={this.state.refreshing}
                />
                <Text style={{fontSize:22, color: 'black'}}>Loading...</Text>
            </View>
        );
    }

    jumpToDetail(text) {
        this.props.navigation.navigate('Detail', {
            itemTitle: text,
        })
    }

    renderLineView() {
        return(
            <View style={styles.line}/>
        );
    }

    renderItem = (item) => {

        return(
            <TouchableOpacity style={styles.items} onPress={this.jumpToDetail.bind(this, item.item.title)}>
                <View style={styles.center}>
                    <Text style={styles.font}>{item.item.title}</Text>
                </View>
            </TouchableOpacity>
        );

    }

    loadList() {

        let url = 'https://api.douban.com/v2/movie/coming_soon?city=北京';

        fetch(url)
            .then(response => response.json())
            .then(responseData => {

                console.log('>>>>the data is'+responseData.subjects);

                let moviesData = [];

                for(let i in responseData.subjects) {
                    let movieItem = responseData.subjects[i];
                    console.log('the title is'+movieItem.title);
                    moviesData.push(movieItem);
                }

                console.log('>>>>the movies is'+moviesData)

                this.setState({
                    movies: moviesData,
                    refreshing: false,
                });

            }).catch(error => {
            console.error('>>>the error is'+error);
        });

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    items: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex: {
        flex: 1,
    },
    font: {
      fontSize: 20,
      color: 'black',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    line: {
        height: 0.5,
        backgroundColor: 'gray',
    },
});

