import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation/Navigator";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </UserProvider>
  );
}
