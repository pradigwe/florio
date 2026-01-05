import ThemedView from "@/components/ThemedView";
import { Link, Stack } from "expo-router";
import { Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "404 - Page not found" }} />
      <ThemedView>
        <Text>This page doesn't exist :C</Text>
        <Link href={"/"}>Go back to the Dashboard!</Link>
      </ThemedView>
    </>
  );
}
