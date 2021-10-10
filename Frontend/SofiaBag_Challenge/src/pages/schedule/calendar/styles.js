import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';


export const ObjectSection = styled.View`
    flex-direction: row;
    margin: 10px 14px 5px;
`;


export const Item = styled.View`
    flex: 1;
    border-radius: ${SIZES.radiusReminders}px;
    padding: 15px 20px;
    background-color: #EDEDED; // ${COLORS.black};
`;

export const ItemHeader = styled.View`
    margin: 0 0 10px;
`;

export const ItemContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const SectionOne = styled.View``;

export const SectionTwo = styled.View``;

export const Buttons = styled.View`
    justify-content: space-between;
    margin-left: 10px;
`;

export const UpdateButton = styled.TouchableOpacity`
    border-radius: ${SIZES.radiusBottomButtonsAndInputs}px;
padding: 8px;
    background-color: ${COLORS.green};
`;

export const PenIcon = styled.Image`
    width: 25px;
    height: 25px;
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


export const Popup = styled.View`
    background-color: ${COLORS.black};
height: 220px;
width: 90%;
z-index: 100;
position: absolute;
bottom: 30%;
left: 5%;
border-radius: ${SIZES.radiusPageAndBlocks}px;
justify-content: space-around;
align-items: center;
    padding: 35px 25px;
`;

export const ButtonsPopup = styled.View`
    flex-direction: row;
width: 100%;
flex: 1;
justify-content: space-around;
    align-items: center;
`;

export const CancelButton = styled.TouchableOpacity`
    padding: 15px 30px;
    border-radius: ${SIZES.radiusReminders}px;
    background-color: ${COLORS.green};
`;

export const RemoveButton = styled.TouchableOpacity`
    padding: 15px 30px;
    border-radius: ${SIZES.radiusReminders}px;
    background-color: ${COLORS.red};
`;

export const AddItem = styled.TouchableOpacity`
    background-color: ${COLORS.black}; //#EDEDED;
    border-radius: ${SIZES.radiusPageAndBlocks}px;
    align-items: center;
    padding: 15px;
    margin: 0 20px;
`;