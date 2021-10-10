import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../constants/theme';

export const Container = styled.SafeAreaView``;

export const Cover = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background-color: ${COLORS.grey};
    justify-content: center;
    align-items: center;
    border-radius: ${SIZES.radiusTopButtons}px;
`;

export const Background = styled.Image`
    width: 20px;
    height: 20px;
`;
