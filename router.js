import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import Home from "./screens/mainScreens/Home";

import CommentsScreen from "./screens/mainScreens/CommentsScreen";
import MapScreen from "./screens/mainScreens/MapScreen";

import { useSelector } from "react-redux";

export const Router = () => {
  const { stateChange } = useSelector((state) => state.auth);
  console.log("user", stateChange);

  const AuthStack = createStackNavigator();
  const OtherStack = createStackNavigator();

  return (
    <>
      {!stateChange && (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Registration"
            component={RegistrationScreen}
          />
        </AuthStack.Navigator>
      )}

      {stateChange && (
        <OtherStack.Navigator>
          <OtherStack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <OtherStack.Screen name="CommentsScreen" component={CommentsScreen} />
          <OtherStack.Screen name="MapScreen" component={MapScreen} />
        </OtherStack.Navigator>
      )}
    </>
  );
};
