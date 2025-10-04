import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Button } from "react-native";
import { Modal, Text } from "react-native-paper";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [modaVisible, setModaVisible] = useState(false);
  const [showpass, setShowpass] = useState(false);

  const [errors, setErrors] = useState({
    namerr: "",
    emailerr: "",
    passerr: "",
    phone_err: "",
  });

  const validate = () => {
    let valid = true;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^\d+$/;

    const newErrors = {
      namerr: "",
      emailerr: "",
      passerr: "",
      phone_err: "",
    };

    // Name validation
    if (name.length === 0) {
      newErrors.namerr = "name is required";
      valid = false;
    } else if (name.length <= 2) {
      newErrors.namerr = "name must be more than two characters";
      valid = false;
    }

    // Email validation
    if (email.length === 0) {
      newErrors.emailerr = "email is required";
      valid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.emailerr = "email is not valid";
      valid = false;
    }

    // Password validation
    if (password.length === 0) {
      newErrors.passerr = "password is required";
      valid = false;
    } else if (password.length < 8) {
      newErrors.passerr = "password must be at least 8 characters";
      valid = false;
    }

    // Phone number validation
    if (phone_number.length === 0) {
      newErrors.phone_err = "phone number is required";
      valid = false;
    } else if (phone_number.length !== 11) {
      newErrors.phone_err = "phone number must be 11 digits";
      valid = false;
    } else if (!phonePattern.test(phone_number)) {
      newErrors.phone_err = "phone number must be numeric only";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      setModaVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        style={{
          textAlign: "center",
          fontSize: 28,
          color: "#700854ff",
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Registration Form
      </Text>

      <View style={styles.box}>
        <TextInput
          placeholder="Enter your name"
          keyboardType="default"
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrors((prev) => ({ ...prev, namerr: "" }));
          }}
        />
        <Text style={styles.errorText}>{errors.namerr}</Text>

        <TextInput
          placeholder="Enter your password"
          keyboardType="default"
          secureTextEntry={!showpass}
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors((prev) => ({ ...prev, passerr: "" }));
          }}
        />
        <Text style={styles.errorText}>{errors.passerr}</Text>

        <TouchableOpacity onPress={() => setShowpass(!showpass)}>
          <Text style={{ color: "#700854ff", marginBottom: 10 }}>
            {showpass ? "Hide Password" : "Show Password"}
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prev) => ({ ...prev, emailerr: "" }));
          }}
        />
        <Text style={styles.errorText}>{errors.emailerr}</Text>

        <TextInput
          placeholder="Enter your phone number"
          keyboardType="numeric"
          style={styles.input}
          value={phone_number}
          onChangeText={(text) => {
            setPhone_number(text);
            setErrors((prev) => ({ ...prev, phone_err: "" }));
          }}
        />
        <Text style={styles.errorText}>{errors.phone_err}</Text>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <Modal visible={modaVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Name is: {name}</Text>
            <Text style={styles.modalText}>Password is: {password}</Text>
            <Text style={styles.modalText}>Email is: {email}</Text>
            <Button
              title="Close"
              onPress={() => setModaVisible(false)}
              color="#6b165eff"
            />
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  box: {
    backgroundColor: "#edcbddff",
    padding: 30,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ecd4d4ff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#520e43ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: "50%",
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 8,
  },
  modalButton: {
    marginTop: 15,
  },
});

export default Form;
