import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import {
  HouseSimpleIcon,
  IconContext,
  PlusIcon,
  PottedPlantIcon,
} from "phosphor-react-native";
import { useColorScheme, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  return (
    <IconContext.Provider
      value={{
        size: 24,
        weight: "light",
        color: theme.navIcon,
        style: { marginTop: 16 },
      }}
    >
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            justifyContent: "center",
            backgroundColor: theme.navBackground,
            elevation: 0,
            borderTopWidth: 0,
            shadowOpacity: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ focused }) =>
              focused ? <HouseSimpleIcon weight="fill" /> : <HouseSimpleIcon />,
          }}
        />
        <Tabs.Screen
          name="create"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              // CreateButton();
            },
          }}
          options={{
            tabBarIcon: () => (
              <View
                style={{
                  backgroundColor: theme.navBackground,
                  borderRadius: 100,
                }}
              >
                <View
                  style={{
                    backgroundColor: theme.navButton,
                    width: 60,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                    margin: 5,
                  }}
                >
                  <PlusIcon
                    color="#fff"
                    weight="bold"
                    style={{ marginTop: 0 }}
                  />
                </View>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="greenhouse"
          options={{
            title: "Greenhouse",
            tabBarIcon: ({ focused }) =>
              focused ? <PottedPlantIcon weight="fill" /> : <PottedPlantIcon />,
          }}
        />
      </Tabs>
    </IconContext.Provider>
  );
}
