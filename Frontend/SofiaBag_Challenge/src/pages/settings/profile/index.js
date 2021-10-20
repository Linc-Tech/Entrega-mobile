import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { COLORS } from "../../../../constants/theme";
import ScreenHeader from '../../../components/ScreenHeader';

export default function Profile({ navigation, route }) {
  const { user } = route.params;



  return(
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="light-content" />
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <ScreenHeader navigation={navigation} theme="white">
          Perfil
        </ScreenHeader>
      </View>

      <View style={styles.container}>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
      flex: 1,
      backgroundColor: COLORS.black,
  },

  container: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 10,
  },
})