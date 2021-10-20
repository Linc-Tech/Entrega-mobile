
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, FlatList, View, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import avatar from '../../../../constants/avatar';
import { COLORS, FONTS } from '../../../../constants/theme';
import ScreenHeader from '../../../components/ScreenHeader';
import 'moment/locale/pt-br';

import {
  Dates,
  Objects,
  ObjectInfo,
  ObjectImage,
  Info,
  Today,
  DateInfo,
  ObjectsDateSection,
  StoredObjets,
  ObjectsToStore,
  ImageBox,
} from './styles';
import { getUserObjectsFromADate } from '../../../services/ScheduleService';
import httpStatus from '../../../../data/httpStatus';
import { useFocusEffect } from '@react-navigation/core';
import EmptyList from '../../../components/EmptyList';
import LoadingSimbol from '../../../components/LoadingSimbol';

export let OBJECT;

export default function Agenda({ navigation, route }) {
  const { user } = route.params;
  const name = user.name.split(' ')[0];
  const [getObjects, setObjects] = useState([]);
  const [inBackpack, setInBackpack] = useState(0);
  const [outOfBackpack, setOutOfBackpack] = useState(0);
  const [isLoading, setLoading] = useState(true);

  function countObjects() {
    let objectsInBackpack = 0;
    let objectOutOfBackpack = 0;

    for (let i = 0; i < getObjects.length; i++) {
      const obj = getObjects[i].object;
      if (obj.inBackpack) {
        objectsInBackpack++;
      } else {
        objectOutOfBackpack++;
      }
    }

    setInBackpack(objectsInBackpack);
    setOutOfBackpack(objectOutOfBackpack);
  }

  useFocusEffect(useCallback(() => {
    const userObjects = async () => {
      const res = await getUserObjectsFromADate(user, todayDateFormatted);

      if (res == httpStatus.SERVER_ERROR) {
        navigation.navigate('Exception', {
          navigateTo: 'Home',
          user
        });
      }

      setObjects(res);
      setLoading(false);
    };

    userObjects();
  }, [navigation]))

  useEffect(() => {
    countObjects();
  }, [getObjects])

  const todayDate = moment().locale("pt-br");
  const todayDateFormatted = todayDate.format("yyyy-MM-DD");
  const day = moment().format("DD");
  const weekDay = moment(todayDate).format("dddd");

  let weekDayFormatted = "";
  for (let i = 0; i < 3; i++) {
    weekDayFormatted += weekDay[i].toUpperCase();
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function verifyAvatarToRender(inBackpack, objectName) {
    if(inBackpack) {
      return [`${objectName} guardado na mochila`, avatar.happyAvatar];
    }

    return ['Você ainda não colocou esse objeto na mochila', avatar.sadAvatar];
  }

  const renderDataSection = () => {
    return(
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
                {inBackpack}
              </Text>
            </StoredObjets>

            <ObjectsToStore>
              <Text>fora da mochila</Text>
              <Text style={{ ...FONTS.pReminderText, textAlign: 'center', marginTop: 10, color: 'black' }}>
                {outOfBackpack}
              </Text>
            </ObjectsToStore>
          </ObjectsDateSection>
        </DateInfo>
      </Dates>
    );
  };

  const renderObject = ({ item }) => {
    const [message, avatar] = verifyAvatarToRender(item.object.inBackpack, item.object.name);

    return (
      <Objects>
        <ObjectInfo style={{ backgroundColor: `${ item.object.inBackpack == true ? `${COLORS.green}` : `${COLORS.red}` }` }}>
          <ImageBox>
            <ObjectImage
              source={avatar}
            />
          </ImageBox>

          <Info>
            <Text style={{ ...FONTS.pReminderTitle, fontWeight: 'bold', marginBottom: 10, }}>
              {item.object.name}
            </Text>
            <Text style={{ ...FONTS.pReminderText, fontWeight: 'normal', lineHeight: 22 }}>
              {message}
            </Text>
          </Info>
        </ObjectInfo>
      </Objects>
    );
  };

  const renderLoading = () => {
    return(
      <View style={{ flex: 1 }}>
        <LoadingSimbol size="large" color="primary" />
      </View>
    );
  };

  const header = () => {
    return(
      <View style={{ flex: 1 }}>
        <Text style={{ ...FONTS.p, color: 'black', marginTop: 10, marginBottom: 10, lineHeight: 24 }}>
          Hmm... {user.nickname}, veja só o que você não pode esquecer
        </Text>

        {renderDataSection()}

        <Text style={{ marginBottom: 20, marginTop: 10, lineHeight: 24 }}>{name}, você não pode esquecer de colocar na mochila:</Text>
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <ScreenHeader navigation={navigation} >
          Agenda
        </ScreenHeader>

        <View style={[{ flex: 1 }, styles.margin]}>
          <View style={{ flex: 1 }}>
            {
              isLoading ? renderLoading()
              :
              getObjects == '' ?
              <View style={{ flex: 1 }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                >
                  <View style={{ flex: 1 }}>
                    {header()}
                  </View>

                  <View style={{ flex: 1 }}>
                    <EmptyList
                      message={`Parece que você não precisa colocar nada na mochila hoje, ${user.nickname}`}
                      avatarType={avatar.execeptionAvatar}
                      fontColor="#000"
                      fontWeight="bold"
                    />
                  </View>
                </ScrollView>
              </View>
              :
              <View style={{ flex: 1 }}>
                <FlatList
                  data={getObjects}
                  renderItem={renderObject}
                  keyExtractor={ item => item.id }
                  ListHeaderComponent={header}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            }
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
      backgroundColor: '#FFFFFF',
      flex: 1,
  },

  container: {
    marginBottom: 10,
    marginHorizontal: 20,
    flex: 1,
  },

  margin: {
    marginHorizontal: 14,
  }
})