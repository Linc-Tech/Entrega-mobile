import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const Image = styled.Image`
  max-width: 100%;
  max-height: 100%;
  flex: 2;
`;

export const ButtonSection = styled.TouchableOpacity`
    margin: 20px 30px;
    background-color: ${COLORS.black};
    height: 48px;
    justify-content: center;
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
`;
