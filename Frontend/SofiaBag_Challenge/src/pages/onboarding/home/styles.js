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
    padding: 3.5px 15px;
    border-radius: ${SIZES.radiusTopButtons}px;
`;

export const Title = styled.View`
    width: 322px;
    margin: 0 30px 45px;
`;

export const Menu = styled.View`
    /* align-items: center; */
    margin-left: 30px;
`;

export const ButtonsModal = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0 0;
    width: 100%;
`;

export const ModalButton = styled.TouchableOpacity`
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
    padding: 10px 20px;
`;
