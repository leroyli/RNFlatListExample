

import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'

export default class RefreshListScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: [],
            refreshState: RefreshState.Idle,
        }
    }

    static navigationOptions = {
        title: 'Third library refresh',
    }

    componentDidMount() {
        this.handRefresh();
    }

    render() {
        return (
            <View style={styles.container}>

                <RefreshListView
                    data={this.state.movies}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem.bind(this)}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.handRefresh}
                    ItemSeparatorComponent={this.renderLineView}
                />

            </View>
        )
    }

    keyExtractor = (item: any, index: number) => {
        return index
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

    jumpToDetail(text) {
        this.props.navigation.navigate('Detail', {
            itemTitle: text,
        })
    }

    handRefresh = () => {
        this.setState({
            movies: [],
            refreshState: RefreshState.HeaderRefreshing
        }, () => {
            this.loadList();
        });
    }


    renderLineView() {
        return(
            <View style={styles.line}/>
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
                    refreshState: moviesData.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
                })

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
