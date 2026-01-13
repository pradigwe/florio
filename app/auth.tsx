import ThemedView from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Dokdo_400Regular } from "@expo-google-fonts/dokdo";
import { Nunito_500Medium } from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";

export default function AuthScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [loaded] = useFonts({
    Nunito_500Medium,
    Dokdo_400Regular,
  });

  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      fontFamily: "Dokdo_400Regular",
      fontSize: 70,
      color: theme.header,
      paddingBottom: 50,
    },
    inputContainer: {
      width: "100%",
      marginBottom: 16,
    },
    inputLabel: {
      fontFamily: "Nunito_500Medium",
      color: theme.header,
      paddingLeft: 12,
      paddingBottom: 4,
    },
    input: {
      width: "100%",
      height: 48,
      backgroundColor: "#fcfcfc",
      borderColor: theme.navBackground,
      color: theme.header,
      fontFamily: "Nunito_500Medium",
      fontSize: Fonts.h3.fontSize,
      borderRadius: 10,
      borderWidth: 0.7,
      paddingLeft: 20,
      paddingVertical: 10,
    },
    button: {
      width: "75%",
      backgroundColor: theme.primary,
      alignItems: "center",
      padding: 10,
      marginTop: 20,
      borderRadius: 100,
    },
    buttonText: {
      fontFamily: "Nunito_500Medium",
      color: theme.text,
      fontSize: Fonts.h3.fontSize,
    },
    buttonSwitchAuth: {
      marginTop: 15,
    },
    buttonSwitchAuthText: {
      fontFamily: "Nunito_500Medium",
      color: theme.primary,
      fontSize: Fonts.h3.fontSize,
    },
    messageText: {
      fontFamily: "Nunito_500Medium",
      color: theme.header,
      fontSize: Fonts.h2.fontSize,
      paddingBottom: 8,
    },
  });

  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
  };

  if (!loaded) {
    return null;
  }

  return (
    <ThemedView fullScreen={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.logo}>Florio</Text>
            <Text style={styles.messageText}>
              {isSignUp ? "Create Account" : "Welcome Back"}
            </Text>
            {isSignUp ? (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  placeholder="John"
                  style={[styles.input, Fonts.authText]}
                  selectionColor={theme.secondary}
                  autoCapitalize="none"
                  autoComplete="name"
                />
              </View>
            ) : (
              <></>
            )}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                placeholder="example@gmail.com"
                keyboardType="email-address"
                style={[styles.input, Fonts.authText]}
                selectionColor={theme.secondary}
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                placeholder="Password"
                style={[styles.input, Fonts.authText]}
                autoCapitalize="none"
                autoCorrect={false}
                selectionColor={theme.secondary}
                secureTextEntry
              />
            </View>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>
                {isSignUp ? "Sign Up" : "Sign In"}
              </Text>
            </Pressable>
            <Pressable style={styles.buttonSwitchAuth} onPress={handleSwitch}>
              <Text style={styles.buttonSwitchAuthText}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
