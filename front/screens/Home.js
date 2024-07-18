import React, {useEffect, useState, componentDidMount} from "react";
import {View, Text, Image, ScrollView, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView} from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import {SimpleLineIcons, Ionicons} from "@expo/vector-icons";
import {COLORS, images} from "../constants";
import {exhibitionsList, lecturesList, classesList} from "../constants/Data";
import Button from "../components/Button"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'
import axios from "axios";
import { SERVER_URL } from "../constants/api";

const HomeViewer = ({navigation}) => {
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const isFocused = useIsFocused()
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(1);
  const handleSearch = (text) => {
    setSearchQuery(text)
  };

  const getCities = () => {
    axios.get(SERVER_URL + "/api/cities").then((res) => {
      setCities(res.data.cities);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getEvents = () => {
    let URL = SERVER_URL + "/api/events?city_id=" + selectedCity;
    if (searchQuery) {
      URL += "&search=" + searchQuery;
    }
    axios.get(URL).then((res) => {
      setEvents(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getCities();
    setTimeout(getEvents, 500);
  }, [isFocused, selectedCity, searchQuery]);


  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: COLORS.white}}>
       <View style = {{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 50}}>
          <TouchableOpacity onPress = {() => navigation.navigate("HelpViewer")} style = {{marginLeft: 22}}>
            <SimpleLineIcons 
              name = "info" 
              size = {18} 
              color = {COLORS.black}
            />
          </TouchableOpacity>
          <Dropdown
            style = {styles.dropdown}
            selectedTextStyle = {styles.selectedTextStyle}
            itemTextStyle = {styles.itemTextStyle}
            data = {cities.map(city => ({label: city.name, value: city.id}))}
            maxHeight = {300}
            labelField = "label"
            valueField = "value"
            value = {selectedCity}
            onChange = {(item) => setSelectedCity(item.value)}
            activeColor = "transparent"
            containerStyle = {styles.containerStyle}
            itemContainerStyle = {styles.itemContainerStyle}
            renderRightIcon={() => (
              <Ionicons style={styles.icon} color="black" name="chevron-down" size={14} />
            )}
          />
          <View style = {{marginRight: 22}}>
            <Image
              source = {images.viewerAvatar}
              style = {{
                width: 25, 
                height: 25
              }}
            />  
          </View>
        </View>    
        <ScrollView style = {{marginHorizontal: 22, flex: 1}}>
          <View >
            <Text style = {{fontSize: 22, fontWeight: "800", color: COLORS.black, marginTop: 7}}>
              Приветствую вас, Муза искусства! 🤗
            </Text>
          </View>
          <View style = {{marginVertical: 14}}>
            <View style = {{width: "100%", height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, flexDirection: "row"}}>
              <Ionicons
                name=  "search-outline"
                size = {19}
                color = {COLORS.black}
                style = {{ position: "absolute", left: 14 }}
              />
              <TextInput
                placeholder = "Выставки, лекции, мастер-классы..."
                placeholderTextColor = {COLORS.gray}
                keyboardType = "default"
                onChangeText = {handleSearch}
                style = {{ flex: 1, paddingLeft: 25 }}
              />
            </View>
          </View>
          {events.map((category) => {
  if (category.events.length > 0) {
    return (
      <React.Fragment key={category.id}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 7 }}>
            {category.name}
          </Text>
        </View>
        <FlatList
          horizontal
          data={category.events}
          keyExtractor={(event) => event.id}
          renderItem={(event) => (
            <View style={{ marginRight: 16 }}>
              <TouchableOpacity onPress={() => navigation.navigate("DetailsViewer", { event: event.item })}>
                <Image
                  source={{ uri: event.item.image }}
                  style={{
                    height: 170,
                    width: 170,
                    marginBottom: 7,
                    borderRadius: 8
                  }}
                />
                <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: "bold", maxWidth: 170 }}>
                  {event.item.name}
                </Text>
                <Text style={{ fontSize: 10, color: COLORS.black }}>
                  {event.item.date}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 14 }}
        />
      </React.Fragment>
    );
  } else {
    return null;
  }
})}
        </ScrollView>
    </SafeAreaView>
  )
};
const HomeVisitor = ({navigation}) => {
  const [cities, setCities] = useState([]);
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [selectedCity, setSelectedCity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const isFocused = useIsFocused();
  const handleSearch = (text) => {
    setSearchQuery(text);
  }

  const getUsername = async () => {
    const user = await AsyncStorage.getItem("authUser");

    let parsedUser = JSON.parse(user);

    setName(parsedUser.name);
  }

  const getCities = () => {
    axios.get(SERVER_URL + "/api/cities").then((res) => {
      setCities(res.data.cities);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getEvents = () => {
    let URL = SERVER_URL + "/api/events?city_id=" + selectedCity;
    if (searchQuery) {
      URL += "&search=" + searchQuery;
    }
    axios.get(URL).then((res) => {
      setEvents(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getUsername();
    getCities();
    setTimeout(getEvents, 500);
  }, [isFocused, selectedCity, searchQuery]);
  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: COLORS.white}}>
       <View style = {{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 50}}>
          <TouchableOpacity onPress = {() => navigation.navigate("HelpVisitor")} style = {{marginLeft: 22}}>
            <SimpleLineIcons 
              name = "info" 
              size = {18} 
              color = {COLORS.black}
            />
          </TouchableOpacity>
          <Dropdown
            style = {styles.dropdown}
            selectedTextStyle = {styles.selectedTextStyle}
            itemTextStyle = {styles.itemTextStyle}
            data = {cities.map(city => ({label: city.name, value: city.id}))}
            maxHeight = {300}
            labelField = "label"
            valueField = "value"
            value = {selectedCity}
            onChange = {(item) => setSelectedCity(item.value)}
            activeColor = "transparent"
            containerStyle = {styles.containerStyle}
            itemContainerStyle = {styles.itemContainerStyle}
            renderRightIcon={() => (
              <Ionicons style={styles.icon} color="black" name="chevron-down" size={14} />
            )}
          />
          <View style = {{marginRight: 22}}>
            <Image
              source = {images.visitorAvatar}
              style = {{
                width: 25, 
                height: 25
              }}
            />  
          </View>
        </View>    
        <ScrollView style = {{marginHorizontal: 22, flex: 1}}>
          <View >
            <Text style = {{fontSize: 22, fontWeight: "800", color: COLORS.black}}>
              Приветствую вас, {name}! 🤗
            </Text>
          </View>
          <View style = {{marginVertical: 14}}>
            <View style = {{width: "100%", height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, flexDirection: "row"}}>
              <Ionicons
                name=  "search-outline"
                size = {19}
                color = {COLORS.black}
                style = {{ position: "absolute", left: 14 }}
              />
              <TextInput
                placeholder = "Выставки, лекции, мастер-классы..."
                placeholderTextColor = {COLORS.gray}
                keyboardType = "default"
                onChangeText = {handleSearch}
                style = {{ flex: 1, paddingLeft: 25 }}
              />
            </View>
          </View>
          {events.map((category) => {
  if (category.events.length > 0) {
    return (
      <React.Fragment key={category.id}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 7 }}>
            {category.name}
          </Text>
        </View>
        <FlatList
          horizontal
          data={category.events}
          keyExtractor={(event) => event.id}
          renderItem={(event) => (
            <View style={{ marginRight: 16 }}>
              <TouchableOpacity onPress={() => navigation.navigate("DetailsVisitor", { event: event.item })}>
                <Image
                  source={{ uri: event.item.image }}
                  style={{
                    height: 170,
                    width: 170,
                    marginBottom: 7,
                    borderRadius: 8
                  }}
                />
                <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: "bold", maxWidth: 170 }}>
                  {event.item.name}
                </Text>
                <Text style={{ fontSize: 10, color: COLORS.black }}>
                  {event.item.date}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 14 }}
        />
      </React.Fragment>
    );
  } else {
    return null;
  }
})}          
        </ScrollView>
    </SafeAreaView>
  )
};
const HomeAdmin = ({navigation}) => {
  const [cities, setCities] = useState([]);
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [selectedCity, setSelectedCity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const isFocused = useIsFocused();
  const handleSearch = (text) => {
    setSearchQuery(text);
  }

  const getUsername = async () => {
    const user = await AsyncStorage.getItem("authUser");

    let parsedUser = JSON.parse(user);

    setName(parsedUser.name);
  }

  const getCities = () => {
    axios.get(SERVER_URL + "/api/cities").then((res) => {
      setCities(res.data.cities);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getEvents = () => {
    let URL = SERVER_URL + "/api/events?city_id=" + selectedCity;
    if (searchQuery) {
      URL += "&search=" + searchQuery;
    }
    axios.get(URL).then((res) => {
      setEvents(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getCities();
    getUsername();
    setTimeout(getEvents, 500);
  }, [isFocused, selectedCity, searchQuery]);

  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: COLORS.white}}>
       <View style = {{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 50}}>
          <TouchableOpacity onPress = {() => navigation.navigate("HelpAdmin")} style = {{marginLeft: 22}}>
            <SimpleLineIcons 
              name = "info" 
              size = {18} 
              color = {COLORS.black}
            />
          </TouchableOpacity>
          <Dropdown
            style = {styles.dropdown}
            selectedTextStyle = {styles.selectedTextStyle}
            itemTextStyle = {styles.itemTextStyle}
            data = {cities.map(city => ({label: city.name, value: city.id}))}
            maxHeight = {300}
            labelField = "label"
            valueField = "value"
            value = {selectedCity}
            onChange = {(item) => setSelectedCity(item.value)}
            activeColor = "transparent"
            containerStyle = {styles.containerStyle}
            itemContainerStyle = {styles.itemContainerStyle}
            renderRightIcon = {() => (
              <Ionicons style = {styles.icon} color="black" name="chevron-down" size={14} />
            )}
          />
          <View style = {{marginRight: 22}}>
            <Image
              source = {images.adminAvatar}
              style = {{
                width: 25, 
                height: 25
              }}
            />  
          </View>
        </View>    
        <ScrollView style = {{marginHorizontal: 22, flex: 1}}>
          <View >
            <Text style = {{fontSize: 22, fontWeight: "800", color: COLORS.black}}>
              Приветствую вас, {name}! 🤗
            </Text>
          </View>
          <View style = {{marginTop: 14}}>
            <View style = {{width: "100%", height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, flexDirection: "row"}}>
              <Ionicons
                name=  "search-outline"
                size = {19}
                color = {COLORS.black}
                style = {{position: "absolute", left: 14}}
              />
              <TextInput
                placeholder = "Выставки, лекции, мастер-классы..."
                placeholderTextColor = {COLORS.gray}
                keyboardType = "default"
                onChangeText = {handleSearch}
                style = {{flex: 1, paddingLeft: 25}}
              />
            </View>
          </View>
          <Button
            title="Добавить событие"
            onPress={() => navigation.navigate("AddEvent")}
          />
         {events.map((category) => {
  if (category.events.length > 0) {
    return (
      <React.Fragment key={category.id}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 7 }}>
            {category.name}
          </Text>
        </View>
        <FlatList
          horizontal
          data={category.events}
          keyExtractor={(event) => event.id}
          renderItem={(event) => (
            <View style={{ marginRight: 16 }}>
              <TouchableOpacity onPress={() => navigation.navigate("DetailsAdmin", { event: event.item })}>
                <Image
                  source={{ uri: event.item.image }}
                  style={{
                    height: 170,
                    width: 170,
                    marginBottom: 7,
                    borderRadius: 8
                  }}
                />
                <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: "bold", maxWidth: 170 }}>
                  {event.item.name}
                </Text>
                <Text style={{ fontSize: 10, color: COLORS.black }}>
                  {event.item.date}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 14 }}
        />
      </React.Fragment>
    );
  } else {
    return null;
  }
})}    
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  dropdown: {
    width: 71,
    borderRadius: 8
  },
  selectedTextStyle: {
    fontSize: 14,
    height: 15
  },
  itemTextStyle: {
    fontSize: 14,
    height: 20,
    marginHorizontal: 1
  },
  containerStyle: {
    marginLeft: -38,
    width: 150,
    borderRadius: 8,
    borderColor: COLORS.white,
    shadowColor: COLORS.grey
  },
  itemContainerStyle: {
    height: 50
  },
  icon: {
    marginTop: 5,
    marginLeft: 5
  }
});

export { HomeViewer, HomeVisitor, HomeAdmin };