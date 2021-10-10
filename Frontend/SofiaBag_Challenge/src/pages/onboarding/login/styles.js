import styled from 'styled-components/native';
import { SIZES } from '../../../../constants/theme';

export const Container = styled.SafeAreaView`
    height: 100%;
`;

export const Background = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`;

export const Content = styled.View`
    justify-content: space-between;
    margin: 10px 0;
    height: 100%;
`;

export const Header = styled.View`
    margin: 0 30px;
    max-height: 50%;
`;

export const Title = styled.View`
    height: 100%;
    justify-content: center;
`;

export const LoginSection = styled.View`
    background-color: #FFF;
    height: 100%;
    border-top-right-radius: ${SIZES.radiusPageAndBlocks}px;
    border-top-left-radius: ${SIZES.radiusPageAndBlocks}px;
    padding: 30px;
`;

export const InputSection = styled.View`
    justify-content: space-between;
`;

export const Footer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
`;
