import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { StyleProp, useColorScheme, ViewStyle } from "react-native";

export default function CreateStack() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="new-note" />
    </Stack>
  );
}
