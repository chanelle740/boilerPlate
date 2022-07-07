import * as React from 'react'
import { useEffect,useState , useContext} from "react";
import * as SecureStore from 'expo-secure-store';
import {createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity } from "react-native";
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../hooks/AuthContext';
import RegisterScreen from '../screens/RegisterScreen';

export default function Navigator(){
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    console.log(isLoggedIn);

    useEffect(()=>{

        async function getAuthToken(){
            const token = await SecureStore.getItemAsync("auth-token");
            await SecureStore.deleteItemAsync("auth-token");
            //print token
            console.log(token);
        }
        getAuthToken();
    },[]);

    if(!isLoggedIn) return <AuthNavigation/>

    return <AppNavigation/>
}

export function AuthNavigation(){
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    )

}


const Tabs = createBottomTabNavigator();

export function AppNavigation(){
    return(
        <Tabs.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            backgroundColor: "#4361EE",
            height: 50,
            paddingBottom: 10,
            padding: 30,
            position: "absolute",
            borderColor: "white",
            elevation: 10,
            
          },
          tabBarButton: (props) => {
            return (
              <View {...props}>
                <View
                  style={{
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: 10,
                    backgroundColor: "transparent",
                  }}
                >
                  <TouchableOpacity {...props} />
                </View>
              </View>
            );
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#F7941D",
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={26} color={color} />
            ),
          }}
          component={LoginScreen}
        />
  
        <Tabs.Screen
          name="Add"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="add-circle-outline" size={26} color={color} />
            ),
          }}
          component={LoginScreen}
        />
  
        <Tabs.Screen
          name="Analytics"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="google-analytics"
                size={26}
                color={color}
              />
            ),
          }}
          component={LoginScreen}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="adduser" size={24} color={color} />
            ),
          }}
          component={LoginScreen}
        />
      </Tabs.Navigator>
    )

}

