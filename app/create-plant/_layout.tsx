import BackButton from "@/components/BackButton";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import {
  Nunito_500Medium,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function CreateStack() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [loaded] = useFonts({
    Nunito_500Medium,
    Nunito_600SemiBold,
  });

  return (
    <Stack
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {
          color: theme.header,
          fontFamily: "Nunito_600SemiBold",
          fontSize: Fonts.h2.fontSize,
        },
      }}
    >
      <Stack.Screen
        name="search"
        options={{
          headerTitle: "Search Plants",
        }}
      />
      <Stack.Screen name="new-plant" />
    </Stack>
  );
}
