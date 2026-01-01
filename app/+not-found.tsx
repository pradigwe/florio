import { PageStyles } from "@/constants/PageStyles";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "404 - Page not found" }} />
      <View style={PageStyles.default}>
        <Text>This page doesn't exist :C</Text>
        <Link href={"/"}>Go back to the Dashboard!</Link>
      </View>
    </>
  );
}
