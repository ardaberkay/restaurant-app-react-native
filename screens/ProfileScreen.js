import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Checkbox } from "react-native-paper";

const ProfileScreen = ({ route }) => {
  const [image, setImage] = useState(null);
  const [isChecked, setChecked] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });
  const { name: initialName, email: initialEmail } = route.params;
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  const changeImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <ScrollView style={style.container} keyboardShouldPersistTaps="handled">
      <View style={style.body}>
        <Text style={style.headText}>Personal information</Text>
        <View style={style.photoRow}>
          {image ? (
            <Image source={{ uri: image }} style={style.pp} /> // Görsel varsa göster
          ) : (
            <Image source={require("../assets/Profile.png")} style={style.pp} /> // Varsayılan görsel
          )}
          <Pressable style={style.buttonOne} onPress={changeImage}>
            <Text style={style.buttonTextOne}>Change</Text>
          </Pressable>
          <Pressable style={style.buttonTwo} onPress={removeImage}>
            <Text style={style.buttonTextTwo}>Remove</Text>
          </Pressable>
        </View>
        <View style={style.inputBody}>
          <Text style={style.labelText}>First Name</Text>
          <TextInput style={style.inputBox} value={name} onChangeText={setName}></TextInput>
          <Text style={style.labelText}>Last Name</Text>
          <TextInput style={style.inputBox}></TextInput>
          <Text style={style.labelText}>Email</Text>
          <TextInput style={style.inputBox} value={email} onChangeText={setEmail}></TextInput>
          <Text style={style.labelText}>Phone Number</Text>
          <TextInput style={style.inputBox}></TextInput>
        </View>
        <View style={style.notifications}>
          <Text style={style.headTextNot}>Email notification</Text>
          <View style={style.checkContainer}>
            <Checkbox.Android
              label="sade"
              status={isChecked.option1 ? "checked" : "unchecked"}
              color="#495E57"
              onPress={() => {
                setChecked((prev) => ({ ...prev, option1: !prev.option1 }));
              }}
            />
            <Text style={style.checkBoxText}>Order statuses</Text>
          </View>
          <View style={style.checkContainer}>
            <Checkbox.Android
              label="sade"
              status={isChecked.option2 ? "checked" : "unchecked"}
              color="#495E57"
              onPress={() => {
                setChecked((prev) => ({ ...prev, option2: !prev.option2 }));
              }}
            />
            <Text style={style.checkBoxText}>Password changes</Text>
          </View>
          <View style={style.checkContainer}>
            <Checkbox.Android
              label="sade"
              status={isChecked.option3 ? "checked" : "unchecked"}
              color="#495E57"
              onPress={() => {
                setChecked((prev) => ({ ...prev, option3: !prev.option3 }));
              }}
            />
            <Text style={style.checkBoxText}>Special Offers</Text>
          </View>
          <View style={style.checkContainer}>
            <Checkbox.Android
              label="sade"
              status={isChecked.option4 ? "checked" : "unchecked"}
              color="#495E57"
              onPress={() => {
                setChecked((prev) => ({ ...prev, option4: !prev.option4 }));
              }}
            />
            <Text style={style.checkBoxText}>Newsteller</Text>
          </View>
        </View>
        <Pressable style={style.logoutButton} onPress={""}>
          <Text style={style.logoutButtonText}>Log out</Text>
        </Pressable>
        <View style={style.changeButtonView}>
          <Pressable style={style.discardButton} onPress={""}>
            <Text style={style.buttonTextTwo}>Discard changes</Text>
          </Pressable>
          <Pressable
            style={style.discardButton}
            backgroundColor={"#495E57"}
            onPress={""}
          >
            <Text style={style.buttonTextOne}>Save changes</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "white",
    borderColor: "#D3D3D3",
    flexDirection: "column",
    padding: 15,
  },
  buttonOne: {
    width: 90,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 30,
    alignItems: "center",
    backgroundColor: "#495E57",
  },
  buttonTwo: {
    width: 90,
    height: 40,
    borderWidth: 1,
    marginLeft: 20,
    alignItems: "center",
    borderColor: "#495E57",
  },
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  pp: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
  },
  buttonTextOne: {
    padding: 7,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  buttonTextTwo: {
    padding: 7,
    fontSize: 15,
    fontWeight: "bold",
    color: "#495E57",
  },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#495E57",
    padding: 5,
  },
  inputBody: {
    padding: 5,
  },
  labelText: {
    fontSize: 14,
    marginBottom: 10,
    color: "#92939B",
    fontWeight: "bold",
  },
  inputBox: {
    borderWidth: 2,
    borderColor: "#EAEAEE",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    color: '#73737A',
    fontWeight: 'bold'
  },
  headTextNot: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#495E57",
    padding: 5,
  },
  notifications: {
    flexDirection: "column",
    marginBottom: 30,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxText: {
    color: "#9696A2",
    fontWeight: "bold",
  },
  changeButtonView: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
  },
  logoutButton: {
    borderWidth: 2,
    borderColor: "#DCAD54",
    backgroundColor: "#F4CE14",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#5C4E07",
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  discardButton: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default ProfileScreen;
