import { Colors } from "@/constants/Colors";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
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
  XIcon,
} from "phosphor-react-native";

// screens
import ThemedView from "@/components/ThemedView";
import HiddenScreen from "../create/hidden";
import NewNotePage from "../create/new-note";
import NewPlantPage from "../create/new-plant";
import GreenhouseScreen from "./greenhouse";
import DashboardScreen from "./index";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useState<string>("");

  const rotateButton = useAnimatedStyle(() => ({
    transform: [{ rotateZ: withSpring(isOpen ? "135deg" : "0deg") }],
  }));

  const handleCreatePress = () => {
    isOpen ? setIsOpen(!isOpen) : setIsOpen(!isOpen);
  };

  const showSelectedPage = (page: string) => {
    if (page == "note") {
      return <NewNotePage />;
    } else if (page == "plant") {
      return <NewPlantPage />;
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
              <>
                <Modal
                  visible={modalVisible}
                  animationType="slide"
                  onRequestClose={() => setModalVisible(false)}
                  style={{ flex: 1 }}
                >
                  <ThemedView>
                    <View
                      style={{
                        width: "100%",
                        paddingTop: 15,
                        paddingHorizontal: 30,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Pressable
                        style={[
                          styles.button,
                          {
                            height: 40,
                            width: 40,
                            opacity: 0.8,
                            marginBottom: 0,
                          },
                        ]}
                        onPress={() => setModalVisible(false)}
                      >
                        <XIcon
                          size={24}
                          color="#fff"
                          weight="bold"
                          style={{ marginTop: 0 }}
                        />
                      </Pressable>
                      <Text
                        style={{
                          flex: 1,
                          opacity: 0.6,
                          fontSize: 24,
                          fontWeight: "semibold",
                          textAlign: "center",
                        }}
                      >
                        Create{" "}
                        {selectedPage
                          .charAt(0)
                          .toUpperCase()
                          .concat(selectedPage.slice(1, selectedPage.length))}
                      </Text>
                    </View>
                    {showSelectedPage(selectedPage)}
                  </ThemedView>
                </Modal>
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
                      onPress={() => {
                        setModalVisible(true);
                        setSelectedPage("note");
                      }}
                    >
                      <NotePencilIcon />
                    </Pressable>
                    <Pressable
                      style={styles.button}
                      onPress={() => {
                        setModalVisible(true);
                        setSelectedPage("plant");
                      }}
                    >
                      <ShovelIcon />
                    </Pressable>
                  </IconContext.Provider>
                </View>
              </>
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
          name="dash"
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
            headerStyle: {
              backgroundColor: "green",
            },
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
