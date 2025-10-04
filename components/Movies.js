import { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../Redux/favoritesSlice";

import { Ionicons } from "@expo/vector-icons";

function Movies({ navigation }) {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.movies);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=aa6fc65fcedb7431af3ac2fbe6484cd0&language=en-US&page=1"
      )
      .then((res) => {
        setList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isFavorite = (id) => favorites.some((movie) => movie.id === id);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.image}
            />
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            <View style={styles.actions}>
              <Button
                title="Show Details"
                color="#1e90ff"
                onPress={() => navigation.navigate("Details", { id: item.id })}
              />

              <TouchableOpacity
                onPress={() =>
                  isFavorite(item.id)
                    ? dispatch(removeFavorite(item.id))
                    : dispatch(addFavorite(item))
                }
              >
                <Ionicons
                  name={isFavorite(item.id) ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite(item.id) ? "red" : "white"}
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#111",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    padding: 8,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
});

export default Movies;
