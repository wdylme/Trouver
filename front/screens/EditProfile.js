import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, TextInput, SafeAreaView} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../constants";
import Button from "../components/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL, getAuthToken} from "../constants/api";

import axios from "axios";

const EditProfile = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errors, setErrors] = useState({});
  const togglePasswordVisibility = () => {
      setIsPasswordShown(!isPasswordShown);
  };

  const getUserData = async () => {
    const user = await AsyncStorage.getItem("authUser");

    let parsedUser = JSON.parse(user);

    setName(parsedUser.name);
    setEmail(parsedUser.email);
  }

  useEffect(() => {
    getUserData()
  }, []);
  const handleSignup = () => {
      const newErrors = {};
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email.trim() != "" && !emailPattern.test(email)) {
          newErrors.email = "Неверный формат электронной почты";
      }

      if (password.trim() != "" && password.length < 6) {
          newErrors.password = "Пароль должен содержать не менее 6 символов";
      }

      const updateProfileData = {
        name,
        email,
      }

      if (password) {
        updateProfileData.password = password;
      }

      if (Object.keys(newErrors).length == 0) {
        axios.put(SERVER_URL + "/api/update-profile", updateProfileData)
        .then(async (res) => {
            await AsyncStorage.setItem("authUser", JSON.stringify(res.data.user));
            if (res.data.user.role.name == "admin") {
                navigation.navigate("HomeAdmin");
            } else if (res.data.user.role.name == "visitor") {
                navigation.navigate("HomeVisitor")
            }
        }).catch((err) => {
            newErrors.serverError = err.response.data.message;
            setErrors(newErrors);
        });
    } else {
        setErrors(newErrors);
    }
  };
  return (
      <SafeAreaView style = {{flex: 1, backgroundColor: COLORS.white}}>
          <View style = {{flex: 1, paddingHorizontal: 22}}>
              <Text style = {{fontSize: 22, fontWeight: "800", color: COLORS.black,  marginTop: 14}}>
                  Вы хотите что-то исправить в своей учётной записи? 😲
              </Text>
              <Text style = {{fontSize: 16, color: COLORS.black, marginTop: 7}}>
                  Мы рады любым изменениям! 😄
              </Text>
              <View style = {{width: "100%", height: 48, borderColor: errors.name ? COLORS.red : COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, marginTop: 14}}>
                  <TextInput
                      placeholder = "Имя"
                      placeholderTextColor = {COLORS.grey}
                      keyboardType = "default"
                      style = {{width: "100%"}}
                      value = {name}
                      onChangeText = {(text) => setName(text)}
                  />
              </View>
              {errors.name ? <Text style = {{color: COLORS.red , marginTop: 5}}>{errors.name}</Text> : null}
              <View style = {{width: "100%", height: 48, borderColor: errors.email ? COLORS.red  : COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, marginTop: 14}}>
                  <TextInput
                      placeholder = "Электронная почта"
                      placeholderTextColor = {COLORS.grey}
                      keyboardType = "email-address"
                      style = {{width: "100%"}}
                      value = {email}
                      onChangeText = {(text) => setEmail(text)}
                  />
              </View>
              {errors.email ? <Text style = {{color: COLORS.red , marginTop: 5}}>{errors.email}</Text> : null}
              <View style = {{width: "100%", height: 48, borderColor: errors.password ? COLORS.red  : COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, marginTop: 14}}>
                  <TextInput
                      placeholder = "Пароль"
                      placeholderTextColor = {COLORS.grey}
                      secureTextEntry = {isPasswordShown}
                      style = {{width: "100%"}}
                      value = {password}
                      onChangeText = {(text) => setPassword(text)}
                  />
                  <TouchableOpacity onPress = {togglePasswordVisibility} style = {{position: "absolute", right: 12}}>
                      <Ionicons
                          name = {isPasswordShown ? "eye-off" : "eye"}
                          size = {24}
                          color = {COLORS.black}
                      />
                  </TouchableOpacity>
              </View>
              {errors.password ? <Text style = {{color: COLORS.red, marginTop: 5}}>{errors.password}</Text> : null}
              {errors.serverError ? <Text style = {{color: COLORS.red, marginTop: 5}}>{errors.serverError}</Text> : null}
              <Button
                  title = "Сохранить"
                  onPress = {handleSignup}
                  style = {{
                      marginTop: 14,
                      marginBottom: 14
                  }}
              />
          </View>
      </SafeAreaView>
  )
};

export default EditProfile;
