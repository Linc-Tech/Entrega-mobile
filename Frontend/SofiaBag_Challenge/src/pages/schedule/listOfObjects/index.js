import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../../../constants/theme';
import ComeBackButton from '../../../components/ComeBackButton';
import { Container, Header, Item, Title } from './styles';
import { v4 as uuid } from 'uuid';

const DATA = [
  {
    id: 'TH638BK',
    name: 'Notebook da empresa'
  },
  {
    id: 'KS09NSD',
    name: 'Chave do armário'
  },
]

export default function listOfObjects({ navigation, route }) {
  // console.log("LISTA PAGE", route.params, route.params.length);

  const renderItem = ({ item }) => {
    return(
      <Item
        onPress={ () => {
          navigation.navigate('NewReminder', {
            item: item,
            // newReminder: route.params
          });
        }}
      >
        <Text style={{ color: `${COLORS.black}`, fontWeight: 'bold' }}>{item.name}</Text>
        <Text>{item.id}</Text>
      </Item>
    );
  }

  return(
    <View style={{ flex: 1, backgroundColor: `${COLORS.black}` }}>
      <Container>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Header>
              <ComeBackButton
                navigation={navigation}/>

              <Title>
                <Text style={{ ...FONTS.commonTitle, fontWeight: 'bold', color: `${COLORS.black}` }}>Objetos</Text>
              </Title>
            </Header>

            <Text style={{
              ...FONTS.p,
              color: 'black',
              marginVertical: 10,
              lineHeight: 24,
              marginHorizontal: 18,
            }}>Selectione o item que deseja adicionar um lembrete</Text>

            <View>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={ item => item.id }
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: 35,
                  borderBottomWidth: 1,
                  borderBottomColor: `${COLORS.grey}`,
                  marginBottom: 15,
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginBottom: 20,
    marginTop: 20,
    flex: 1,
  },
})