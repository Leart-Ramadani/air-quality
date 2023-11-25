import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AboutStackNavigator } from "./StackNavigator";
import BottomTabNavigator from "./TabNavigator";


const Drawer = createDrawerNavigator()

const DrawerNavigator = () =>{
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={BottomTabNavigator}/>
            <Drawer.Screen name="About" component={AboutStackNavigator}/>
        </Drawer.Navigator>
    )
}


export default DrawerNavigator