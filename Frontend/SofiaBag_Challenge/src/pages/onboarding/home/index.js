import React from 'react';
import { FlatList } from 'react-native';
import { Text } from 'react-native';
import icons from '../../../../constants/icons';
import { FONTS } from '../../../../constants/theme';
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
} from './styles';

const DATA = [
  // {
  //   id: uuid(),
  //   title: "Agenda",
  //   icon: `${icons.agenda}`,
  //   nav: "Agenda",
  // },
  // {
  //   id: uuid(),
  //   title: "Calendário",
  //   icon: `${icons.calendar}`,
  //   nav: "Schedule",
  // },
  {
    id: uuid(),
    title: "Mochila",
    icon: `${icons.backpack}`,
    nav: "Backpack",
  },
  // {
  //   id: uuid(),
  //   title: "Configurações",
  //   icon: `${icons.settings}`,
  //   nav: "Settings"
  // }
]

// Fix responsivity
const Home = ({ navigation }) => {
  return (
    <Container>
        <Content>
          <Header>
            <Welcome>
              <Text style={{ ...FONTS.buttons, fontWeight: 'bold' }}>
                Seja bem-vinde, Larissa!
              </Text>
            </Welcome>
            <Logout
              onPress={ () => { navigation.navigate('Initial') } }
            >
              <Text style={{ ...FONTS.buttons, fontWeight: 'bold' }}>
                Sair
              </Text>
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
                />
              )}
              keyExtractor={ item => item.id }
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </Menu>
        </Content>
    </Container>
  );
};

export default Home;
