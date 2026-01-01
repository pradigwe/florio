import { StyleSheet, Text, useColorScheme, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { PageStyles } from "@/constants/PageStyles";

export default function Index() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  return (
    <View style={[PageStyles.default, { backgroundColor: theme.background }]}>
      <Text>This is the Dashboard! Welcome!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
