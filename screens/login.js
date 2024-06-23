import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase";

const auth = getAuth();
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Add your login logic here
    try {
      const email = username + "@gmail.com";
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully:", response.user);
      navigation.navigate("Dashboard"); // Navigate to home screen
    } catch (error) {
      alert("Login Failed: Invalid username or password. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.jpeg")} // Replace with your logo image path
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>Enter your credentials to continue.</Text>
      <View style={styles.inputContainer}>
        <Image source={require("../assets/username.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require("../assets/lock.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Toggles secure entry based on showPassword state
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={
              showPassword
                ? require("../assets/eye-opened.png")
                : require("../assets/eye-closed.png")
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          !username || !password ? styles.disabledButton : null,
        ]}
        onPress={handleLogin}
        disabled={!username || !password}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        By logging, you are agreeing with our{" "}
        <Text style={styles.linkText}>Terms of Use</Text> and{" "}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
      <Text
        style={styles.registerText}
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an account? <Text style={styles.linkText}>Register</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  logoContainer: {
    top: 0,
    alignItems: "center",
    marginBottom: 0,
  },
  logo: {
    width: 250, // Adjust the size as needed
    height: 150,
    top: 0,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    color: "#007BFF",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 16,
    color: "#555",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  forgotPassword: {
    textAlign: "right",
    color: "#007BFF",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    color: "#777",
    fontSize: 12,
    marginBottom: 16,
  },
  linkText: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  registerText: {
    textAlign: "center",
    color: "#007BFF",
    fontSize: 14,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
});

export default LoginScreen;
