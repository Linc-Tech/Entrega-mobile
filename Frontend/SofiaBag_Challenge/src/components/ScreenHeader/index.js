import React from "react";
import { Text } from "react-native";
import { FONTS, SIZES } from "../../../constants/theme";
import ComeBackButton from "../ComeBackButton";
import { Container, Title } from "./styles";

export default function Header({ children, navigation, theme }) {
    const fontColor = theme == 'white' ? theme : '#343A40';

    return(
        <Container>
            <ComeBackButton
                navigation={navigation}
            />

            <Title>
                <Text style={{ ...FONTS.h1, fontWeight: 'bold', color: fontColor, fontSize: SIZES.commonTitle, }}>
                    {children}
                </Text>
            </Title>
        </Container>
    );
}