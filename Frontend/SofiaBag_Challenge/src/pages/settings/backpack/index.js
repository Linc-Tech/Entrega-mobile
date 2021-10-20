import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';

import ScreenHeader from '../../../components/ScreenHeader';
import { AddItem, Container, Details, Footer, Infos, Item, Number } from './styles';
import { getUserObjects } from '../../../services/ObjectService';
import avatar from '../../../../constants/avatar';
import LoadingSimbol from '../../../components/LoadingSimbol';
import httpStatus from '../../../../data/httpStatus';
import EmptyList from '../../../components/EmptyList';

export default function Backpack({ navigation, route }) {
  const { user } = route.params;
  const [getObjects, setObjects] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        const response = await getUserObjects(user);

        setLoading(false);
        if (response == httpStatus.SERVER_ERROR) return navigation.navigate('Exception', { user });

        setObjects(response);
        setLoading(false);
      };

    fetchData();
    }, [navigation])
  );


  const __renderItems = ({ item, index }) => {
    return(
      <Item>
        <Infos
          onPress={ () => navigation.navigate("NewObject", {
            item: item,
            user: user,
          })}
        >
          <Number>
            <Text style={styles.number}>{index + 1}</Text>
          </Number>

          <Details>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={{ color: 'white'}}>{item.category}</Text>
          </Details>
        </Infos>
      </Item>
    );
  };

  const __renderLoading = () => {
    return(
      <View style={{ flex: 1 }}>
        <LoadingSimbol size="large" color="white" />
      </View>
    );
  };

  return(
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Container>
        <View style={styles.margin}>
          <ScreenHeader
            navigation={navigation}
            theme="white"
          >
            Mochila
          </ScreenHeader>
        </View>

        <Text
          style={{ ...FONTS.p, color: 'white', marginVertical: 20, lineHeight: 24, marginHorizontal: 30 }}>
          {user.nickname}, você tem alguma etiqueta rfid da Sofia para adicionar nos seus objetos?
        </Text>

        <View style={{ flex: 1, marginHorizontal: 30, marginVertical: 20, }}>

          {
            isLoading ? __renderLoading()
            :
            getObjects == ''
            ?
            <EmptyList
              message="Sua mochila está vazia"
              avatarType={avatar.sadAvatar}
              fontColor="white"
              fontWeight="normal"
            />
            :
            <FlatList
              data={getObjects}
              renderItem={(item, index) => __renderItems(item, index)}
              keyExtractor={ item => item.cdRfid }
              showsVerticalScrollIndicator={false}
            />
          }
        </View>
        <Footer>
          <AddItem
            onPress={ () => navigation.navigate("NewObject", {
              user: user
            }) }
          >
            <Text style={{ ...FONTS.h2, color: COLORS.black }}>
              Adicionar objeto na mochila
            </Text>
          </AddItem>
        </Footer>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  number: {
    fontSize: SIZES.regular,
    fontWeight: 'bold',
    color: COLORS.grey,
  },

  itemName: {
    ...FONTS.pReminderTitle,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },

  margin: {
    marginHorizontal: 20,
    marginTop: 15,
  },

  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})