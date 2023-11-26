import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Card, Text, DataTable } from "react-native-paper";
import tailwind from "twrnc";
import * as WebBrowser from 'expo-web-browser';


const Home = () => {
    const [result, setResult] = useState(null);

    const openBrowser = async () => {
        let result = await WebBrowser.openBrowserAsync('https://scied.ucar.edu/learning-zone/air-quality/what-is-air-quality');
        setResult(result);
    };

    const tableHead = ['AQI', 'Air Pollution Level'];
    const tableData = [
        ['0 - 50', 'Good'],
        ['51 - 100', 'Moderate'],
        ['101-150', 'Unhealthy for Sensitive Groups'],
        ['151-200', 'Unhealthy'],
        ['201-300', 'Very unhealthy'],
        ['300+', 'Hazardous'],
    ];


    return (
        <ScrollView>
            <View>
                <Card onPress={openBrowser} style={tailwind`mb-5`}>
                    <Card.Cover source={require('../../assets/images/air-quality.jpg')} />
                    <Card.Content>
                        <Text variant="titleLarge" style={tailwind`mb-2 mt-4`}>What is air quality?</Text>
                        <Text variant="bodyMedium" style={tailwind`mb-3`}>
                            When air quality is good, the air is clear and contains only small
                            amounts of solid particle and...
                        </Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={openBrowser}>Learn More</Button>
                    </Card.Actions>
                </Card>

                <View style={tailwind`mt-5 p-2`}>
                    <Text style={tailwind`text-center text-xl mb-1`}>Air Quality Index Scale</Text>
                    <Card>
                        <Card.Content>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Range</DataTable.Title>
                                    <DataTable.Title>Air Quality</DataTable.Title>
                                </DataTable.Header>

                                {tableData.map((rowData, index) => (
                                    <DataTable.Row key={index}>
                                        {rowData.map((data, cellIndex) => (
                                            <DataTable.Cell key={cellIndex}>{data}</DataTable.Cell>
                                        ))}
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </Card.Content>
                    </Card>

                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor: '#808B97' },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' }
});


export default Home;
