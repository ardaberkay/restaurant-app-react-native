import AsyncStorage from "@react-native-async-storage/async-storage";

export const setOnboardingStatus = async () => {
  try {
    await AsyncStorage.setItem("onboardingCompleted", "true");
  } catch (error) {
    console.error("AsyncStorage error:", error);
  }
};

export const getOnboardingStatus = async () => {
    try {
      const status = await AsyncStorage.getItem("onboardingCompleted");
      return status === 'true';
    } catch (error) {
      console.error("AsyncStorage error:", error);
      return false;
    }
  };
