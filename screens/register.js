import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; // Assuming Firebase configuration is exported

const auth = getAuth();

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  const handleRegister = async () => {
    // Reset error messages
    setNameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setTermsError("");

    // Check if fields are filled
    if (!name) {
      setNameError("Please enter your name.");
      return;
    }
    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      return;
    }
    if (!agreeTerms) {
      setTermsError("Please agree to the terms.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    // Check password criteria
    const passwordRegex = /^(?=.*[@#$&_\-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 8 characters with at least one special character (@, #, $, &, _, -)."
      );
      return;
    }

    // Add your register logic here
    try {
      const email = name + "@gmail.com"; // Assuming username + "@gmail.com" format
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered successfully:", response.user);
      // Handle successful registration (e.g., display success message, navigate)
    } catch (error) {
      console.error("Registration error:", error);
      // Handle registration errors (e.g., display error message to user)
    }

    console.log("Name:", name);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Agree Terms:", agreeTerms);
    // Navigate to login screen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.jpeg")} // Replace with your logo image path
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Register to get started</Text>
      <View style={styles.inputContainer}>
        <Image source={require("../assets/username.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
      </View>
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
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
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <View style={styles.inputContainer}>
        <Image source={require("../assets/lock.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword} // Toggles secure entry based on showConfirmPassword state
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Image
            source={
              showConfirmPassword
                ? require("../assets/eye-opened.png")
                : require("../assets/eye-closed.png")
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      {confirmPasswordError ? (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      ) : null}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setAgreeTerms(!agreeTerms)}>
          <View style={styles.checkbox}>
            {agreeTerms && (
              <Image
                source={require("../assets/check.png")}
                style={styles.checkboxIcon}
              />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          By registering, you are agreeing with our{" "}
          <Text style={styles.linkText}>Terms of Use</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
      {termsError ? <Text style={styles.errorText}>{termsError}</Text> : null}
      <TouchableOpacity
        style={[
          styles.button,
          !name || !password || !confirmPassword || !agreeTerms
            ? styles.disabledButton
            : null,
        ]}
        onPress={handleRegister}
        disabled={!name || !password || !confirmPassword || !agreeTerms}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? <Text style={styles.linkText}>Login</Text>
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
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
    textAlign: "center", // Center align the error message
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  checkboxText: {
    flex: 1,
    fontSize: 12,
    color: "#555",
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
  linkText: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  loginText: {
    textAlign: "center",
    color: "#007BFF",
    fontSize: 14,
  },
});

export default RegisterScreen;
