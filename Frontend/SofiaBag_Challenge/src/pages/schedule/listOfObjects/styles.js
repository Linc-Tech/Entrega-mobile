import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const Container = styled.View`
    flex: 0.9;
    background-color: ${COLORS.white};
    border-bottom-left-radius: ${SIZES.radiusPageAndBlocks}px;
    border-bottom-right-radius: ${SIZES.radiusPageAndBlocks}px;
`;

export const Header = styled.View`
    flex-direction: row;
    margin: 10px 0 40px;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.View`
    flex: 1;
    align-items: center;
    padding-right: 40px;
`;

export const Item = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    border-top-width: 1px;
    padding: 15px 0;
    border-color: ${COLORS.grey};
`;