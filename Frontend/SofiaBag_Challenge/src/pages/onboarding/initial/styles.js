import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Filtro = styled.View`
    background-color: #1b1b1b;
    position: absolute;
    z-index: -100;
    width: 100%;
    height: 100%;
`;

export const Content = styled.View`
    margin: 0 40px;
`;

export const Background = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -200;
`;

export const Title = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 180px;
    width: 290px;
    flex: 1;
`;

export const Button = styled.TouchableOpacity`
    align-items: center;
    background-color: ${COLORS.white};
    padding: 18px 35px;
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
    margin-bottom: 90px;
`;