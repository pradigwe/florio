import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { ArrowLeftIcon, CaretLeftIcon } from "phosphor-react-native";
import { Pressable, useColorScheme } from "react-native";

export default function BackButton() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  return (
    <Pressable onPress={() => router.back()}>
      <ArrowLeftIcon size={24} color={theme.header} />
    </Pressable>
  );
}
