import { Stack } from "expo-router";

export default function CreatePageLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="new-note" />
      <Stack.Screen name="new-plant" />
    </Stack>
  );
}
