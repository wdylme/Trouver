import React, {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, Pressable, SafeAreaView} from "react-native";
import {COLORS, images} from "../constants";
import Button from "../components/Button"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'

const ProfileViewer = ({navigation}) => {
  return (
    <View style = {{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.white, paddingHorizontal: 22}}>
      <Text style = {{fontSize: 16, color: COLORS.black, textAlign: "center"}}>
        Войдите в свою учетную запись, чтобы получить доступ к эксклюзивному контенту и новым функциям 🔑
      </Text>
      <Pressable onPress = {() => navigation.navigate("Login")} style={{marginTop: 7}}>
        <Text style = {{fontSize: 16, color: COLORS.black, fontWeight: "bold"}}>
          Войти
        </Text>
      </Pressable>
    </View>
  )
};

const ProfileVisitor = ({navigation}) => {
  
  const [name, setName] = useState("");
  const isFocused = useIsFocused()
  const getUsername = async () => {
    const user = await AsyncStorage.getItem("authUser");

    let parsedUser = JSON.parse(user);

    setName(parsedUser.name);
  }

  useEffect(() => {
    getUsername()
  }, [isFocused]);
  return (
    <SafeAreaView style = {styles.container}>
      <Image source = {images.visitorAvatar} style = {styles.profileImage} />
      <Text style = {styles.userName}>{name}</Text>
      <View style = {{paddingHorizontal: 22, width: "100%"}}>
        <Button
          title = "Редактировать профиль"
          onPress = {() => navigation.navigate("EditProfile")}
        />
      </View>
      <View style = {{paddingHorizontal: 22, marginTop: -14, width: "100%"}}>
        <Button
          title = "Выйти"
          onPress = {() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  )
};

const ProfileAdmin = ({navigation}) => {
  const [name, setName] = useState("");
  const isFocused = useIsFocused()
  const getUsername = async () => {
    const user = await AsyncStorage.getItem("authUser");

    let parsedUser = JSON.parse(user);

    setName(parsedUser.name);
  }
  useEffect(() => {
    getUsername()
  }, [isFocused]);
  return (
    <SafeAreaView style = {styles.container}>
      <Image source = {images.adminAvatar} style = {styles.profileImage} />
      <Text style = {styles.userName}>{name}</Text>
      <View style = {{paddingHorizontal: 22, width: "100%"}}>
        <Button
          title = "Редактировать профиль"
          onPress = {() => navigation.navigate("EditProfile")}
        />
      </View>
      <View style = {{paddingHorizontal: 22, marginTop: -14, width: "100%"}}>
        <Button
          title = "Выйти"
          onPress = {() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 14
  },
  userName: {
    fontSize: 20,
    fontWeight: "800"
  },
});

export { ProfileViewer, ProfileVisitor, ProfileAdmin };
