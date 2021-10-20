import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../../../constants/theme';
import data from '../../../../data/data';
import httpStatus from '../../../../data/httpStatus';
import ComeBackButton from '../../../components/ComeBackButton';
import LoadingSimbol from '../../../components/LoadingSimbol';
import { getUserObjects } from '../../../services/ObjectService';
import { Container, Header, Item, Title } from './styles';

export default function listOfObjects({ navigation, route }) {
  const { user } = route.params;
  const [getObjects, setObjects] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getUserObjects(user);

      if (response == httpStatus.SERVER_ERROR) return navigation.navigate('Exception', { user });

      setObjects(response);
      setLoading(false);
    };

    fetchData();
  }, [navigation]);

  const renderLoading = () => {
    return(
      <View style={{ flex: 1 }}>
        <LoadingSimbol size="large" color="primary" />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return(
      <Item
        onPress={ () => {
          navigation.navigate('NewReminder', {
            item: item,
            user
          });
        }}
      >
        <Text style={{ color: `${COLORS.black}`, fontWeight: 'bold' }}>{item.name}</Text>
        <Text>{item.id}</Text>
      </Item>
    );
  }

  return(
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <StatusBar barStyle="dark-content" />
      <Container>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Header>
              <ComeBackButton
                navigation={navigation}
              />

              <Title>
                <Text style={{ ...FONTS.commonTitle, fontWeight: 'bold', color: `${COLORS.black}` }}>Objetos</Text>
              </Title>
            </Header>

            <Text style={{
              ...FONTS.p,
              color: 'black',
              lineHeight: 24,
            }}>Selecione o item para a Sofia te lembrar de colocar na mochila</Text>

            <View style={{ flex: 1 }}>
              {
                isLoading ? renderLoading()
                :
                <FlatList
                  data={getObjects}
                  renderItem={renderItem}
                  keyExtractor={ item => item.cdRfid }
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    marginTop: 35,
                    marginBottom: 15,
                    borderTopWidth: 1,
                    borderTopColor: COLORS.grey
                  }}
                />
              }
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