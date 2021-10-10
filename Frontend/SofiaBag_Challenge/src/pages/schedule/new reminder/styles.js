import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const Background = styled.Image`
    width: 100%;
    height: 70%;
    position: absolute;
    bottom: 50%;
`;

export const Filtro = styled.View`
    background-color: #000;
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const Subtitle = styled.View`
    width: 80%;
`;

export const Form = styled.View`
    flex: 1.5;
    background-color: #FFF;
    border-top-right-radius: ${SIZES.radiusPageAndBlocks}px;
    border-top-left-radius: ${SIZES.radiusPageAndBlocks}px;
    padding: 30px 30px 10px;
`;

export const SelectedDay = styled.View`
    width: 130px;
    flex: 1;
    margin-right: 25px;
    border-radius: ${SIZES.marginHorizontal}px;
    padding: 20px;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.black};
    border-radius: ${SIZES.radiusPageAndBlocks}px;
`;

export const TextInput = styled.TextInput`
    border: 1px solid ${COLORS.grey};
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

export const MaskedInput = styled.TextInput`
    border: 1px solid ${COLORS.grey};
    margin: 22px 0 21px;
    padding: 10px;
    height: 48px;
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
`;

export const CancelButton = styled.TouchableOpacity`
    background-color: ${COLORS.white};
    height: 48px;
    justify-content: center;
    border: 1px solid ${COLORS.black};
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
    align-items: center;
`;