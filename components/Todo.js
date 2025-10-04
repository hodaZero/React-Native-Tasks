import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ToDoApp() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem("todos");
        if (savedTodos) setTodos(JSON.parse(savedTodos));
      } catch (err) {
        console.log(err);
      }
    };
    loadTodos();
  }, []);

  const saveTodos = async (newTodos) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(newTodos));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddOrUpdate = () => {
    if (todo.trim() === "") {
      setError("Todo cannot be empty");
      return;
    }
    setError("");

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = todo;
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setEditIndex(null);
    } else {
      const newTodos = [...todos, todo];
      setTodos(newTodos);
      saveTodos(newTodos);
    }
    setTodo("");
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const handleEdit = (index) => {
    setTodo(todos[index]);
    setEditIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My ToDo App</Text>

      <TextInput
        style={styles.input}
        placeholder="Add a new todo..."
        value={todo}
        onChangeText={setTodo}
        placeholderTextColor="#888"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleAddOrUpdate}>
        <Text style={styles.buttonText}>
          {editIndex !== null ? "Update Todo" : "Add Todo"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#d2ec5dff" }]}
                onPress={() => handleEdit(index)}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#08af3aff" }]}
                onPress={() => handleDelete(index)}
              >
                <Text style={styles.actionText}>Delete</Text>
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
    padding: 20,
    backgroundColor: "#fef6e4", 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000000ff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000ff", 
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fff8f0", 
    fontSize: 16,
    marginBottom: 10,
    shadowColor: "#353029ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  error: {
    color: "#000000ff", 
    marginBottom: 10,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#258d5dff", 
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#26744fff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff3e6", 
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#246941ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  todoText: {
    fontSize: 16,
    flex: 1,
    color: "#6b4226", 
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ToDoApp;
