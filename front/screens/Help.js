import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";

const HelpViewer = ({ navigation }) => {
  const handleRegistrationPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Мы понимаем, что ваше время ценно, поэтому сделали всё возможное, чтобы упростить вам работу с нашим приложением, объединив все доступные функции в одном месте 🤍
      </Text>
      <Text style={styles.featureHeader}>Среди доступных возможностей:</Text>
      <Text style={styles.description}>
        - Просмотр культурных событий в выбранном городе 🌍{'\n'}
        - Поиск событий по названию и фильтрация по различным критериям 🔎{'\n'}
        - Просмотр фотографий, дат проведения и описаний мероприятий 👀
      </Text>
      <View style={styles.registrationContainer}>
        <Text style={styles.registrationText}>
          ❗ Не забудьте{' '}
        </Text>
        <TouchableOpacity onPress={handleRegistrationPress}>
          <Text style={styles.link}>войти</Text>
        </TouchableOpacity>
        <Text style={styles.registrationText}>
          {' '}в свою учётную
        </Text>
      </View>
      <Text style={styles.description}> 
        запись для получения более подробной информации о событиях, возможности сохранения и управления вашими предпочтениями для незабываемого культурного опыта! 👤
      </Text>
      <Text style={styles.centeredText}>
        Желаем вам увлекательных приключений и незабываемых встреч! 🌟
      </Text>
    </View>
  );
}  

const HelpVisitor = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Мы понимаем, что ваше время ценно, поэтому сделали всё возможное, чтобы упростить вам работу с нашим приложением, объединив все доступные функции в одном месте 🤍
      </Text>
      <Text style={styles.featureHeader}>Среди доступных возможностей:</Text>
        <Text style={styles.description}>
        - Просмотр культурных событий в выбранном городе 🌍{'\n'}
        - Поиск событий по названию и фильтрация по различным критериям 🔎{'\n'}
        - Просмотр фотографий, дат проведения, описаний, адресов, времени, цены и контактов организаторов мероприятий 👀{'\n'}
        - Редактирование учётных данных 👤{'\n'}
        - Сохранение событий в избранное для быстрого доступа и удобного просмотра ❤️
        </Text>
        <Text style={styles.centeredText}>Желаем вам увлекательных приключений и незабываемых встреч! 🌟</Text>
    </View>
  );
}

const HelpAdmin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Мы понимаем, что ваше время ценно, поэтому сделали всё возможное, чтобы упростить вам работу с нашим приложением, объединив все доступные функции в одном месте 🤍
      </Text>
        <Text style={styles.featureHeader}>Среди доступных возможностей:</Text>
        <Text style={styles.description}>
        - Просмотр культурных событий в выбранном городе 🌍{'\n'}
        - Поиск событий по названию и фильтрация по различным критериям 🔎{'\n'}
        - Просмотр фотографий, дат проведения, описаний, адресов, времени, цены и контактов организаторов мероприятий 👀{'\n'}
        - Редактирование учётных данных 👤{'\n'}
        - Добавление, изменение и удаление событий ➕🖊️🗑️
        </Text>
        <Text style={styles.centeredText}>Спасибо, что вы с нами ❤️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
  },
  description: {
    fontSize: 16,
    marginBottom: 7
  },
  featureHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  registrationContainer: {
    flexDirection: 'row',
    marginBottom: 0
  },
  registrationText: {
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  centeredText: {
    fontSize: 16,
    textAlign: 'center',
  },
});


export { HelpViewer, HelpVisitor, HelpAdmin };