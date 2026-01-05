import { Colors } from "@/constants/Colors";
import { StyleProp, useColorScheme, ViewStyle } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

type ThemedViewProps = SafeAreaViewProps & {
  style?: StyleProp<ViewStyle>;
};

export default function ThemedView({ style, ...props }: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: theme.background,
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        },
        style,
      ]}
      {...props}
    />
  );
}
