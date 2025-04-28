import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SplashScreen from "../screens/SplashScreen";
import { getOnboardingStatus } from "../services/AsyncStorageService";
import { Image, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [state, setState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

  useEffect(() => {
    const data = async () => {
      try {
        const onboardingCompleted = await getOnboardingStatus();
        setState({
          isLoading: false,
          isOnboardingCompleted: onboardingCompleted,
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

  return (
    <Stack.Navigator
      initialRouteName={state.isOnboardingCompleted ? "Home" : "Profile"}
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: () => <Image style={styles.logo} source={require("../assets/Logo.png")} />,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create ({
  logo: {
    resizeMode: 'contain',
    height: 50,
    width: 220,
    marginBottom: 10
  }
});

export default Navigator;
