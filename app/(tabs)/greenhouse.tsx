import { Text, useColorScheme, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { PageStyles } from "@/constants/PageStyles";

export default function Greenhouse() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  return (
    <View style={[PageStyles.default, { backgroundColor: theme.background }]}>
      <Text>This is the Greenhouse Page!</Text>
    </View>
  );
}
