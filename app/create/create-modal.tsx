// styling
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Nunito_500Medium, useFonts } from "@expo-google-fonts/nunito";

// bottom sheet
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

// icons
import {
  IconContext,
  NotePencilIcon,
  ShovelIcon,
  XIcon,
} from "phosphor-react-native";

import { JSX, useCallback, useRef } from "react";
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";

import { navigate } from "expo-router/build/global-state/routing";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type CreateModalProps = {
  visible: boolean;
  onClose: () => void;
};

type BottomSheetModalBackgroundProps = {
  style?: StyleProp<ViewStyle>;
};

export default function CreateModal({ visible, onClose }: CreateModalProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [loaded] = useFonts({
    Nunito_500Medium,
  });

  const sheetRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
        pressBehavior={"close"}
        onPress={() => sheetRef.current?.dismiss(dismissSheetAnimation)}
      />
    ),
    [],
  );

  const renderBackground = ({ style }: BottomSheetModalBackgroundProps) => {
    return <View style={[styles.modalContainer, style]} />;
  };

  const sheetAnimation = useBottomSheetSpringConfigs({
    damping: 70,
    stiffness: 1000,
    mass: 10,
    energyThreshold: 0.002,
  });

  const dismissSheetAnimation = useBottomSheetSpringConfigs({
    duration: 200,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    modalContainer: {
      backgroundColor: theme.background,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    sheetContainer: {
      height: "100%",
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    handleIndicator: {
      backgroundColor: theme.background,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    sheetTitle: {
      flex: 1,
      color: theme.header,
      textAlign: "center",
    },
    contentContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    buttonContainer: {
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    button: {
      backgroundColor: theme.primary,
      padding: 20,
      borderRadius: 20,
    },
    buttonLabel: {
      fontFamily: "Nunito_500Medium",
      fontSize: Fonts.secondaryText.fontSize,
    },
  });

  // checking if fonts are loaded before displaying modal
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView>
      <Modal
        visible={visible}
        onShow={handlePresentModalPress}
        presentationStyle="overFullScreen"
        animationType="fade"
        onRequestClose={() => onClose}
        transparent
      >
        <GestureHandlerRootView style={styles.container}>
          <BottomSheetModalProvider>
            <BottomSheetModal
              ref={sheetRef}
              snapPoints={["25%"]}
              enableDynamicSizing={false}
              backgroundComponent={renderBackground}
              backdropComponent={renderBackdrop}
              handleIndicatorStyle={styles.handleIndicator}
              enablePanDownToClose
              onDismiss={onClose}
              animationConfigs={sheetAnimation}
              enableOverDrag={true}
            >
              <BottomSheetView style={styles.sheetContainer}>
                <View style={styles.titleContainer}>
                  <Pressable
                    onPress={() =>
                      sheetRef.current?.close(dismissSheetAnimation)
                    }
                  >
                    <XIcon size={24} color={theme.header} />
                  </Pressable>
                  <Text style={[styles.sheetTitle, Fonts.h3]}>
                    What would you like to create?
                  </Text>
                </View>

                <View style={styles.contentContainer}>
                  <IconContext value={{ size: 32, color: theme.text }}>
                    <Pressable
                      style={styles.buttonContainer}
                      onPress={() => {
                        navigate("/create/new-note");
                        sheetRef.current?.close(dismissSheetAnimation);
                      }}
                    >
                      <View style={styles.button}>
                        <NotePencilIcon />
                      </View>
                      <Text style={styles.buttonLabel}>Note</Text>
                    </Pressable>

                    <Pressable
                      style={styles.buttonContainer}
                      onPress={() => {
                        navigate("/create-plant/search");
                        sheetRef.current?.close(dismissSheetAnimation);
                      }}
                    >
                      <View style={styles.button}>
                        <ShovelIcon />
                      </View>
                      <Text style={styles.buttonLabel}>Plant</Text>
                    </Pressable>
                  </IconContext>
                </View>
              </BottomSheetView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </Modal>
    </SafeAreaView>
  );
}

{
  /*  */
}
