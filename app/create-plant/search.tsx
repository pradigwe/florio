import { addPlant, getPlants, searchPlantCatalog } from "@/actions/plants";
import ThemedView from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import {
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function SearchScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [loaded] = useFonts({
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const styles = StyleSheet.create({
    viewContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 25,
      alignItems: "center",
    },
    searchBar: {
      width: "100%",
      padding: 15,
      backgroundColor: theme.searchBar,
      borderWidth: 0.7,
      borderRadius: 10,
      borderColor: theme.navBackground,
      color: theme.header,
    },
  });
  return (
    <SafeAreaProvider>
      <ThemedView fullScreen>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.viewContainer}>
            <TextInput
              style={styles.searchBar}
              autoCapitalize="none"
              autoCorrect={false}
              enterKeyHint="search"
              clearButtonMode="always"
              placeholder="Search"
            />
          </View>
        </TouchableWithoutFeedback>
      </ThemedView>
    </SafeAreaProvider>
  );
}
