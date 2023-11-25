import React from "react";
import { Swiper } from 'react-native-swiper';
import Icon from "../components/Icon";
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Item from "../components/Item";
import data from '../data/data.json'
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.setState({
            products: data
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.sliderContainer}>
                </View>
                <View style={styles.iconsContainer}>
                    <Icon name="cellphone" iconText="Iphone" />
                    <Icon name="android" iconText="Samsung" />
                    <Icon name="laptop" iconText="Laptop" />
                </View>
                <View style={styles.iconsContainer}>
                    <Icon name="tablet" iconText="Tablet" />
                    <Icon name="mouse" iconText="Mouse" />
                    <Icon name="keyboard-outline" iconText="Keyboard" />
                </View>
                <View>
                    <Text>Most popular producsts</Text>
                    <FlatList 
                        data={this.state.products.popularProducts}
                        renderItem={({item}) => (
                            <View>
                                <Item item={item} />
                            </View>
                        )}
                    />

                    <TouchableOpacity>
                        <Text>View more</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sliderContainer: {
        width: '90%',
        height: 200,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 8
    },
    item: {
        flex: 1,
        justifyContent: 'center'
    },
    imgItem: {
        width: '100%',
        height: '100%',
        borderRadius: 8
    },
    iconsContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default Home; 