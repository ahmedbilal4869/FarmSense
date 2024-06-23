import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/register"; // Assume you have a RegisterScreen component
import DashboardScreen from "./screens/dashboard"; // Assume you have a DashboardScreen component
import ForgotPasswordScreen from "./screens/forgotPassword";
import PasswordResetScreen from "./screens/passwordReset";
import AddCowScreen from "./screens/AddCow";
import CatalogScreen from "./screens/Catalogue";
import DailyLogsScreen from "./screens/DailyLogs";
import DetailsScreen from "./screens/ViewDetails";
// import Catalogue from "./screens/Catalogue";
import { app } from "./config/firebase";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // hide header for Login screen
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }} // hide header for Register screen
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCow"
          component={AddCowScreen}
          options={{ title: "Add Cow" }}
        />
        <Stack.Screen
          name="Catalog"
          component={CatalogScreen}
          options={{ title: "CatalogScreen" }}
        />
        <Stack.Screen
          name="ViewDetails"
          component={DetailsScreen} // hide header for Register screen
        />
        <Stack.Screen
          name="DailyLogs"
          component={DailyLogsScreen}
          options={{ title: "Daily Logs" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
