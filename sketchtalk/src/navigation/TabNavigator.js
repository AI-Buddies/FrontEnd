import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../constants/colors";

import home_screen from "../screens/home_screen";


const Tab = createBottomTab();

const TabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="home_screen"
            component={home_screen}
            options={{
                tabBarLabel: "홈 화면",
                headerShown: false,
            }}
        />
        <Tab.Screen
            name="Shared"
            component={ShareDrawers}
            options={{
                headerShown: false,
                tabBarLabel: "나눔게시판",
                tabBarIcon: ({ color }) => (
                    <Image
                        source={require("../Assets/icons/tabIcons/shareboardicon.png")}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: color,
                        }}
                    />
                ),
            }}
        />
    </Tab.Navigator>
);

export default TabNavigator;
