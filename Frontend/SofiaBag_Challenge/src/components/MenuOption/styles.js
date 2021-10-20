import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../constants/theme';

export const Option = styled.TouchableOpacity`
    background-color: ${COLORS.white};
    width: 135px;
    height: 135px;
    padding: 10px;
    margin-right: 15px;
    margin-bottom: 15px;
    justify-content: center;
    align-items: center;
    border-radius: ${SIZES.radiusPageAndBlocks}px;
`;

export const Icon = styled.Image`
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
`;