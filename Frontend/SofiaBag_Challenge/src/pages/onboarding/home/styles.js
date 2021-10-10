import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const Container = styled.SafeAreaView`
    background-color: ${COLORS.black};
    width: 100%;
    height: 100%;
`;

export const Content = styled.View`
    justify-content: space-between;
    margin: 10px 0;
    height: 90%;
`;

export const Header = styled.View`
    margin: 20px 30px 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Welcome = styled.View``;

export const Logout = styled.TouchableOpacity`
    background-color: ${COLORS.red};
    padding: 4px 15px;
    border-radius: ${SIZES.radiusTopButtons};
`;

export const Title = styled.View`
    width: 322px;
    margin: 0 30px 45px;
`;

export const Menu = styled.View`
    margin-left: 30px;
`;
