import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { removeFavorite } from "../Redux/favoritesSlice";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.movies);
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet ❤️</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.image}
            />
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            <TouchableOpacity
              style={styles.favoriteBtn}
              onPress={() => dispatch(removeFavorite(item.id))}
            >
              <Ionicons name="heart" size={24} color="red" />
            </TouchableOpacity>
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
    position: "relative",
  },
  image: {
    width: "50%",
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
  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Favorites;
