import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.black};
`;

export const Background = styled.Image`
  width: 80%;
  height: 80%;
`;

export const Item = styled.View`
  margin: 0 0 20px;
  flex-direction: row;
`;

export const Infos = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Number = styled.View`
  background-color: ${COLORS.white};
  width: 55px;
  height: 55px;
  border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
  justify-content: center;
  align-items: center;
`;

export const Details = styled.View`
  margin-left: 15px;
  flex: 1;
`;

export const DeleteBox = styled.View`
  justify-content: center;
`;

export const BinButton = styled.TouchableOpacity`
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
    padding: 8px;
    background-color: ${COLORS.red};
`;

export const BinIcon = styled.Image`
    width: 25px;
    height: 25px;
`;

export const Footer = styled.View`
  height: 125px;
  justify-content: center;
  margin: 0 35px;
`;

export const AddItem = styled.TouchableOpacity`
    background-color: ${COLORS.white};
    border-radius: ${SIZES.radiusPageAndBlocks}px;
    border: 1px solid ${COLORS.white};
    align-items: center;
    padding: 15px;
`;
