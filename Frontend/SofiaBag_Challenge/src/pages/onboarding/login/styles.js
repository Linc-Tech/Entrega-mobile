import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${COLORS.white};
`;

export const Background = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`;

export const Header = styled.View`
    margin: 20px 30px 0;
    flex: 0.9;
`;

export const Title = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Content = styled.View`
    border-top-right-radius: ${SIZES.radiusPageAndBlocks}px;
    border-top-left-radius: ${SIZES.radiusPageAndBlocks}px;
    flex: 1;
    padding: 0 5px;
    background-color: ${COLORS.white};
`;

export const LoginSection = styled.View`
    background-color: #FFF;
    flex: 1;
    border-top-right-radius: ${SIZES.radiusPageAndBlocks}px;
    border-top-left-radius: ${SIZES.radiusPageAndBlocks}px;
    padding: 30px;
`;

export const Form = styled.View`
    flex: 1;
`;

export const Input = styled.View`
    margin: 20px 0;
    flex: 1;
`;

export const TextInput = styled.TextInput`
    border: 1px solid ${COLORS.grey};
    padding: 14px;
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
`;

export const Placeholder = styled.View`
    position: absolute;
    height: 100%;
    width: 100%;
    justify-content: center;
    padding-left: 15px;
    background: transparent;
    z-index: -100;
`;

export const ButtonSection = styled.View``;

export const Button = styled.TouchableOpacity`
    background-color: ${COLORS.black};
    height: 48px;
    justify-content: center;
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
`;

export const Footer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
`;
