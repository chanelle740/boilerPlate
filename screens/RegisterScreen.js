import React, { useContext, useState } from 'react'
import Validator from "validatorjs";
import { Alert, Image, ScrollView, View,Text, Pressable,StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useFormik } from "formik";
import SubmitButton from '../components/SubmitButton';
import * as SecureStore from 'expo-secure-store';
import {AuthContext} from '../hooks/AuthContext';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';


 export default function RegisterScreen({navigation}){

    const setIsLoggedIn = React.useContext(AuthContext).setIsLoggedIn;

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
          firstName:"",
          lastName:"",
          email: "",
          password: "",
        },
        onSubmit: async (values) => {
            try {
                if (!values) {
                    Alert.alert("Please enter your credentials");
                    return;
                  }
        
                  const response = await fetch("http://192.168.1.40:5000/api/user/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
        
                },
                body: JSON.stringify(values),
        
              });
        
              if(!response.ok){
                Alert.alert("Invalid credentials");
                return;
                }
                const data = await response.json();
                
                Alert.alert("Success","Successfully created account");

                navigation.navigate("Login")
               
            } catch (error) {
                console.log(error);
            }
         
    }
  });

  
    return(
        <KeyboardAvoidingView behavior={Platform.OS ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <View>
        <View>
        <Text>Login</Text>
        </View>
        </View>

        <View style={styles.midContainer}>
           <Text style={styles.midText}>SIgn up your account</Text>
      </View>
      <View style={styles.loginForm}>
        <View>
        <TextInput
            style={styles.inputStyle}
            placeholder="First name"
            value={values.firstName}
            autoCapitalize="none"
            onChangeText={handleChange("firstName")}
            />

<TextInput
            style={styles.inputStyle}
            placeholder="Last Name"
            value={values.lastName}
            autoCapitalize="none"
            onChangeText={handleChange("lastName")}
            />

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
                    <SubmitButton title ="Register" onPress={()=>handleSubmit()}/>
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