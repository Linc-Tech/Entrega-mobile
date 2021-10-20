import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const Announcement = styled.View`
  height: 180px;
  margin: 20px 0;
  border-radius: ${SIZES.radiusTopButtons}px;
  background-color: ${COLORS.white};
`;

export const Background = styled.Image`
  width: 100%;
  height: 180px;
  border-radius: ${SIZES.radiusTopButtons}px;
  z-index: -200;
`;

export const Filtro = styled.View`
    background-color: #1b1b1b;
    position: absolute;
    border-radius: ${SIZES.radiusTopButtons}px;
    z-index: -100;
    width: 100%;
    height: 100%;
`;

export const Comment = styled.View`
  position: absolute;
  margin-left: 20px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  bottom: 20px;
`;

export const ButtonBox = styled.View`
  position: absolute;
  padding-right: 20px;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  top: 120px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${COLORS.black};
  border-radius: ${SIZES.radiusTopButtons}px;
  padding: 12px 25px;
`;

export const Config = styled.View`
  flex: 1;
  margin-top: 20px;
`;

export const ConfigSection = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  border-bottom-color: ${COLORS.grey};
  border-bottom-width: 1px;
`;