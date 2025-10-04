import { useNavigation } from "@react-navigation/native";
import { Pressable, Image, StyleSheet, Text, View } from "react-native";

const MyCard = ({ id, image, title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: image }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title}>{title}</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Details", { id })}
      >
        <Text style={styles.buttonText}>Show Details</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#1e1e2c", 
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  poster: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#ff9800",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default MyCard;
