import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../constants/theme';

export const Container = styled.SafeAreaView``;

export const TextInput = styled.TextInput`
    border: 1px solid ${COLORS.grey};
    margin: 22px 0 21px;
    padding: 10px;
    height: 48px;
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
`;