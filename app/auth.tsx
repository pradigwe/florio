import ThemedView from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useAuth } from "@/hooks/useAuth";
import { Dokdo_400Regular } from "@expo-google-fonts/dokdo";
import { Nunito_500Medium } from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";
import { CheckFatIcon, CircleIcon, IconContext } from "phosphor-react-native";
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
import Animated from "react-native-reanimated";

export default function AuthScreen() {
  // styling
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [loaded] = useFonts({
    Nunito_500Medium,
    Dokdo_400Regular,
  });

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
    errorMessageText: {
      marginTop: 15,
      color: Colors.warning,
      fontFamily: "Nunito_500Medium",
      fontSize: Fonts.h3.fontSize,
    },
    animationContainer: {
      width: "100%",
      alignItems: "center",
    },
    checkListContainer: {
      backgroundColor: theme.navBackground,
      width: "95%",
      padding: 10,
      paddingLeft: 20,
      borderRadius: 5,
      gap: 5,
    },
    checklistSection: {
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
    },
    checkListText: {
      fontFamily: "Nunito_500Medium",
      fontSize: Fonts.primaryText.fontSize,
    },
  });

  const { login, register } = useAuth();

  // authentication variables
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  // checking if user has a valid password when registering
  const [passwordLength, setPasswordLength] = useState<boolean>(false);
  const [passwordhasUpper, setPasswordhasUpper] = useState<boolean>(false);
  const [passwordhasNumber, setPasswordhasNumber] = useState<boolean>(false);

  const checkValidPassword = (password: string) => {
    setPasswordLength(password.length >= 8);
    setPasswordhasUpper(/[A-Z]/.test(password));
    setPasswordhasNumber(/[0-9]/.test(password));
  };

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields");
      return;
    }
    if (
      !isLogin &&
      (!passwordLength || !passwordhasNumber || !passwordhasUpper)
    ) {
      setError("Your password doesn't meet all the requirements yet.");
      return;
    }

    setError("");
    if (isLogin) {
      const error = await login(email, password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      const error = await register(email, password, name);
      if (error) {
        setError(error);
        return;
      }
    }
  };

  const handleLoginSwitch = () => {
    setIsLogin((prev) => !prev);
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
              {isLogin ? "Welcome Back" : "Create Account"}
            </Text>
            {isLogin ? (
              <></>
            ) : (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  placeholder="John"
                  style={[styles.input, Fonts.authText]}
                  selectionColor={theme.secondary}
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect={false}
                  onChangeText={setName}
                />
              </View>
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
                autoCorrect={false}
                onChangeText={setEmail}
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
                onChangeText={(password) => {
                  checkValidPassword(password);
                  setPassword(password);
                }}
              />
            </View>
            {isLogin ? (
              <></>
            ) : (
              <View style={styles.checkListContainer}>
                <IconContext.Provider value={{ size: 16, weight: "bold" }}>
                  <View style={styles.checklistSection}>
                    {passwordLength ? (
                      <CheckFatIcon
                        color={theme.passwordChecklist}
                        weight="fill"
                      />
                    ) : (
                      <CircleIcon color={theme.textInactive} />
                    )}
                    <Text
                      style={[
                        styles.checkListText,
                        {
                          color: passwordLength
                            ? theme.text
                            : theme.textInactive,
                        },
                      ]}
                    >
                      At least 8 characters
                    </Text>
                  </View>
                  <View style={styles.checklistSection}>
                    {passwordhasUpper ? (
                      <CheckFatIcon
                        color={theme.passwordChecklist}
                        weight="fill"
                      />
                    ) : (
                      <CircleIcon color={theme.textInactive} />
                    )}
                    <Text
                      style={[
                        styles.checkListText,
                        {
                          color: passwordhasUpper
                            ? theme.text
                            : theme.textInactive,
                        },
                      ]}
                    >
                      Includes an uppercase letter
                    </Text>
                  </View>
                  <View style={styles.checklistSection}>
                    {passwordhasNumber ? (
                      <CheckFatIcon
                        color={theme.passwordChecklist}
                        weight="fill"
                      />
                    ) : (
                      <CircleIcon color={theme.textInactive} />
                    )}
                    <Text
                      style={[
                        styles.checkListText,
                        {
                          color: passwordhasNumber
                            ? theme.text
                            : theme.textInactive,
                        },
                      ]}
                    >
                      Includes a number{" "}
                    </Text>
                  </View>
                </IconContext.Provider>
              </View>
            )}
            {error && <Text style={styles.errorMessageText}>{error}</Text>}
            <Animated.View style={[styles.animationContainer]}>
              <Pressable style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>
                  {isLogin ? "Sign In" : "Sign Up"}
                </Text>
              </Pressable>
            </Animated.View>

            <Pressable
              style={styles.buttonSwitchAuth}
              onPress={handleLoginSwitch}
            >
              <Text style={styles.buttonSwitchAuthText}>
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
