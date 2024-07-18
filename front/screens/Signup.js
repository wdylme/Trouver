import React, {useState} from "react";
import {View, Text, Pressable, TextInput, TouchableOpacity, SafeAreaView} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../constants";
import Button from "../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "../constants/api";

const Signup = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [errors, setErrors] = useState({});
    const togglePasswordVisibility = () => {
        setIsPasswordShown(!isPasswordShown);
    };
    const handleSignup = () => {
        const newErrors = {};
        if (name.trim() === "") {
            newErrors.name = "Имя не может быть пустым";
        }
        if (email.trim() === "") {
            newErrors.email = "Электронная почта не может быть пустой";
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                newErrors.email = "Неверный формат электронной почты";
            }
        }
        if (password.trim() === "") {
            newErrors.password = "Пароль не может быть пустым";
        } else if (password.length < 6) {
            newErrors.password = "Пароль должен содержать не менее 6 символов";
        }

        const registerData = {
            name,
            email, 
            password
        }

        if (Object.keys(newErrors).length == 0) {
            axios.post(SERVER_URL + "/api/register", registerData).then(async (res) => {
                await AsyncStorage.setItem("accessToken", JSON.stringify(res.data.authorisation.token));
                await AsyncStorage.setItem("authUser", JSON.stringify(res.data.user));
                navigation.navigate("HomeVisitor")
            }).catch((err) => {
                newErrors.unsuccessRegister = err.response.data.message;
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
                    Создайте свою учётную запись 👤
                </Text>
                <Text style = {{fontSize: 16, color: COLORS.black, marginTop: 7}}>
                    Приготовьтесь к захватывающим приключениям и вдохновению уже сегодня! 🎊
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
                {errors.name ? <Text style = {{color: COLORS.red, marginTop: 5}}>{errors.name}</Text> : null}
                <View style = {{width: "100%", height: 48, borderColor: errors.email ? COLORS.red : COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, marginTop: 14}}>
                    <TextInput
                        placeholder = "Электронная почта"
                        placeholderTextColor = {COLORS.grey}
                        keyboardType = "email-address"
                        style = {{width: "100%"}}
                        value = {email}
                        onChangeText = {(text) => setEmail(text)}
                    />
                </View>
                {errors.email ? <Text style = {{color: COLORS.red, marginTop: 5}}>{errors.email}</Text> : null}
                <View style = {{width: "100%", height: 48, borderColor: errors.password ? COLORS.red : COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, marginTop: 14}}>
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

                {errors.unsuccessRegister ? <Text style = {{color: COLORS.red, marginTop: 5}}>{errors.unsuccessRegister}</Text> : null}
                <Button
                    title = "Регистрация"
                    onPress = {handleSignup}
                    style = {{
                        marginTop: 14,
                        marginBottom: 14,
                    }}
                />
                <View style = {{flexDirection: "row", justifyContent: "center", marginBottom: 7}}>
                    <Text style = {{fontSize: 16, color: COLORS.black}}>
                        Уже есть учётная запись?
                    </Text>
                    <Pressable onPress = {() => navigation.navigate("Login")}>
                        <Text style = {{fontSize: 16, color: COLORS.black, fontWeight: "bold", marginLeft: 4}}>
                            Вход
                        </Text>
                    </Pressable>
                </View>
                <View style = {{flexDirection: "row", justifyContent: "center"}}>
                    <Pressable onPress = {() => navigation.navigate("HomeViewer")}>
                        <Text style = {{fontSize: 16, color: COLORS.black, fontWeight: "bold"}}>
                            Вход без регистрации
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default Signup
