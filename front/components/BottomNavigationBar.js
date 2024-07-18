import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../constants";
import {HomeViewer, HomeVisitor, HomeAdmin, FavouriteViewer, FavouriteVisitor, ProfileViewer, ProfileVisitor, ProfileAdmin} from "../screens";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    height: 50,
    borderTopWidth: 0
  }
};

const BottomTabNavigationViewer = () => {
  return (
    <Tab.Navigator screenOptions = {screenOptions}>
      <Tab.Screen
        name = "HomeViewer"
        component = {HomeViewer}
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name = {focused ? "home-sharp" : "home-outline"}
                size = {18}
                color = {COLORS.black}
              />
            )
          }
        }}
      />  
      <Tab.Screen
        name = "FavouriteViewer"
        component = {FavouriteViewer}
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name = {focused ? "heart-sharp" : "heart-outline"}
                size = {20}
                color = {COLORS.black}
              />
            )
          }
        }}
      />
      <Tab.Screen
        name = "ProfileViewer"
        component = {ProfileViewer}
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name = {focused ? "person" : "person-outline"}
                size = {18}
                color = {COLORS.black}
              />
            )
          }
        }}
      />
    </Tab.Navigator>
  )
};

const BottomTabNavigationVisitor = () => {
  return (
    <Tab.Navigator screenOptions = {screenOptions}>
      <Tab.Screen
        name = "HomeVisitor"
        component = {HomeVisitor}
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name = {focused ? "home-sharp" : "home-outline"}
                size = {18}
                color = {COLORS.black}
              />
            )
          }
        }}
      />  
      <Tab.Screen
        name = "FavouriteVisitor"
        component = {FavouriteVisitor}
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name = {focused ? "heart-sharp" : "heart-outline"}
                size = {20}
                color = {COLORS.black}
              />
            )
          }
        }}
      />
      <Tab.Screen
        name = "ProfileVisitor"
        component = {ProfileVisitor}
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name = {focused ? "person" : "person-outline"}
                size = {18}
                color = {COLORS.black}
              />
            )
          }
        }}
      />
    </Tab.Navigator>
  )
};

const BottomTabNavigationAdmin = () => {
  return (
    <Tab.Navigator screenOptions = {screenOptions}>
      <Tab.Screen
        name = "HomeAdmin"
        component = {HomeAdmin}
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name = {focused ? "home-sharp" : "home-outline"}
                size = {18}
                color = {COLORS.black}
              />
            )
          }
        }}
      />  
      <Tab.Screen
        name = "ProfileAdmin"
        component = {ProfileAdmin}
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name = {focused ? "person" : "person-outline"}
                size = {18}
                color = {COLORS.black}
              />
            )
          }
        }}
      />
    </Tab.Navigator>
  )
};

export { BottomTabNavigationViewer, BottomTabNavigationVisitor, BottomTabNavigationAdmin}
