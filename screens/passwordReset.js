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
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

const PasswordResetScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handlePasswordChange = async () => {
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password criteria
    const passwordRegex = /^(?=.*[@#$&_\-]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must contain at least 8 characters with at least one special character (@, #, $, &, _, -)."
      );
      return;
    }

    // Add logic to change password here
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    // Reset state and show confirmation message
    setPasswordChanged(true);
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setTimeout(() => {
      setPasswordChanged(false);
      navigation.navigate("Login"); // Navigate to the login screen or any other screen
    }, 2000); // Redirect after 2 seconds
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/lock.png")} // Use lock icon instead of logo
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your new password.</Text>
      <View style={styles.inputContainer}>
        <Image source={require("../assets/lock.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            setError("");
          }}
          secureTextEntry={!showNewPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          <Image
            source={
              showNewPassword
                ? require("../assets/eye-opened.png")
                : require("../assets/eye-closed.png")
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Image source={require("../assets/lock.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setError("");
          }}
          secureTextEntry={!showConfirmPassword}
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={[
          styles.button,
          !newPassword || !confirmPassword ? styles.disabledButton : null,
        ]}
        onPress={handlePasswordChange}
        disabled={!newPassword || !confirmPassword}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      {passwordChanged && (
        <Text style={styles.confirmationText}>
          Password changed successfully. Redirecting to login...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
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
  errorText: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  confirmationText: {
    color: "#007BFF",
    textAlign: "center",
    marginTop: 16,
  },
});

export default PasswordResetScreen;
