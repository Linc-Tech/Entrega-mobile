import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const Container = styled.View`
    border-top-right-radius: ${SIZES.radiusPageAndBlocks}px;
    border-top-left-radius: ${SIZES.radiusPageAndBlocks}px;
    flex: 1;
    margin-top: 20px;
    padding: 25px 35px 30px;
    background-color: ${COLORS.white};
`;

export const Form = styled.View`
    margin-top: 20px;
    /* flex: 1; */
    flex-direction: column-reverse;
`;

export const TextInput = styled.TextInput`
    border: 1px solid ${COLORS.white};
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

export const ImageSection = styled.View`
    flex: 1;
    height: 260px;
    margin: 20px 0 30px;
    justify-content: center;
    align-items: center;
`;

export const Image = styled.Image`
    flex: 0.9;
    width: 350px;
`;

export const ButtonSection = styled.View`
    margin: 20px 0;
`;

export const Button = styled.TouchableOpacity`
    background-color: ${COLORS.black};
    height: 48px;
    justify-content: center;
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
    margin-bottom: 10px;
`;


export const ButtonsModal = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0 0;
    width: 100%;
`;

export const ModalButton = styled.TouchableOpacity`
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
    padding: 10px 20px;
`;
