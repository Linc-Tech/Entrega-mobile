import styled from 'styled-components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const Page = styled.SafeAreaView`
    height: 100%;
`;

export const Container = styled.View`
    margin: 20px 30px 5px;
    flex: 1;
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

export const Content = styled.View`
    flex: 8;
`;

export const Dates = styled.View`
    margin-top: 40px;
    height: 170px;
    flex-direction: row;
`;

export const ToDo = styled.View`
    flex: 2.5;
`;

export const Objects = styled.View`
    margin-top: 15px;
`;

export const ObjectInfo = styled.View`
    flex-direction: row;
    border-radius: ${SIZES.radiusReminders};
    margin-top: 7px;
`;

export const ObjectImage = styled.Image`
    width: 100px;
    height: 120px;
    margin: 0 20px;
`;

export const Info = styled.View`
    flex: 1;
    margin: 20px 20px 20px 0;
`;

export const Today = styled.View`
    width: 110px;
    height: 120px;
    border-radius: ${SIZES.marginHorizontal}px;
    padding: 20px;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.black};
`;

export const DateInfo = styled.View`
    margin-left: 20px;
    height: 120px;
    flex: 1;
`;

export const ObjectsDateSection = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
`;

export const StoredObjets = styled.View`

`;

export const ObjectsToStore = styled.View`

`;
