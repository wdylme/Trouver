import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS} from '../constants'
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons"
import {exhibitionsList, lecturesList, classesList} from "../constants/Data";
import axios from 'axios';
import { SERVER_URL } from '../constants/api';

const DetailsViewer = ({ navigation }) => {
  const route = useRoute();
  const event = route.params?.event

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <View style={{position: "absolute", top: 22, right: 22, zIndex: 999}}>
          <TouchableOpacity onPress = {() => navigation.navigate("FavouriteViewer")}>
            <Ionicons 
              name = "heart-outline"
              size = {20} color = {COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={{uri:event.image}}
          resizeMode='cover'
          style = {{
            width: 500, 
            height: 500,
          }}
        />
        <View style={{
          backgroundColor: COLORS.white,
          borderRadius: 36,
          paddingHorizontal: 22,
          paddingVertical: 14,
          position: "absolute",
          width: "100%",
          bottom: 0
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 7}}>{event.name}</Text>
          <Text style={{ fontSize: 16,marginBottom: 7}}>{event.description}</Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 7
            }}
          />
          <View style = {{textAlign: "justify"}}>
            <Text style = {{fontSize: 16, color: COLORS.grey}}>
              Чтобы получить доступ к эксклюзивной информации о захватывающих событиях
            </Text>
            <Pressable onPress = {() => navigation.navigate("Login")}>
              <Text style = {{fontSize: 16, color: COLORS.grey, fontWeight: "bold"}}>
                войдите в свою учётную запись 
              </Text>
            </Pressable>
          </View>
        </View>         
      </View>
    </SafeAreaView>
  )
};
const DetailsVisitor = () => {
  const route = useRoute();
  const event = route.params?.event
  const [isFavourite,setIsFavourite] = useState(event.is_favorite);

  const manageFavorite = () => {
    const manageFavoriteData = {
      event_id: event.id
    }

    if (!isFavourite) {
      axios.post(SERVER_URL + "/api/favorites", manageFavoriteData)
              .then((res) => setIsFavourite(true))
              .catch((err) => console.log(err.response))
    } else {
      axios.delete(SERVER_URL + "/api/favorites?event_id=" + event.id, manageFavoriteData)
              .then((res) => setIsFavourite(false))
              .catch((err) => console.log(err.response))
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <View style={{position: "absolute", top: 22, right: 22, zIndex: 999}}>
          <TouchableOpacity onPress={() => manageFavorite()}>
            {
              isFavourite ? (
                <Ionicons
                    name="heart"
                    size={20}
                    color={COLORS.black}
                />
              ) : (   
                <Ionicons
                    name="heart-outline"
                    size={20}
                    color={COLORS.black}
                />
              )
            }
          </TouchableOpacity>
        </View>
        <Image
          source={{uri:event.image}}
          resizeMode='cover'
          style={{
              width: 500,
              height: 500,
          }}
        />
        <View style={{
          backgroundColor: COLORS.white,
          borderRadius: 36,
          paddingHorizontal: 22,
          paddingVertical: 14,
          position: "absolute",
          width: "100%",
          bottom: 0
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 7}}>{event.name}</Text>
          <Text style={{ fontSize: 16,marginBottom: 7}}>{event.description}</Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 7
            }}
          />
            <Text style = {{fontSize: 16, color: COLORS.grey}}>Адрес: {event.address}</Text>
            <Text style = {{fontSize: 16, color: COLORS.grey}}>Дата: {event.date}</Text>
            <Text style = {{fontSize: 16, color: COLORS.grey}}>Время: {event.time_start} - {event.time_end}</Text>
            <Text style = {{fontSize: 16, color: COLORS.grey}}>Цена: {event.cost} ₽</Text>
            <Text style = {{fontSize: 16, color: COLORS.grey}}>Контакты: {event.contact}</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  };

  const DetailsAdmin = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const handleDelete = () => {
      setModalVisible(true);
    };
    const handleConfirmDelete = () => {
      axios.delete(SERVER_URL + "/api/events/" + route.params?.event.id)
                  .then((res) => navigation.navigate("HomeAdmin"))
                  .catch((err) => console.log(err));
      setModalVisible(false);
    };
    const handleCancelDelete = () => {
      setModalVisible(false);
    };
    const route = useRoute();
    const event = route.params?.event
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <View style={{
            marginHorizontal: 22,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            width: 323,
            top: 22,
            zIndex: 999
          }}>
          <View>
            <TouchableOpacity onPress={handleDelete}>
              <SimpleLineIcons name="trash" size={18} color={COLORS.black}/>
            </TouchableOpacity>
            <Modal visible={modalVisible} transparent={true}>
              <View style={{ flex: 1, alignItems: 'center', marginTop: 80}}>
                <View style={{ backgroundColor: 'white', padding: 14, borderRadius: 8}}>
                  <Text style={{ fontSize: 14}}>Вы уверены что хотите удалить событие?</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={handleConfirmDelete}>
                      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 7}}>Да</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancelDelete}>
                      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 7}}>Нет</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity onPress = {() => navigation.navigate("EditEvent", {event})}>
          <SimpleLineIcons name = "pencil" size = {18} color = {COLORS.black}/>
        </TouchableOpacity>
        </View>
        <Image
          source={{uri: event.image}}
          resizeMode='cover'
          style={{
              width: 500,
              height: 500,
          }}
        />
        <View style={{
          backgroundColor: COLORS.white,
          borderRadius: 36,
          paddingHorizontal: 22,
          paddingVertical: 14,
          position: "absolute",
          width: "100%",
          bottom: 0
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 7}}>{event.name}</Text>
          <Text style={{ fontSize: 16,marginBottom: 7}}>{event.description}</Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 7
            }}
          />
            <Text style = {{fontSize: 16, color: COLORS.grey}}>Адрес: {event.address}</Text>
            <Text style = {{fontSize: 16, color: COLORS.grey}}>Дата: {event.date}</Text>
            <Text style = {{fontSize: 16, color: COLORS.grey}}>Время: {event.time_start} - {event.time_end}</Text>
            <Text style = {{fontSize: 16, color: COLORS.grey}}>Цена: {event.cost} ₽</Text>
            <Text style = {{fontSize: 16, color: COLORS.grey}}>Контакты: {event.contact}</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  };

export {DetailsViewer, DetailsVisitor, DetailsAdmin};