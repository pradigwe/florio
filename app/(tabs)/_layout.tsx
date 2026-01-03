import { Colors } from "@/constants/Colors";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { navigate } from "expo-router/build/global-state/routing";

import { useState } from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

// icons
import {
  HouseSimpleIcon,
  IconContext,
  NotePencilIcon,
  PlusIcon,
  PottedPlantIcon,
  ShovelIcon,
} from "phosphor-react-native";

// screens
import HiddenScreen from "./create/hidden";
import GreenhouseScreen from "./greenhouse";
import DashboardScreen from "./index";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const rotateButton = useAnimatedStyle(() => ({
    transform: [{ rotateZ: withSpring(isOpen ? "135deg" : "0deg") }],
  }));

  const renderCreateButtons = () => <></>;

  const handleCreatePress = () => {
    console.log("button is", isOpen ? "opened" : "closed");
    if (isOpen) {
      console.log("Button is being closed.");
      setIsOpen(!isOpen);
    } else {
      console.log("Button is being opened.");

      setIsOpen(!isOpen);
    }
  };

  const styles = StyleSheet.create({
    button: {
      width: 50,
      height: 50,
      backgroundColor: theme.navButton,
      margin: 4,
      borderRadius: 99,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 90,
    },
  });
  return (
    <IconContext.Provider
      value={{
        size: 24,
        weight: "light",
        color: theme.navIcon,
        style: { marginTop: 16 },
      }}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            justifyContent: "center",
            backgroundColor: theme.navBackground,
            elevation: 0,
            borderTopWidth: 0,
            shadowOpacity: 0,
          },
        }}
        tabBar={(props) => (
          <>
            {isOpen ? (
              <View
                style={{
                  flexDirection: "row",
                  height: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <IconContext.Provider
                  value={{
                    size: 24,
                    color: "#fff",
                    weight: "light",
                  }}
                >
                  <Pressable
                    style={styles.button}
                    onPress={() => navigate("/(tabs)/create/new-note")}
                  >
                    <NotePencilIcon />
                  </Pressable>
                  <Pressable
                    style={styles.button}
                    onPress={() => navigate("/(tabs)/create/new-plant")}
                  >
                    <ShovelIcon />
                  </Pressable>
                </IconContext.Provider>
              </View>
            ) : (
              <></>
            )}
            <BottomTabBar {...props} />
          </>
        )}
      >
        <Tab.Screen
          name="dashboard"
          component={DashboardScreen}
          listeners={{
            tabPress: (e) => setIsOpen(false),
          }}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? <HouseSimpleIcon weight="fill" /> : <HouseSimpleIcon />,
          }}
        />
        <Tab.Screen
          name="create"
          component={HiddenScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              handleCreatePress();
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
                  <Animated.View style={rotateButton}>
                    <PlusIcon
                      color="#fff"
                      weight="bold"
                      style={{ marginTop: 0 }}
                    />
                  </Animated.View>
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="greenhouse"
          component={GreenhouseScreen}
          listeners={{
            tabPress: (e) => setIsOpen(false),
          }}
          options={{
            title: "Greenhouse",
            tabBarIcon: ({ focused }) =>
              focused ? <PottedPlantIcon weight="fill" /> : <PottedPlantIcon />,
          }}
        />
      </Tab.Navigator>
    </IconContext.Provider>
  );
}
