import BackButton from "@/components/BackButton";
import ThemedView from "@/components/ThemedView";
import { Text, View } from "react-native";

export default function NewPlantScreen() {
  return (
    <ThemedView>
      <View>
        <BackButton />
        <Text>Search Plants</Text>
      </View>
      <View>{/* plant info */}</View>
    </ThemedView>
  );
}
