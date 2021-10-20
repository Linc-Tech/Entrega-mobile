import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONTS } from "../../../constants/theme";
import { Background, Container } from "./styles";

export default function EmptyList({ message, avatarType, fontColor, fontWeight }) {
  return(
    <Container style={styles.centerView}>
      <Background
        source={avatarType}
      />
      <Text style={{ ...FONTS.p, color: `${fontColor}`, textAlign: 'center', marginVertical: 20, lineHeight: 24, fontWeight: `${fontWeight}` }}>
        {message}
      </Text>
    </Container>
  )
}


const styles = StyleSheet.create({
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
})