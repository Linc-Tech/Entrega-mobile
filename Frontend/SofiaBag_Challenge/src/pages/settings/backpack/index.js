import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';

import ScreenHeader from '../../../components/ScreenHeader';
import { AddItem, Background, Container, Details, Footer, Infos, Item, Number } from './styles';
import { getUserObjects } from '../../../services/ObjectService';
import avatar from '../../../../constants/avatar';
import LoadingSimbol from '../../../components/LoadingSimbol';

export default function Backpack({ navigation }) {
  const [getObjects, setObjects] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        const response = await getUserObjects();

        setLoading(false);
        if (response == 500) return navigation.navigate('Exception');

        setObjects(response);
      };

      fetchData();
    }, [navigation])
  );

  const __renderItems = ({ item }) => {
    return(
      <Item>
        <Infos
          onPress={ () => navigation.navigate("NewObject", {
            item: item,
          })}
        >
          <Number>
            <Text style={styles.number}></Text>
          </Number>

          <Details>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={{ color: 'white'}}>{item.category}</Text>
          </Details>
        </Infos>
      </Item>
    );
  };

  const __renderNoListResponse = () => {
    return (
      <View style={styles.centerView}>
        <Background
          source={avatar.sadAvatar}
        />
        <Text style={{ ...FONTS.p, color: 'white', marginVertical: 20, lineHeight: 24 }}>
          Sua mochila está vazia
        </Text>
      </View>
    );
  };

  const __renderLoading = () => {
    return(
      <View style={{ flex: 1 }}>
        <LoadingSimbol size="large" />
      </View>
    );
  };

  return(
    <View style={{ flex: 1 }}>
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
          Lari, você tem alguma etiqueta rfid da Sofia para adicionar nos seus objetos?
        </Text>

        <View style={{ flex: 1, marginHorizontal: 30, marginVertical: 20, }}>

          {
            isLoading ? __renderLoading()
            :
            getObjects == '' ? __renderNoListResponse()
            :
            <FlatList
              data={getObjects}
              renderItem={(item) => __renderItems(item)}
              keyExtractor={ item => item.cdRfid }
              showsVerticalScrollIndicator={false}
            />
          }
        </View>
        <Footer>
          <AddItem
            onPress={ () => navigation.navigate("NewObject") }
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
    color: '#EDEDED',
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