import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const Container = styled.View`
    border-top-left-radius: ${SIZES.radiusPageAndBlocks}px;
    border-top-right-radius: ${SIZES.radiusPageAndBlocks}px;
    flex: 1;
    margin-top: 10px;
    padding: 45px 35px 30px;
    background-color: ${COLORS.white};
`;

export const Header = styled.SafeAreaView`
    flex: 0.6;
    background-color: ${COLORS.black};
    margin: 0 30px 0;
    justify-content: center;
`;

export const Title = styled.View`
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`;

export const Form = styled.View`
    flex: 1;
`;

export const TextInput = styled.TextInput`
    border: 1px solid grey;
    margin: 22px 0 21px;
    padding: 10px;
    height: 48px;
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
    height: 260px;
    flex: 1;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
`;

export const Image = styled.Image`
    flex: 1;
    width: 320px;
`;

export const ButtonSection = styled.View`
    margin: 20px 0;
`;

export const Button = styled.TouchableOpacity`
    background-color: ${COLORS.black};
    height: 48px;
    justify-content: center;
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
`;

export const DeleteButton = styled.TouchableOpacity`
    margin-top: 10px;
    background-color: ${COLORS.red};
    height: 48px;
    justify-content: center;
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
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