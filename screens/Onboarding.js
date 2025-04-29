import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,}$/;
    return regex.test(email);
  };

  const handleNext = () => {
    if (!name || !email) {
      Alert.alert("Error", "Please fill in both fields.")
    }
    else if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid mail")
    }
    else {
      navigation.navigate('Profile', { name, email });
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.navbar}>
        <Image style={styles.logo} source={require("../assets/Logo.png")} />
      </View>
      <View style={styles.body}>
        <Text style={styles.header}>Let's get to know you.</Text>
        <Text style={styles.labelText}>First Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
        />
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.bottomBody}>
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  logo: {
    height: 50,
  },
  navbar: {
    backgroundColor: "#DEE3E9",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: "#CBD2D9",
    flex: 0.7,
  },
  header: {
    fontSize: 30,
    paddingBottom: 200,
    color: "#304450",
    fontWeight: "bold",
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#304450",
    borderRadius: 8,
    marginBottom: 20,
    padding: 15,
  },
  labelText: {
    fontSize: 20,
    paddingBottom: 15,
    color: "#26343D",
  },
  bottomBody: {
    flex: 0.3,
    backgroundColor: "#F1F4F7",
    flexDirection: 'row-reverse'
  },
  button: {
    backgroundColor: '#CBD2D9',
    width: 120,
    height: 50,
    margin: 25,
    borderRadius: 8,
  },
  buttonText: {
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    color: '#26343D'
  }
});

export default Onboarding;
