import { Colors } from "@/constants/Colors";
import { StyleProp, useColorScheme, ViewStyle } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

type ThemedViewProps = SafeAreaViewProps & {
  style?: StyleProp<ViewStyle>;
  fullScreen?: boolean | false;
};

export default function ThemedView({
  style,
  fullScreen,
  ...props
}: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  return (
    <>
      {fullScreen ? (
        <SafeAreaView
          style={[
            {
              backgroundColor: theme.background,
              flex: 1,
              justifyContent: "flex-start",
            },
            style,
          ]}
          {...props}
        />
      ) : (
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
      )}
    </>
  );
}
