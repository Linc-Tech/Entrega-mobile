import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import icons from '../../../../constants/icons';
import { COLORS, FONTS } from '../../../../constants/theme';
import MenuOption from '../../../components/MenuOption';
import { v4 as uuid } from 'uuid';

import {
  Container,
  Content,
  Header,
  Welcome,
  Logout,
  Title,
  Menu,
  ButtonsModal,
  ModalButton,
} from './styles';
import data from '../../../../data/data';
import LoadingSimbol from '../../../components/LoadingSimbol';

const DATA = [
  // {
  //   id: uuid(),
  //   title: "Agenda",
  //   icon: icons.agenda,
  //   nav: "Agenda",
  // },
  // {
  //   id: uuid(),
  //   title: "Calendário",
  //   icon: icons.calendar,
  //   nav: "Schedule",
  // },
  {
    id: uuid(),
    title: "Mochila",
    icon: icons.backpack,
    nav: "Backpack",
  },
  // {
  //   id: uuid(),
  //   title: "Configurações",
  //   icon: icons.settings,
  //   nav: "Settings"
  // }
];

export default function Home({ navigation, route }) {
  const [isLoading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [getNickname, setNickname] = useState();
  const [getUser, setUser] = useState();

  useEffect(() => {
    if (route.params) {
      setNickname(route.params.user.nickname);
      setUser(route.params.user);
    }

  }, [navigation])

  function handleLogOut() {
    setLoading(true);
    setModalVisible(true);

    setInterval(() => {
      data.user = {};
    }, 1000)

    setLoading(false);
    return navigation.navigate('Initial');
  }

  const renderLoading = () => {
    return(
        <View style={{ flex: 1 }}>
            <LoadingSimbol size="small" color="white" />
        </View>
    );
  };

  const renderModal = () => {
    return(
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
        >
          <View style={{
              flex: 1,
              justifyContent: "center",
          }}>
            <View style={styles.modalView}>
              <Text>{data.user.nickname}, você tem certeza que deseja deletar esse objeto?</Text>

              <ButtonsModal>
                <ModalButton
                  style={{ backgroundColor: COLORS.black }}
                  onPress={ () => setModalVisible(false) }
                >
                  <Text style={{ color: 'white' }}>Cancelar</Text>
                </ModalButton>

                <ModalButton
                  style={{ backgroundColor: COLORS.red }}
                  onPress={ () => {} }
                >
                  <Text style={{ color: 'white' }}>Remover</Text>
                </ModalButton>
              </ButtonsModal>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
        <Content>
          <Header>
            <Welcome>
              <Text style={{ ...FONTS.buttons, fontWeight: 'bold' }}>
                Seja bem-vinde, {getNickname}!
              </Text>
            </Welcome>
            <Logout
              onPress={ () => handleLogOut() }
            >
              {
                isLoading ? renderLoading()
                :
                <Text style={{ ...FONTS.p, fontWeight: 'bold' }}>
                  Sair
                </Text>
              }
            </Logout>
          </Header>

          <Title>
            <Text style={{ ...FONTS.largeTitle, fontWeight: 'bold', lineHeight: 70 }}>Será que você está esquecendo alguma coisa hoje?</Text>
          </Title>

          <Menu>
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <MenuOption
                  item = {item}
                  navigation={navigation}
                  route={getUser}
                />
              )}
              keyExtractor={ item => item.id }
              // numColumns={2}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </Menu>
        </Content>
    </Container>
  );
};


const styles = StyleSheet.create({
  modalView: {
      margin: 40,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
  },
});