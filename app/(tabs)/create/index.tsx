import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View>
      <Link href={"/(tabs)/create/new-note"}>Create note!!</Link>
      <Link href={"/(tabs)/create/new-plant"}>Create plant</Link>
    </View>
  );
}
