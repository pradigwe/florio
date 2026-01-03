import { StyleSheet, Text } from "react-native";

import ThemedView from "@/components/ThemedView";

export default function DashboardScreen() {
  return (
    <ThemedView>
      <Text>This is the Dashboard! Welcome!</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
