
import moment from 'moment';
import React, { useEffect } from 'react';
import { Text, FlatList, ScrollView } from 'react-native';
import avatar from '../../../../constants/avatar';
import { COLORS, FONTS } from '../../../../constants/theme';
import ComeBackButton from '../../../components/ComeBackButton';
import 'moment/locale/pt-br';

import {
  Container,
  Header,
  Content,
  Dates,
  ToDo,
  Objects,
  Page,
  Title,
  ObjectInfo,
  ObjectImage,
  Info,
  Today,
  DateInfo,
  ObjectsDateSection,
  StoredObjets,
  ObjectsToStore,
} from './styles';
import { getUserObjects, OBJECTS } from '../../../services/ObjectService';

const OBJECT_DATA = [
  {
    "id": 1,
    "avatar": `${avatar.sadAvatar}`,
    "objectName": "Notebook da empresa",
    "message": "Você ainda não colocou esse objeto na mochila",
    "stored": false,
  },
]

export default function Agenda({ navigation }) {

  useEffect(() => {
    const userObjects = async () => {
      const res = await getUserObjects();

      if (res == 500) {
        navigation.navigate('Exception', {
          navigateTo: 'Home'
        });
      }
    };

    userObjects();

  }, [navigation])

  const todayDate = moment().locale("pt-br");
  const todayDateFormatted = todayDate.format("DD-MM-YYYY");
  const day = moment().format("DD");
  const weekDay = moment(todayDate).format("dddd");

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let weekDayFormatted = "";
  for (let i = 0; i < 3; i++) {
    weekDayFormatted += weekDay[i].toUpperCase();
  }

  let stored = 0;
  let toStore = 0;

  for (let element in OBJECTS) {
    const object = OBJECTS[element];

    if (object.stored) {
      stored++;
    } else {
      toStore++;
    }
  }

  const renderObject = ({ item }) => {
    return (
      <Objects>

        <ObjectInfo style={{ backgroundColor: `${ item.stored == true ? `${COLORS.green}` : `${COLORS.black}` }` }}>
          <ObjectImage
            source={item.avatar}
          />

          <Info>
            <Text style={{ ...FONTS.pReminderTitle, fontWeight: 'bold', marginBottom: 10, }}>{item.name}</Text>
            <Text style={{ ...FONTS.pReminderText, fontWeight: 'normal', lineHeight: 18 }}>{item.id}</Text>
          </Info>
        </ObjectInfo>
      </Objects>
    );
  }


  return (
    <Page>
      <Container>
        <ScrollView scrollEnabled={true}>
          <Header>
            <ComeBackButton
              navigation={navigation}/>
            <Title>
              <Text style={{ ...FONTS.commonTitle, fontWeight: 'bold', color: `${COLORS.black}` }}>Agenda</Text>
            </Title>
          </Header>

          <Content>
            <Text style={{ ...FONTS.p, color: 'black', marginTop: 10, marginBottom: 10, lineHeight: "24" }}>
              Hmm... Larissa, veja só o que você não pode esquecer
            </Text>

            <Dates>
              <Today>
                <Text style={{ ...FONTS.dateFromAgenda, }}>{day}</Text>
                <Text style={{ color: `${COLORS.grey}` }}>{weekDayFormatted}</Text>
              </Today>

              <DateInfo>
                <Text style={{ ...FONTS.pReminderTitle, color: `${COLORS.black}`, marginBottom: 20, }}>{capitalize(weekDay)}</Text>

                <Text>Objetos</Text>
                <ObjectsDateSection>
                  <StoredObjets>
                    <Text>na mochila</Text>
                    <Text style={{ ...FONTS.pReminderText, textAlign: 'center', marginTop: 10, color: 'black' }}>
                      {stored}
                    </Text>
                  </StoredObjets>

                  <ObjectsToStore>
                    <Text>fora da mochila</Text>
                    <Text style={{ ...FONTS.pReminderText, textAlign: 'center', marginTop: 10, color: 'black' }}>
                      {toStore}
                    </Text>
                  </ObjectsToStore>
                </ObjectsDateSection>
              </DateInfo>
            </Dates>

            <ToDo>
              <Text style={{ marginBottom: 10, marginTop: 10 }}>Larissa, você não pode esquecer:</Text>
              <FlatList
                data={OBJECTS}
                renderItem={renderObject}
                keyExtractor={ item => item.id }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            </ToDo>
          </Content>
        </ScrollView>
      </Container>
    </Page>
  );
};
