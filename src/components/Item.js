import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";

const Item = ({item}) => {
    return(
        <View>
            <View>
                <Image 
                    source={{uri: item.image}} 
                    resizeMode="cover"    
                />
            </View>
            <View>
                <Text>{item.name}</Text>
                <Text>{item.category}</Text>
                <Text>{item.description}</Text>
                <Text>{item.price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

}); 

export default Item;