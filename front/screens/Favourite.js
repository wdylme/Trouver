import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable, ScrollView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, images } from "../constants";
import axios from "axios";
import { SERVER_URL } from "../constants/api";
import { useIsFocused } from '@react-navigation/native'

const FavouriteViewer = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white, paddingHorizontal: 22 }}>
      <Text style={{ fontSize: 16, color: COLORS.black, textAlign: 'center' }}>
        Чтобы сохранить событие в избранное, вам необходимо войти в свою учетную запись 🔑
      </Text>
      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={{
          marginTop: 7,
        }}
      >
        <Text style={{
          fontSize: 16,
          color: COLORS.black,
          fontWeight: "bold",
        }}>Войти</Text>
      </Pressable>
    </View>
  );
};

const FavouriteVisitor = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused()
  const getFavorites = () => {
    axios.get(SERVER_URL + "/api/favorites").then((res) => {
      setFavorites(res.data.favorites);
    }).catch((err) => {
      console.log(err.response);
    });
  }
  const removeFavorite = (event_id) => {
    axios.delete(SERVER_URL + "/api/favorites?event_id=" + event_id).then((res) => {
        getFavorites();
      })
      .catch((err) => console.log(err.response))
  }
  useEffect(() => {
    getFavorites();
  }, [isFocused]);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>
        {favorites.map((favorite) => (
          <TouchableOpacity onPress={() => navigation.navigate("DetailsVisitor", {event: favorite})}>
            <View style={styles.rectangle} key={favorite.id}>
              <Image
                source={{uri: favorite.image}}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{favorite.name}</Text>
              </View>
              <View style={styles.heartButtonContainer}>
                <TouchableOpacity onPress={() => removeFavorite(favorite.id)}>
                  <Ionicons name="heart" size={20} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 34,
    alignItems: 'center',
    paddingHorizontal: 22
  },
  rectangle: {
    marginBottom: 14,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 18,
    width: 332
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  heartButtonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 14,
  },
  textContainer: {
    flex: 1,
    width: '70%'
  }
});

export { FavouriteViewer, FavouriteVisitor };
