import React, { useContext, useState } from 'react'
import Validator from "validatorjs";
import { Alert, Image, ScrollView, View,Text, Pressable,StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useFormik } from "formik";
import SubmitButton from '../components/SubmitButton';
import * as SecureStore from 'expo-secure-store';
import {AuthContext} from '../hooks/AuthContext';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';


 export default function LoginScreen({navigation}){

    const setIsLoggedIn = React.useContext(AuthContext).setIsLoggedIn;

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        onSubmit: async (values) => {
          console.log(values);
            try {
                if (!values.email && !values.password) {
                    Alert.alert("Please enter your email and password");
                    return;
                  }
        
                  //change the url to your respective PC's IP address and port number
                  const response = await fetch("http://192.168.1.40:5000/api/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
        
                },
                body: JSON.stringify(values),
        
              });

              if(!response.ok){
                Alert.alert("Invalid email or password");
                return;
                }
                const data = await response.json();
                
                Alert.alert("Success","Successfully logged in");
                if(data.accessToken){
                    await SecureStore.setItemAsync("auth-token", data.accessToken);
                    setIsLoggedIn(true);
                    // navigation.navigate("")
                }
            } catch (error) {
                console.log(error);
            }
         
    }
  });

  
    return(
      <KeyboardAvoidingView behavior={Platform.OS ? "padding" : "height"} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        {/* <View>
        </View> */}

      <View style={styles.loginForm}>
        <View style={styles.midContainer}>
        <Text style={styles.midText}>Login to your account</Text>
      </View>
      {/* <Text>Login to your account</Text> */}
        <View>
            <TextInput
            style={styles.inputStyle}
            placeholder="Email address"
            value={values.email}
            autoCapitalize="none"
            onChangeText={handleChange("email")}
            />
            <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            secureTextEntry={true}
            value={values.password}
            onChangeText={handleChange("password")}
            />
            <Pressable>
                <View style={styles.submitButton}>
                    <SubmitButton title ="Login" onPress={()=>handleSubmit()}/>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Register')}>
            <View>
                  <Text style={styles.noAcc}>Have no account? Register</Text>
                </View>
            </Pressable>
        </View>
      </View>
        </View>
        </TouchableWithoutFeedback>
 </KeyboardAvoidingView>
    )

 }

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      paddingTop: "20%"
    },
    topContainer: {
      marginTop: 15,
      paddingBottom: 40,
      flexDirection: "row",
    },
    backbtnView: {
      marginLeft: 20,
    },
    top: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    topText: {
    //   fontFamily: "urbanist-semi-bold",
      fontSize: 14,
    },
    midContainer: {
      marginTop: 50,
      flexDirection: "row",
      alignContent: "flex-start",
      justifyContent: "center",
    },
    midText: {
    //   fontFamily: "urbanist-semi-bold",
      fontSize: 23,
      textAlign: "left",
      // height: 70,
      // marginBottom: 90,
    },
    loginForm: {
      marginTop: 80,
      alignItems: "center",
      justifyContent: "flex-end",
    },
  
    inputStyle: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "center",
      width: 350,
      height: 50,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#C5C6D0",
      marginTop: 30,
      paddingLeft: 15,
    },
    submitButton: {
      marginTop: 40,
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      backgroundColor: "#4361EE",
      width: 350,
      padding: 15,
      height: 50,
    },
    caption: {
      color: "#FFFFFF",
    //   fontFamily: "urbanist-bold",
    },
  
    noAcc: {
      marginTop: 20,
      alignItems: "center",
      justifyContent: "center",
      marginLeft:60,
    }
    // bottomContent: {
    //   marginTop: 10,
    //   display: "flex",
    //   flexDirection: "row",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   // justifyContent: "space-between",
    //   marginBottom: 8,
    // },
    // bottomText: {
    //   fontSize: 16,
    //   textAlign: "center",
    // },
    // bottomTextTwo: {
    //   fontSize: 16,
    //   color: "#4361EE",
    //   textAlign: "center",
    // },
  });