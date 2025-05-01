import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SplashScreen from "../screens/SplashScreen";
import { getOnboardingStatus } from "../services/AsyncStorageService";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import { useUser } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [state, setState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

  const { profileImage, name, lastName } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    const data = async () => {
      try {
        const onboardingCompleted = await getOnboardingStatus();
        const storedName = await AsyncStorage.getItem("name");
        const storedEmail = await AsyncStorage.getItem("email");
        const hasProfileData = storedName && storedEmail;
        setState({
          isLoading: false,
          isOnboardingCompleted: onboardingCompleted && hasProfileData,
        });
      } catch (error) {
        console.error("AsyncStorage error:", error);
        setState({
          isLoading: false,
          isOnboardingCompleted: false,
        });
      }
    };
    data();
  }, []);

  if (state.isLoading) {
    return <SplashScreen />;
  }

  const renderHeaderRight = () => {
    const [avatarUri, setAvatarUri] = useState(null);
    const [initials, setInitials] = useState("--");
  
    const navigation = useNavigation();
  
    useEffect(() => {
      const loadUserData = async () => {
        try {
          const storedName = await AsyncStorage.getItem("name");
          const storedLastName = await AsyncStorage.getItem("lastName");
          const storedProfileImage = await AsyncStorage.getItem("profileImage");
  
          const initials =
            storedName && storedLastName
              ? (storedName[0] + storedLastName[0]).toUpperCase()
              : storedName
              ? storedName[0].toUpperCase()
              : "--";
  
          setInitials(initials);
          setAvatarUri(storedProfileImage);
        } catch (err) {
          console.log("Failed to load user data for header:", err);
        }
      };
  
      loadUserData();
    }, []);
  
    return (
      <Pressable onPress={() => navigation.navigate("Profile")}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.defaultAvatar]}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        )}
      </Pressable>
    );
  };
  

  return (
    <Stack.Navigator
      initialRouteName={state.isOnboardingCompleted ? "Home" : "Onboarding"}
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: () => (
          <Image style={styles.logo} source={require("../assets/Logo.png")} />
        ),
        headerShadowVisible: false,
        headerRight: renderHeaderRight,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    height: 50,
    width: 220,
    marginBottom: 10,
    marginRight: 20
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  defaultAvatar: {
    backgroundColor: "#62D6C4",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
  },
});

const HeaderAvatar = () => {
  const { profileImage, name, lastName } = useUser();
  const navigation = useNavigation();

  const initials = name
    ? (name[0] + (lastName ? lastName[0] : "")).toUpperCase()
    : "--";

  return (
    <Pressable onPress={() => navigation.navigate("Profile")}>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.defaultAvatar]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default Navigator;
