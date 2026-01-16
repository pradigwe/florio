import { Button, StyleSheet, Text } from "react-native";

import ThemedView from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardScreen() {
  const { signOut } = useAuth();
  return (
    <ThemedView>
      <Text>This is the Dashboard! Welcome!</Text>
      <Button title="Sign Out" onPress={signOut} />
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
