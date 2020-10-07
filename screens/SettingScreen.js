import React, {Component} from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Modal,
} from "react-native";
import db from "../config";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import MyHeader from "../components/MyHeader.js";

export default class SettingScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          emailId: "",
          docId: "",
          firstName: "",
          lastName: "",
          address: "",
          contact: "",
        };
    }
    componentDidMount(){
        this.getUserDetails();
    }
    getUserDetails=()=>{
        var user = firebase.auth().currentUser;
        var email = user.email;
        console.log(email);
        db.collection('users').where('email_id','==',email).get().then(snapshot=>{
            console.log(snapshot);
            snapshot.forEach(doc=>{
                var data = doc.data();
                console.log(data);
                this.setState({
                    emailId: data.email_id,
                    docId: doc.id,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    address: data.address,
                    contact: data.contact,
                })
            })
        })
    }
    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId).update({
            'first_name': this.state.firstName,
            'last_name': this.state.lastName,
            'contact': this.state.contact,
            'address': this.state.address,
        });
    }
    render(){
        return(
            <View style = {styles.container}>
                <MyHeader title = "Settings"/>
                <View style = {styles.formContainer}>
                    <TextInput
                      style={styles.formTextInput}
                      placeholder={"First Name"}
                      maxLength={8}
                      onChangeText={(text) => {
                        this.setState({
                          firstName: text,
                        });
                      }}
                      value={this.state.firstName}
                    />
                    <TextInput
                      style={styles.formTextInput}
                      placeholder={"Last Name"}
                      maxLength={8}
                      onChangeText={(text) => {
                        this.setState({
                          lastName: text,
                        });
                      }}
                      value={this.state.lastName}
                    />
                    <TextInput
                      style={styles.formTextInput}
                      placeholder={"Contact"}
                      maxLength={10}
                      keyboardType={"numeric"}
                      onChangeText={(text) => {
                        this.setState({
                          contact: text,
                        });
                      }}
                      value={this.state.contact}
                    />
                    <TextInput
                      style={styles.formTextInput}
                      placeholder={"Address"}
                      multiline={true}
                      onChangeText={(text) => {
                        this.setState({
                          address: text,
                        });
                      }}
                      value={this.state.address}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          this.updateUserDetails();
                        }}
                         >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    formContainer: {
        flex: 1,
        width: '100%',
        alignItems: "center",
    },
    formTextInput: {
      width: "75%",
      height: 35,
      alignSelf: "center",
      borderColor: "#ffab91",
      borderRadius: 10,
      borderWidth: 1,
      marginTop: 20,
      padding: 10,
    },
    button: {
      width: 300,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      backgroundColor: "#ff9800",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.3,
      shadowRadius: 10.32,
      elevation: 16,
      padding: 10,
    },
    buttonText: {
      color: "#ffff",
      fontWeight: "200",
      fontSize: 20,
    },
});
  