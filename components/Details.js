import { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";

function Details({ route }) {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=aa6fc65fcedb7431af3ac2fbe6484cd0&language=en-US`
      )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie)
    return (
      <Text style={{ textAlign: "center", marginTop: 20, color: "#ff9800" }}>
        Loading...
      </Text>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
          <Text style={styles.details}> Rating: {movie.vote_average}/10</Text>
          <Text style={styles.details}> Release: {movie.release_date}</Text>
          <Text style={styles.details}> Runtime: {movie.runtime} mins</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  poster: {
    width: 180,
    height: 260,
    borderRadius: 10,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#ff9800",
  },
  overview: {
    marginBottom: 15,
    color: "#ccc",
    fontSize: 16,
    lineHeight: 22,
  },
  details: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Details;
