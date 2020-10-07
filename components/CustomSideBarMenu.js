import { View } from "react-native";

import * as React from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Modal,
} from "react-native";
import {DrawerItems} from 'react-navigation-drawer';
import firebase from "firebase";

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.drawerItemsContainer}>
                    <DrawerItems {...this.props} />
                </View>
                <View style = {styles.logOutContainer}>
                    <TouchableOpacity style = {styles.logOutButton} onPress = {()=>{
                        firebase.auth().signOut();
                        this.props.navigation.navigate('WelcomeScreen');
                    }}>
                        <Text style = {styles.logOutText}>
                            Log Out
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerItemsContainer: {
      flex: 0.8,
    },
    logOutContainer: {
        flex: 0.2,
        justifyContent: "flex-end",
        paddingBottom: 30,
    },
    logOutText: {
        fontSize: 30,
        fontWeight: "bold",
    },
    logOutButton: {
        height: 30,
        width: '100%',
        justifyContent: "center",
        padding: 10,
    },
  });