import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";

const ProfileScreen = () => {
  const [image, setImage] = useState(null);

  const changeImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      (response) => {
        if (response.assets && response.assets[0]) {
          setImage(response.assets[0].uri);
        }
      }
    );
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <View style={style.container}>
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
      </View>
    </View>
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
    alignItems: 'center',
    backgroundColor: '#495E57'
  },
  buttonTwo: {
    width: 90,
    height: 40,
    borderWidth: 1,
    marginLeft: 20,
    alignItems: 'center',
    borderColor: '#495E57'
  },
  photoRow: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 20
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
    fontWeight: 'bold',
    color: 'white'
  },
  buttonTextTwo: {
    padding: 7,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#495E57'
  },
  headText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495E57',
    padding: 5
  }
});

export default ProfileScreen;
