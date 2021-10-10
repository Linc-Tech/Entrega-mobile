import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../constants/theme';

export const Container = styled.SafeAreaView``;

export const ButtonSection = styled.TouchableOpacity`
    background-color: ${COLORS.black};
    height: 48px;
    justify-content: center;
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
`;