import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";

import { useState } from "react";

// fonts
import { Fonts } from "@/constants/Fonts";
import { Nunito_500Medium } from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";

import { Colors } from "@/constants/Colors";
import { useColorScheme, View } from "react-native";

// animations

// icons
import {
  HouseSimpleIcon,
  IconContext,
  PlusIcon,
  PottedPlantIcon,
} from "phosphor-react-native";

// screens
import HiddenScreen from "../create/hidden";
import GreenhouseScreen from "./greenhouse";
import DashboardScreen from "./index";

import CreateModal from "../create/create-modal";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  // styling
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [loaded] = useFonts({
    Nunito_500Medium,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // checking if fonts are loaded before displaying app
  if (!loaded) {
    return null;
  }

  return (
    <IconContext.Provider value={{ size: 32 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            borderTopWidth: 0,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          },
          tabBarLabelStyle: [
            Fonts.navLabelText,
            { paddingTop: 5, fontFamily: "Nunito_500Medium" },
          ],
          tabBarInactiveTintColor: theme.navLabelInactive,
          tabBarActiveTintColor: theme.text,
        }}
        tabBar={(props) => {
          return (
            <>
              {isOpen ? (
                <>
                  <CreateModal
                    visible={isOpen}
                    onClose={() => setIsOpen(false)}
                  />
                </>
              ) : (
                <></>
              )}
              <BottomTabBar {...props} />
            </>
          );
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          listeners={{
            tabPress: (e) => (
              setIsOpen(false),
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
            ),
          }}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <HouseSimpleIcon
                color={color}
                weight={focused ? "fill" : "regular"}
              />
            ),
            tabBarIconStyle: { alignItems: "center", justifyContent: "center" },
          }}
        />

        <Tab.Screen
          name="create"
          component={HiddenScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            },
          }}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: () => (
              <View
                style={{
                  backgroundColor: theme.primary,
                  marginTop: 10,
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                }}
              >
                <PlusIcon color={theme.text} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Greenhouse"
          component={GreenhouseScreen}
          listeners={{
            tabPress: (e) => (
              setIsOpen(false),
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
            ),
          }}
          options={{
            title: "Greenhouse",
            tabBarIcon: ({ focused, color }) => (
              <PottedPlantIcon
                color={color}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </IconContext.Provider>
  );
}
