import * as React from "react";
import { Provider, useSelector } from "react-redux";
import store from "./Redux/Store";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Movies from "./components/Movies";
import Details from "./components/Details";
import Form from "./components/Form";
import ToDoApp from "./components/Todo";
import Favorites from "./components/Favorite"; 


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MoviesStack({ navigation }) {

  const moviesCount = useSelector((state) => state.favorites.movies.length);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name=" Popular Movies"
        component={Movies}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 15,
              }}
              onPress={() => navigation.navigate("Favorites")}
            >
              <Ionicons name="heart" size={24} color="red" />
              <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
                {moviesCount}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Favorites" component={Favorites} /> 
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#272c31ff" }, 
            headerTintColor: "#fff", 
            headerTitleStyle: { fontWeight: "bold" }, 
            drawerActiveTintColor: "#0d1216ff", 
            drawerLabelStyle: { fontSize: 16 },
          }}
        
        >
          <Drawer.Screen name="Movies" component={MoviesStack} />
          <Drawer.Screen name="Form" component={Form} />
          <Drawer.Screen name="Todo" component={ToDoApp} />
          <Drawer.Screen name="Favorites" component={Favorites} /> 

        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
