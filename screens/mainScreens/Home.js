import React from "react";
import { TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarItemStyle: {
          borderTopColor: "#E5E5E5",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
              onPress={() => alert("Log out!")}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Feather
                name="grid"
                size={24}
                color={focused ? "#FF6C00" : color}
              />
            );
          },
          tabBarIconStyle: {
            marginTop: 9,
          },
        }}
      />

      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name="add"
                size={24}
                color={"#FFFFFF"}
                // backgroundColor={focused ? "#FF6C00" : color}
              />
            );
          },
          tabBarIconStyle: {
            backgroundColor: "#FF6C00",
            width: 70,
            height: 40,
            borderRadius: 50,
            marginTop: 9,
          },

          headerStyle: {
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Feather
                name="user"
                size={24}
                color={focused ? "#FF6C00" : color}
              />
            );
          },
          tabBarIconStyle: {},
        }}
      />
    </Tabs.Navigator>
  );
};

export default Home;
