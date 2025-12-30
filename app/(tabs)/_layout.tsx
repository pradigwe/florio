import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="greenhouse" options={{ title: "Greenhouse" }} />
    </Tabs>
  );
}
