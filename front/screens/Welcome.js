import React from "react";
import {View, Text, Pressable, Image} from "react-native";
import {COLORS, images} from "../constants";
import Button from "../components/Button";

const Welcome = ({navigation}) => {
    return (
        <View style = {{flex: 1, backgroundColor: COLORS.white}}>
            <View style = {{flex: 1}}>
                <Image
                    source = {images.welcome1}
                    style = {{
                        height: 140,
                        width: 140,
                        borderRadius: 20,
                        position: "absolute",
                        top: -17,
                        left: 110,
                        transform: [
                            {translateX: 50},
                            {translateY: 50},
                            {rotate: "-5deg"}
                        ]
                    }}
                />
                <Image
                    source = {images.welcome2}
                    style = {{
                        height: 140,
                        width: 140,
                        borderRadius: 20,
                        position: "absolute",
                        top: 120,
                        left: 3,
                        transform: [
                            {translateX: 20},
                            {translateY: 50},
                            {rotate: "-15deg"}
                        ]
                    }}
                />
                <Image
                    source = {images.welcome3}
                    style = {{
                        width: 140,
                        height: 140,
                        borderRadius: 20,
                        position: "absolute",
                        top: 185,
                        left: 175,
                        transform: [
                            {translateX: 50},
                            {translateY: 50},
                            {rotate: "15deg"}
                        ]
                    }}
                />
            </View>
            <View style = {{paddingHorizontal: 22, position: "absolute", marginTop: 377, width: "100%"}}>
                <Text style = {{fontSize: 40, fontWeight: "800", color: COLORS.black}}>
                    Рады видеть вас здесь! ✨
                </Text>
                <Text style = {{fontSize: 16, color: COLORS.black, marginTop: 7}}>
                    Давайте вместе исследуем мир, взглянём на него свежим взглядом и бок о бок погрузимся в царство творчества и вдохновения 🤩
                </Text>
                <Button
                    title = "Начало"
                    onPress = {() => navigation.navigate("Signup")}
                />
                <View style = {{flexDirection: "row", justifyContent: "center"}}>
                    <Text style = {{fontSize: 16, color: COLORS.black}}>
                        Уже есть учётная запись?
                    </Text>
                    <Pressable onPress = {() => navigation.navigate("Login")}>
                        <Text style = {{fontSize: 16, color: COLORS.black, fontWeight: "bold", marginLeft: 4}}>
                            Вход
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
};

export default Welcome