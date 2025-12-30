import { Text, View } from "react-native";

import { pageStyles } from "@/constants/pageStyles";

export default function Index() {
  return (
    <View style={pageStyles.default}>
      <Text>This is the Dashboard!</Text>
    </View>
  );
}
