import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, StyleSheet,  ScrollView, TouchableOpacity, Image} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Ionicons} from "@expo/vector-icons";
import Button from "../components/Button";
import {COLORS} from "../constants";
import axios from "axios";
import { SERVER_URL } from '../constants/api';

const AddEvent = ({navigation}) => {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCity, setSelectedCity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [image, setImage] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [chosenDate, setChosenDate] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  const handleAddEvent = () => {
    const newErrors = {};
    if (!selectedCity) {
        newErrors.selectedCity = "Город события не может быть пустым";
    } 
    if (!selectedCategory) {
      newErrors.selectedCategory = 'Категория события не может быть пустой';
    }
    if (!image) {
      newErrors.image = 'Фото события не может быть пустым';
    }
    if (eventName.trim() === "") {
      newErrors.eventName = "Название события не может быть пустым";
    } 
    if (eventDescription.trim() === "") {
      newErrors.eventDescription = "Описание события не может быть пустым";
    } 
    if (eventAddress.trim() === "") {
      newErrors.eventAddress = "Адрес события не может быть пустым";
    } 
    if (chosenDate.trim() === "") {
      newErrors.chosenDate = "Дата события не может быть пустой";
    } 
    if (startTime.trim() === "") {
      newErrors.startTime = "Время начала события не может быть пустым";
    } 
    if (endTime.trim() === "") {
      newErrors.endTime = "Время окончания события не может быть пустым";
    } 
    if (phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Контакты организатора не могут быть пустыми";
    } 
    if (price.trim() === "") {
      newErrors.price = "Цена события не может быть пустой";
    } 

    let addEventData = new FormData();
    addEventData.append("city_id", selectedCity);
    addEventData.append("category_id", selectedCategory);
    addEventData.append("name", eventName);
    addEventData.append("description", eventDescription);
    if (image && image.assets && image.assets.length > 0) {
      addEventData.append("image_file", {
        uri: image.assets[0].uri,
        type: image.assets[0].mimeType,
        name: image.assets[0].fileName
      });
    } else {
      newErrors.image = 'Фото события не выбрано';
    }    
    addEventData.append("address", eventAddress);
    addEventData.append("date", chosenDate);
    addEventData.append("time_start", startTime)
    addEventData.append("time_end", endTime);
    addEventData.append("cost", price);
    addEventData.append("contact", phoneNumber);

    if (Object.keys(newErrors).length == 0) {
      axios.post(SERVER_URL + "/api/events", addEventData).then((res) => {
        navigation.navigate("HomeAdmin");
      }).catch((err) => {
          console.log(err);
          newErrors.serverError = err.response.data.message;
          setErrors(newErrors);
      });
    } else {
      setErrors(newErrors);
    }
  }

  const getCities = () => {
    axios.get(SERVER_URL + "/api/cities").then((res) => {
      setCities(res.data.cities);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getCategories = () => {
    axios.get(SERVER_URL + "/api/categories").then((res) => {
      setCategories(res.data.categories);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getCities();
    getCategories();
  }, [image]);

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
        setImage(result);
    }
}

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };
  
  const handleDateConfirm = (date) => {
    setChosenDate(date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }));
    hideDateTimePickers();
  };
  
  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };
  
  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };
  
  const hideDateTimePickers = () => {
    setIsDatePickerVisible(false);
    setStartTimePickerVisible(false);
    setEndTimePickerVisible(false);
  };
  
  const handleStartTimeConfirm = (time) => {
    setStartTime(time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
    hideDateTimePickers();
  };
  
  const handleEndTimeConfirm = (time) => {
    setEndTime(time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
    hideDateTimePickers();
  };

  return (
    <ScrollView style = {{flex: 1, backgroundColor: COLORS.white}}>
      <View style = {{flex: 1, paddingHorizontal: 22}}>
        <Text style = {{fontSize: 22, fontWeight: "800", color: COLORS.black,  marginTop: 32}}>
          Ура, новое событие! 🎉
        </Text>
        <Text style = {{fontSize: 16, color: COLORS.black, marginTop: 7}}>
          Интересно, что на это раз 🤔
        </Text>
        <View style={[styles.dropdown, { borderColor: errors.selectedCity ? "red" : "black" }]}>
      <Dropdown
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={cities.map(city => ({ label: city.name, value: city.id }))}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Город события"
        value={selectedCity}
        onChange={(item) => setSelectedCity(item.value)}
        activeColor="transparent"
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemContainerStyle}
        renderRightIcon={() => (
          <Ionicons style={styles.icon} color="black" name="chevron-down" size={14} />
        )}
      />
    </View>
        {errors.selectedCity ? <Text style = {{color: "red", marginTop: 5}}>{errors.selectedCity}</Text> : null}
        <View style={[styles.dropdown, { borderColor: errors.selectedCategory ? "red" : "black" }]}>
      <Dropdown
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={categories.map(category => ({ label: category.name, value: category.id }))}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Категория события"
        value={selectedCategory}
        onChange={(item) => setSelectedCategory(item.value)}
        activeColor="transparent"
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemContainerStyle}
        renderRightIcon={() => (
          <Ionicons style={styles.icon} color="black" name="chevron-down" size={14} />
        )}
      />
    </View>
    {errors.selectedCategory ? <Text style={{ color: "red", marginTop: 5 }}>{errors.selectedCategory}</Text> : null}
    <View style={styles.container}>
  <TouchableOpacity onPress={handleChoosePhoto} style={[styles.photoContainer, { borderColor: errors.image ? "red" : "black" }]}>
    {image ? <Image source={{ uri: image.assets[0].uri }} style={styles.photo} /> : <Text style={styles.placeholderText}>Фото события</Text>}
  </TouchableOpacity>
</View>
{errors.image ? <Text style={{ color: "red", marginTop: 5 }}>{errors.image}</Text> : null}
        <View style = {{width: "100%", height: 48, borderColor: errors.eventName ? "red" : COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, marginTop: 14}}>
          <TextInput
              placeholder = "Название события"
              placeholderTextColor = {COLORS.gray}
              keyboardType = "default"
              style = {{width: "100%"}}
              value = {eventName}
              onChangeText = {(text) => setEventName(text)}
          />
        </View>
        {errors.eventName ? <Text style = {{color: "red", marginTop: 5}}>{errors.eventName}</Text> : null}
        <View style = {{width: "100%", height: 100, borderColor: errors.eventDescription ? "red" : COLORS.black, borderWidth: 1, borderRadius: 8, paddingHorizontal: 22, paddingVertical: 10, marginTop: 14}}>
          <TextInput
              placeholder = "Описание события"
              placeholderTextColor = {COLORS.gray}
              keyboardType = "default"
              multiline={true}
              numberOfLines={4}
              style={{
                width: "100%"
              }}
              value = {eventDescription}
              onChangeText = {(text) => setEventDescription(text)}
          />
        </View>
        {errors.eventDescription ? <Text style = {{color: "red", marginTop: 5}}>{errors.eventDescription}</Text> : null}
        <View style = {{width: "100%", height: 48, borderColor: errors.eventAddress ? "red" : COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, marginTop: 14}}>
          <TextInput
              placeholder = "Адрес события"
              placeholderTextColor = {COLORS.gray}
              keyboardType = "default"
              style = {{width: "100%"}}
              value = {eventAddress}
              onChangeText = {(text) => setEventAddress(text)}
          />
        </View>
        {errors.eventAddress ? <Text style = {{color: "red", marginTop: 5}}>{errors.eventAddress}</Text> : null}
        <View style={{ marginTop: 7 }}>
          <TouchableOpacity onPress={showDatePicker}>
          <View style={[styles.picker, { borderColor: errors.chosenDate ? "red" : "black" }]}>
              <Text style={chosenDate ? styles.chosenDateText : styles.placeholderText}>{chosenDate || 'Выберите дату события'}</Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDateTimePickers}
            locale="ru-RU"
            isDarkModeEnabled={false}
            confirmTextIOS="Подтвердить"
            cancelTextIOS="Отмена"
          />
        </View>
        {errors.chosenDate ? <Text style = {{color: "red", marginTop: 5}}>{errors.chosenDate}</Text> : null}
        <View style={{marginTop: 7}}>
          <TouchableOpacity onPress={showStartTimePicker}>
            <View style={[styles.picker, { borderColor: errors.startTime ? "red" : "black" }]}>
              <Text style={startTime ? styles.chosenDateText : styles.placeholderText}>{startTime || 'Выберите время начала события'}</Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            onConfirm={handleStartTimeConfirm}
            onCancel={hideDateTimePickers}
            locale="ru-RU"
            isDarkModeEnabled={false}
            confirmTextIOS="Подтвердить"
            cancelTextIOS="Отмена"
          />
        </View>
        {errors.startTime ? <Text style = {{color: "red", marginTop: 5}}>{errors.startTime}</Text> : null}
        <View style={{marginTop: 7}}>
          <TouchableOpacity onPress={showEndTimePicker}>
          <View style={[styles.picker, { borderColor: errors.endTime ? "red" : "black" }]}>
              <Text style={endTime ? styles.chosenDateText : styles.placeholderText}>{endTime || 'Выберите время окончания события'}</Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={handleEndTimeConfirm}
            onCancel={hideDateTimePickers}
            locale="ru-RU"
            isDarkModeEnabled={false}
            confirmTextIOS="Подтвердить"
            cancelTextIOS="Отмена"
          />
        </View>
        {errors.endTime ? <Text style = {{color: "red", marginTop: 5}}>{errors.endTime}</Text> : null}
        <View style = {{width: "100%", height: 48, borderColor: errors.phoneNumber ? "red" : COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, marginTop: 14}}>
          <TextInput
              placeholder = "Контакты организатора"
              placeholderTextColor = {COLORS.gray}
              keyboardType = "numeric"
              style = {{width: "100%"}}
              value = {phoneNumber}
              onChangeText = {(text) => setPhoneNumber(text)}
          />
        </View>
        {errors.phoneNumber ? <Text style = {{color: "red", marginTop: 5}}>{errors.phoneNumber}</Text> : null}
        <View style = {{width: "100%", height: 48, borderColor: errors.price ? "red" : COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, marginTop: 14}}>
          <TextInput
              placeholder = "Цена события (в формате 0000.00)"
              placeholderTextColor = {COLORS.gray}
              keyboardType = "numeric"
              style = {{width: "100%"}}
              value = {price}
              onChangeText = {(text) => setPrice(text)}
          />
        </View>
        {errors.price ? <Text style = {{color: "red", marginTop: 5}}>{errors.price}</Text> : null}

        {errors.serverError ? <Text style = {{color: "red", marginTop: 5}}>{errors.serverError}</Text> : null}
        <View style = {{marginTop: 7, marginBottom: 220}}>
          <Button
            title = "Добавить событие"
            onPress = {handleAddEvent}
          />
        </View>
      </View>
    </ScrollView>
  )
};

export default AddEvent;

const styles = StyleSheet.create({
  dropdown: {
      marginTop: 14,
      height: 48,
      width: 332, 
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingTop: 6
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingLeft: 12
  },
  itemTextStyle: {
    fontSize: 14,
  },
  containerStyle: {
    width: 332,
    borderRadius: 8,
    borderColor: COLORS.white,
    shadowColor: COLORS.gray,
    marginLeft: -13
  },
  placeholderStyle: {
    fontSize: 14,
    color: COLORS.grey,
    paddingLeft: 7
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 0,
  },
  photoContainer: {
    width: 140,
    height: 110,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  picker: {
    width: '100%',
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 15,
    paddingHorizontal: 22,
    marginTop: 7
  },
  chosenDateText: {
    color: 'black',
  },
  placeholderText: {
    color: COLORS.grey
  },
});